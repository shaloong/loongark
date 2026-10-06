import type { Extension } from "@codemirror/state";

export type CodeEditorLanguage =
  | "plain"
  | "javascript"
  | "typescript"
  | "json"
  | "html"
  | "css"
  | "python"
  | "markdown";
export type CodeEditorLanguageLoader = (
  signal: AbortSignal,
) => Extension | Promise<Extension>;

/** 只有客户端挂载才加载语法包，取消后的结果不得安装到新编辑器。 */
export async function loadCodeLanguage(
  language: CodeEditorLanguage | CodeEditorLanguageLoader,
  signal: AbortSignal,
): Promise<Extension> {
  signal.throwIfAborted();
  let result: Extension;
  if (typeof language === "function") result = await language(signal);
  else
    switch (language) {
      case "plain":
        result = [];
        break;
      case "javascript":
        result = (await import("@codemirror/lang-javascript")).javascript();
        break;
      case "typescript":
        result = (await import("@codemirror/lang-javascript")).javascript({
          typescript: true,
        });
        break;
      case "json":
        result = (await import("@codemirror/lang-json")).json();
        break;
      case "html":
        result = (await import("@codemirror/lang-html")).html();
        break;
      case "css":
        result = (await import("@codemirror/lang-css")).css();
        break;
      case "python":
        result = (await import("@codemirror/lang-python")).python();
        break;
      case "markdown":
        result = (await import("@codemirror/lang-markdown")).markdown();
        break;
    }
  signal.throwIfAborted();
  return result;
}
