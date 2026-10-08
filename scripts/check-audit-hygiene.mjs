import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
const paths = execFileSync(
  "git",
  ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter((path) => path && existsSync(path));
const rejected = paths.filter((path) =>
  /^(?:docs\/audits\/|\.artifacts\/|test-results\/|playwright-report\/|storybook-static\/)/.test(
    path,
  ),
);
if (rejected.length)
  throw Error("过程产物不能进入源码仓库：\n" + rejected.join("\n"));
console.log("过程产物检查通过；文档不保存逐次审计记录。");
