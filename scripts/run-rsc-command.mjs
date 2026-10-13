import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function runRscCommand({
  args,
  name,
  cwd,
  env,
  artifacts,
  command = "pnpm",
  timeout = 300_000,
}) {
  let retries = 0;
  for (;;) {
    const label = retries ? `${name}-retry` : name;
    const result = spawnSync(command, args, {
      cwd,
      env,
      encoding: "utf8",
      timeout,
      maxBuffer: 16 * 1024 * 1024,
    });
    const log = (result.stdout ?? "") + (result.stderr ?? "");
    await writeFile(resolve(artifacts, `${label}.log`), log);
    // 仅冻结安装超时可重试一次；同一命令与锁文件，首次失败证据保留。
    if (
      name === "install" &&
      retries === 0 &&
      result.error?.code === "ETIMEDOUT"
    ) {
      retries++;
      console.log("冻结安装超时，使用同一锁文件重试一次；首次日志已保留");
      continue;
    }
    assert.equal(
      result.status,
      0,
      `${label} 失败：${result.error ?? log.slice(-8000)}`,
    );
    return retries;
  }
}
