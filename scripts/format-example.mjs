import { format } from "prettier";
import * as sveltePlugin from "prettier-plugin-svelte";

// 生成的四端代码也是用户直接阅读的文档，不输出压成一行的 JSX 或模板。
export const formatExample = (path, source) =>
  format(source, {
    filepath: path,
    plugins: [sveltePlugin],
  });
