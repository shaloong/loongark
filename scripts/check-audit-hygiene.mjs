import { execFileSync } from "node:child_process";
import { basename } from "node:path";

// 只检查版本管理清单；本地与 CI 可以生成完整证据，但不能混入源码提交。
const allowed = new Set([
  "acceptance.json",
  "README.md",
  "review.md",
  "manual-review-notes.md",
]);
const tracked = execFileSync("git", ["ls-files", "-z", "--", "docs/audits"], {
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const rejected = tracked.filter((path) => !allowed.has(basename(path)));
if (rejected.length) {
  console.error(
    "验收过程文件应保存到 .artifacts/ 或 CI Artifact：\n" + rejected.join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    `验收保存约定通过：${tracked.length} 个摘要文件，过程文件未进入版本管理。`,
  );
}
