import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { runRscCommand } from "./run-rsc-command.mjs";

const root = await mkdtemp(resolve(tmpdir(), "loongark-rsc-command-"));
try {
  for (const scenario of ["recover", "timeout", "build", "exit"]) {
    const artifacts = resolve(root, scenario);
    await mkdir(artifacts);
    // 真正启动 Node 子进程并超时/退出；不模拟 spawnSync 的结果或错误码。
    const args = [
      "--input-type=module",
      "-e",
      `
      import {existsSync,readFileSync,writeFileSync,writeSync} from 'node:fs';
      const count=existsSync('count')?Number(readFileSync('count','utf8'))+1:1;
      writeFileSync('count',String(count));writeSync(1,'attempt '+count+'\\n');
      if (${JSON.stringify(scenario)}==='exit') process.exit(7);
      if (${JSON.stringify(scenario)}!=='recover'||count===1) setTimeout(()=>{},10000);
    `,
    ];
    const run = () =>
      runRscCommand({
        command: process.execPath,
        args,
        name: scenario === "build" ? "build" : "install",
        cwd: artifacts,
        artifacts,
        timeout: 1000,
      });
    if (scenario === "recover") assert.equal(await run(), 1);
    else await assert.rejects(run, /失败/);
    const retries = scenario === "recover" || scenario === "timeout";
    assert.equal(
      await readFile(resolve(artifacts, "count"), "utf8"),
      retries ? "2" : "1",
    );
    const first = scenario === "build" ? "build" : "install";
    assert.match(
      await readFile(resolve(artifacts, `${first}.log`), "utf8"),
      /attempt 1/,
    );
    if (retries)
      assert.match(
        await readFile(resolve(artifacts, "install-retry.log"), "utf8"),
        /attempt 2/,
      );
    else
      await assert.rejects(access(resolve(artifacts, `${first}-retry.log`)), {
        code: "ENOENT",
      });
  }
  console.log(
    "RSC 命令真实子进程回归通过：超时恢复、重复超时上限、构建超时和非零退出不重试，首次日志保留。",
  );
} finally {
  await rm(root, { recursive: true, force: true });
}
