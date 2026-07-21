import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const forbidden = new Set(
  ["blog-posts.ts", "guides.ts", "testimonials.ts"].map((file) =>
    path.join(sourceRoot, "data", file)
  )
);

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectSourceFiles(entryPath);
      return /\.(?:ts|tsx)$/.test(entry.name) ? [entryPath] : [];
    })
  );
  return files.flat();
}

function resolveLocalImport(importer, specifier) {
  let base;
  if (specifier.startsWith("@/")) {
    base = path.join(sourceRoot, specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    base = path.resolve(path.dirname(importer), specifier);
  } else {
    return null;
  }

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  return candidates.find((candidate) => sourceFiles.has(candidate)) ?? null;
}

function runtimeImports(source) {
  const imports = [];
  const staticImport = /import\s+(?!type\b)[\s\S]*?\sfrom\s*["']([^"']+)["']/g;
  const sideEffectImport = /import\s*["']([^"']+)["']/g;
  const dynamicImport = /import\s*\(\s*["']([^"']+)["']\s*\)/g;

  for (const pattern of [staticImport, sideEffectImport, dynamicImport]) {
    for (const match of source.matchAll(pattern)) imports.push(match[1]);
  }
  return imports;
}

const files = await collectSourceFiles(sourceRoot);
const sourceFiles = new Set(files);
const sources = new Map(
  await Promise.all(files.map(async (file) => [file, await readFile(file, "utf8")]))
);
const clientRoots = files.filter((file) =>
  /^\s*["']use client["'];/.test(sources.get(file))
);
const visited = new Set();
const violations = [];

function visit(file, chain) {
  const chainKey = `${chain[0]}:${file}`;
  if (visited.has(chainKey)) return;
  visited.add(chainKey);

  for (const specifier of runtimeImports(sources.get(file))) {
    const dependency = resolveLocalImport(file, specifier);
    if (!dependency) continue;
    const nextChain = [...chain, dependency];
    if (forbidden.has(dependency)) {
      violations.push(nextChain);
      continue;
    }
    visit(dependency, nextChain);
  }
}

for (const clientRoot of clientRoots) visit(clientRoot, [clientRoot]);

if (violations.length > 0) {
  console.error("Client runtime imports a full content dataset:");
  for (const chain of violations) {
    console.error(
      `- ${chain.map((file) => path.relative(root, file)).join(" -> ")}`
    );
  }
  process.exitCode = 1;
} else {
  console.log(
    `Client boundary validation passed (${clientRoots.length} client entries checked).`
  );
}
