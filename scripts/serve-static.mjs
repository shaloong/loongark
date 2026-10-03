import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(process.argv[2] ?? "storybook-static");
const port = Number(process.env.PORT ?? process.argv[3] ?? 6006);
const host = process.env.HOST ?? "127.0.0.1";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const resolveRequestPath = (url) => {
  const pathname = decodeURIComponent(
    new URL(url, "http://localhost").pathname,
  );
  const relativePath = normalize(pathname.replace(/^\/+/, ""));
  const candidate = resolve(join(root, relativePath || "index.html"));

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    return null;
  }

  return candidate;
};

const server = createServer(async (request, response) => {
  const filePath = resolveRequestPath(request.url ?? "/");
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const info = await stat(filePath);
    const target = info.isDirectory() ? join(filePath, "index.html") : filePath;
    await stat(target);
    response.writeHead(200, {
      "content-type":
        contentTypes[extname(target)] ?? "application/octet-stream",
    });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

server.listen(port, host, () => {
  const script = fileURLToPath(import.meta.url);
  console.log(`[serve-static] ${root} on http://${host}:${port} (${script})`);
});
