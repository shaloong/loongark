import { readFile, readdir } from "node:fs/promises";
import {
  baseTokens,
  tokensToCssVariables,
} from "../packages/tokens/dist/index.js";
const defined = new Set(
  [...tokensToCssVariables(baseTokens).matchAll(/(--lk-[\w-]+):/g)].map(
    (m) => m[1],
  ),
);
const walk = async (p) =>
  (
    await Promise.all(
      (await readdir(p, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(p + "/" + e.name) : [p + "/" + e.name],
      ),
    )
  ).flat();
let failed = false;
const sources = await Promise.all(
  [
    ...(await walk("packages/primitives/src")),
    ...(await walk("packages/kit/src")),
  ]
    .filter((f) => /\.tsx?$/.test(f))
    .map(async (f) => [f, await readFile(f, "utf8")]),
);
for (const [, text] of sources)
  for (const [, name] of text.matchAll(/(--lk-[\w-]+)\s*:/g)) defined.add(name);
for (const [f, text] of sources)
  for (const [, name] of text.matchAll(/var\((--lk-[\w-]+)/g)) {
    if (!defined.has(name) && name !== "--lk-aspect-ratio") {
      failed = true;
      console.error(f, name);
    }
  }
if (failed) process.exitCode = 1;
else console.log("共享样式中的 CSS Token 引用全部有效");
