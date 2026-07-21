import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";

const host = process.env.HOST ?? "localhost";
const port = Number(process.env.PORT ?? 4173);
const exportRoot = path.resolve(process.env.EXPORT_DIR ?? "out");
const publicHost = process.env.PUBLIC_HOST ?? "xheal.ai";
const routerSource = await readFile(
  new URL("../infra/aws/cloudfront/url-router.js", import.meta.url),
  "utf8",
);
const router = vm.runInNewContext(`${routerSource}\nhandler;`);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".mov", "video/quicktime"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".ttf", "font/ttf"],
  [".txt", "text/plain; charset=utf-8"],
  [".webm", "video/webm"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function cloudFrontQuery(searchParams) {
  const querystring = {};

  for (const key of new Set(searchParams.keys())) {
    const values = searchParams.getAll(key).map((value) => ({ value }));
    querystring[key] =
      values.length === 1
        ? values[0]
        : { value: values[0].value, multiValue: values };
  }

  return querystring;
}

function headersFromCloudFront(headers) {
  return Object.fromEntries(
    Object.entries(headers ?? {}).map(([name, entry]) => [name, entry.value]),
  );
}

function filePathForUri(uri) {
  const filePath = path.resolve(exportRoot, `.${decodeURIComponent(uri)}`);
  const relative = path.relative(exportRoot, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Invalid request path");
  }

  return filePath;
}

async function serveFile(response, requestMethod, filePath, statusCode = 200) {
  const body = await readFile(filePath);
  response.writeHead(statusCode, {
    "content-length": body.length,
    "content-type":
      contentTypes.get(path.extname(filePath).toLowerCase()) ??
      "application/octet-stream",
  });
  response.end(requestMethod === "HEAD" ? undefined : body);
}

const server = createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { allow: "GET, HEAD" });
      response.end();
      return;
    }

    const url = new URL(request.url ?? "/", `http://${publicHost}`);
    const routed = router({
      request: {
        uri: url.pathname,
        headers: { host: { value: publicHost } },
        querystring: cloudFrontQuery(url.searchParams),
      },
    });

    if (routed.statusCode) {
      response.writeHead(routed.statusCode, headersFromCloudFront(routed.headers));
      response.end();
      return;
    }

    try {
      await serveFile(response, request.method, filePathForUri(routed.uri));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await serveFile(
        response,
        request.method,
        path.join(exportRoot, "404.html"),
        404,
      );
    }
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(`Static server error: ${error.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`Static export listening at http://${host}:${port}`);
});
