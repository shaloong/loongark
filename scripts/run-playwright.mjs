import { spawn, spawnSync } from "node:child_process";

const port = Number(process.env.PORT ?? 6006);
const host = process.env.HOST ?? "127.0.0.1";
const storybookUrl = process.env.STORYBOOK_URL ?? `http://${host}:${port}`;
const playwrightArgs = [
  "node_modules/@playwright/test/cli.js",
  "test",
  ...process.argv.slice(2),
];

const server = spawn(
  process.execPath,
  [
    "./scripts/serve-static.mjs",
    process.env.STATIC_DIR ?? "storybook-static",
    String(port),
  ],
  {
    env: { ...process.env, HOST: host, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

const stopServer = () => {
  if (!server.pid || server.killed) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    return;
  }

  server.kill("SIGTERM");
};

const waitForServer = async () => {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Static server exited with code ${server.exitCode}`);
    }

    try {
      const response = await fetch(storybookUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Static server did not become ready: ${storybookUrl}`);
};

try {
  await waitForServer();

  const result = spawnSync(process.execPath, playwrightArgs, {
    cwd: process.cwd(),
    env: { ...process.env, STORYBOOK_URL: storybookUrl },
    stdio: "inherit",
  });

  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  stopServer();
  server.stdout.destroy();
  server.stderr.destroy();
  process.exit(process.exitCode ?? 0);
}
