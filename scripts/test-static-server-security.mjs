import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, symlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { get } from "node:http";
const folder = await mkdtemp(join(tmpdir(), "loongark-server-security-"));
const root = join(folder, "public");
await mkdir(root);
await writeFile(join(root, "index.html"), "safe");
await writeFile(join(folder, "private.txt"), "private");
const server = spawn(
  process.execPath,
  [resolve("scripts/serve-static.mjs"), root, "0"],
  {
    env: { ...process.env, PORT: "0", HOST: "127.0.0.1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let diagnostics = "";
server.stderr.on("data", (chunk) => (diagnostics += chunk));
try {
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(Error("Server start timeout: " + diagnostics)),
      10000,
    );
    server.once("exit", (code) => {
      clearTimeout(timer);
      reject(Error("Server exited: " + code + " " + diagnostics));
    });
    server.stdout.on("data", (chunk) => {
      const match = String(chunk).match(/http:\/\/127\.0\.0\.1:(\d+)/);
      if (match) {
        clearTimeout(timer);
        resolve(Number(match[1]));
      }
    });
  });
  const request = (path) =>
    new Promise((resolve, reject) => {
      get({ hostname: "127.0.0.1", port, path }, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode, body, headers: res.headers }),
        );
      }).on("error", reject);
    });
  assert.equal((await request("/%E0%A4%A")).status, 400);
  assert.equal((await request("/%2e%2e%2fprivate.txt")).status, 403);
  if (process.platform !== "win32") {
    await symlink(join(folder, "private.txt"), join(root, "linked.txt"));
    assert.equal((await request("/linked.txt")).status, 403);
  }
  // 同端口已有服务时，测试启动器必须拒绝启动，不能测试旧产物。
  const occupied = await new Promise((resolveResult, reject) => {
    const runner = spawn(
      process.execPath,
      [resolve("scripts/run-playwright.mjs"), "--list", "--project=chromium"],
      {
        env: {
          ...process.env,
          PORT: String(port),
          HOST: "127.0.0.1",
          STATIC_DIR: root,
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    let output = "";
    runner.stdout.on("data", (chunk) => (output += chunk));
    runner.stderr.on("data", (chunk) => (output += chunk));
    const timer = setTimeout(() => {
      runner.kill("SIGKILL");
      reject(Error("Occupied port did not reject"));
    }, 15000);
    runner.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    runner.once("exit", (code) => {
      clearTimeout(timer);
      resolveResult({ code, output });
    });
  });
  assert.notEqual(occupied.code, 0);
  assert.match(occupied.output, /exited before listening/);
  assert.ok(!occupied.output.includes("Listing tests:"));
  const ok = await request("/");
  assert.equal(ok.status, 200);
  assert.equal(ok.body, "safe");
  assert.equal(ok.headers["x-content-type-options"], "nosniff");
  console.log(
    "本地静态服务器安全回归通过：异常 URL、路径越界、符号链接与后续请求。",
  );
} finally {
  const exited = new Promise((resolve) => server.once("exit", resolve));
  server.kill("SIGTERM");
  if (server.exitCode === null) await exited;
  await rm(folder, { recursive: true, force: true });
}
