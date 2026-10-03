import { unlink } from "node:fs/promises";
import { resolve, sep } from "node:path";
const target = resolve(process.argv[2] ?? "tsconfig.tsbuildinfo");
if (
  !target.startsWith(resolve(process.cwd()) + sep) ||
  !target.endsWith(".tsbuildinfo")
)
  throw new Error("只允许重置当前包的 TypeScript 构建缓存");
try {
  await unlink(target);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
