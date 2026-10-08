import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
const files = [
  "README.md",
  "CONTRIBUTING.md",
  "AGENTS.md",
  "SECURITY.md",
  "CHANGELOG.md",
  "examples/README.md",
  "stories/README.md",
  ...readdirSync("docs")
    .filter((f) => f.endsWith(".md"))
    .map((f) => "docs/" + f),
];
const errors = [];
for (const file of files) {
  const text = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^(?:https?:|mailto:)/.test(target)) continue;
    if (!existsSync(resolve(dirname(file), target)))
      errors.push(`${file}: ${target}`);
  }
}
if (errors.length) throw Error("文档链接不存在：\n" + errors.join("\n"));
console.log(`文档链接通过：${files.length} 份面向使用者与维护者的文档。`);
