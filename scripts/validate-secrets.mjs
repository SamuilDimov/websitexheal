import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const runtimeSourceRoots = [
  path.join(root, "src"),
  path.join(root, "infra", "aws", "lambda"),
];
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".next-playwright",
  "node_modules",
  "public",
]);
const sourceExtensions = new Set([
  ".cjs",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);
const resendKeyPattern = /\bre_[A-Za-z0-9_-]{20,}\b/g;

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];

      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectSourceFiles(entryPath);
      return sourceExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
    }),
  );
  return files.flat();
}

const files = await collectSourceFiles(root);
const violations = [];
let usesRuntimeResendKey = false;

for (const file of files) {
  const source = await readFile(file, "utf8");
  usesRuntimeResendKey ||=
    runtimeSourceRoots.some((sourceRoot) =>
      file.startsWith(`${sourceRoot}${path.sep}`),
    ) &&
    /\b(?:process\.env|env)\.RESEND_API_KEY\b/.test(source);

  for (const match of source.matchAll(resendKeyPattern)) {
    const line = source.slice(0, match.index).split("\n").length;
    violations.push(`${path.relative(root, file)}:${line}`);
  }
}

if (!usesRuntimeResendKey) {
  violations.push("runtime source does not read process.env.RESEND_API_KEY");
}

if (violations.length > 0) {
  console.error("Resend secret validation failed:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(
    `Resend secret validation passed (${files.length} source files checked).`,
  );
}
