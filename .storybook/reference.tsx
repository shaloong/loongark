import React, { useContext, useEffect, useId, useState } from "react";
import {
  Title,
  Description,
  Primary,
  Controls,
  Source,
  DocsContext,
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { LoongArkProvider, LoongArkNativeSelect } from "@loongark/react";
import { ThemeProvider, convert, themes } from "storybook/theming";

const frameworks = ["react", "vue", "solid", "svelte"] as const;
export function ReferenceDocsContainer({
  context,
  children,
}: React.PropsWithChildren<DocsContainerProps>) {
  const story = context.componentStories()[0];
  const mode = story && context.getStoryContext(story)?.globals?.mode;
  return (
    <DocsContainer
      context={context}
      theme={themes[mode === "dark" ? "dark" : "light"]}
    >
      {children}
    </DocsContainer>
  );
}
type Framework = (typeof frameworks)[number];
interface CodeFile {
  path: string;
  code: string;
  url: string;
}
interface Reference {
  family: string;
  branch: string;
  variants: Array<{
    id: string;
    name: string;
    examples: Record<Framework, CodeFile[]>;
  }>;
  examples: Record<Framework, CodeFile[]>;
  apis: Array<{
    name: string;
    path: string;
    properties: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
      default: string;
      defaultSource: string;
    }>;
  }>;
}
const normalize = (value: string) =>
  value.replace(/[^a-z0-9]/gi, "").toLowerCase();

export function ReferenceDocs() {
  const context = useContext(DocsContext);
  const stories = context.componentStories();
  const title = stories[0]?.title ?? "";
  const family = title.startsWith("Components/") ? title.slice(11) : undefined;
  const [reference, setReference] = useState<Reference>();
  const [error, setError] = useState("");
  const [framework, setFramework] = useState<Framework>("react");
  const [copied, setCopied] = useState(false);
  const [component, setComponent] = useState("");
  const [variant, setVariant] = useState("");
  const id = useId();
  useEffect(() => {
    const controller = new AbortController();
    setReference(undefined);
    setError("");
    setCopied(false);
    setComponent("");
    if (family)
      fetch(`./reference/${normalize(family)}.json`, {
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data: Reference) => {
          if (!controller.signal.aborted) {
            setReference(data);
            setComponent(data.apis[0]?.name ?? "");
            setVariant(data.variants[0]?.id ?? "");
          }
        })
        .catch((reason: Error) => {
          if (!controller.signal.aborted)
            setError(`参考资料加载失败：${reason.message}`);
        });
    return () => controller.abort();
  }, [family]);
  const files = (reference?.variants.find((entry) => entry.id === variant)
    ?.examples ?? reference?.examples)?.[framework];
  const api = reference?.apis.find((entry) => entry.name === component);
  const globals = stories[0] && context.getStoryContext(stories[0])?.globals;
  const mode =
    globals?.mode === "dark" || globals?.mode === "high-contrast"
      ? globals.mode
      : "light";
  return (
    <ThemeProvider theme={convert(themes[mode === "dark" ? "dark" : "light"])}>
      <LoongArkProvider
        mode={mode}
        brand={typeof globals?.brand === "string" ? globals.brand : undefined}
        accent={
          typeof globals?.accent === "string" ? globals.accent : undefined
        }
      >
        <main className="loongark-reference" data-reference-family={family}>
          <Title />
          <Description />
          <p>
            正式展示跟随 main；开发预览来自 develop。
            <a
              href={`https://github.com/shaloong/loongark/blob/${reference?.branch ?? "main"}/docs/capabilities.md`}
            >
              当前能力与限制
            </a>{" "}
            ·{" "}
            <a
              href={`https://github.com/shaloong/loongark/blob/${reference?.branch ?? "main"}/docs/releases.md`}
            >
              支持版本与发布流程
            </a>
          </p>
          <Primary />
          <div
            className="loongark-reference-controls"
            role="region"
            aria-label="Story 参数"
            tabIndex={0}
          >
            <Controls />
          </div>
          <h2>状态与组合场景</h2>
          <p>
            场景参数是演示配置，不等同于组件 API 默认值。以下链接打开真实交互
            Story。
          </p>
          <nav
            aria-label="状态与组合场景"
            className="loongark-reference-states"
          >
            {stories.map((story) => (
              <a
                key={story.id}
                href={`?path=/story/${story.id}`}
                target="_parent"
              >
                {story.name}
              </a>
            ))}
          </nav>
          {family && (
            <section aria-label="四端对应代码">
              <h2>四端对应代码</h2>
              <p>
                示例假设应用根已挂载同一框架的
                LoongArkProvider。以下四端代码来自同一个组合场景；事件、受控绑定和生命周期以对应代码为准，引用的模型与组件文件也需一并使用。
              </p>
              {error && <p role="alert">{error}</p>}
              {!reference && !error && <p role="status">正在读取参考资料…</p>}
              {reference && (
                <>
                  <label htmlFor={`${id}-variant`}>四端组合用法</label>
                  <LoongArkNativeSelect
                    id={`${id}-variant`}
                    value={variant}
                    onChange={(event) => {
                      setVariant(event.currentTarget.value);
                      setCopied(false);
                    }}
                  >
                    {reference.variants.map((entry) => (
                      <option key={entry.id} value={entry.id}>
                        {entry.name}
                      </option>
                    ))}
                  </LoongArkNativeSelect>
                  <div role="tablist" aria-label="示例框架">
                    {frameworks.map((name, index) => (
                      <button
                        key={name}
                        id={`${id}-${name}`}
                        type="button"
                        role="tab"
                        aria-selected={framework === name}
                        aria-controls={`${id}-code`}
                        tabIndex={framework === name ? 0 : -1}
                        onClick={() => {
                          setFramework(name);
                          setCopied(false);
                        }}
                        onKeyDown={(event) => {
                          let next: number | undefined;
                          if (event.key === "ArrowRight")
                            next = (index + 1) % frameworks.length;
                          if (event.key === "ArrowLeft")
                            next =
                              (index + frameworks.length - 1) %
                              frameworks.length;
                          if (event.key === "Home") next = 0;
                          if (event.key === "End") next = frameworks.length - 1;
                          if (next !== undefined) {
                            event.preventDefault();
                            setFramework(frameworks[next]);
                            setCopied(false);
                            event.currentTarget.parentElement
                              ?.querySelectorAll<HTMLButtonElement>("button")
                              [next]?.focus();
                          }
                        }}
                      >
                        {name === "react"
                          ? "React"
                          : name === "vue"
                            ? "Vue"
                            : name === "solid"
                              ? "Solid"
                              : "Svelte"}
                      </button>
                    ))}
                  </div>
                  <div
                    id={`${id}-code`}
                    role="tabpanel"
                    aria-labelledby={`${id}-${framework}`}
                    tabIndex={0}
                  >
                    {files?.map((file, index) => (
                      <div key={file.path}>
                        {index > 0 ? (
                          <details>
                            <summary>共享模型：{file.path}</summary>
                            <Source
                              code={file.code}
                              language="typescript"
                              dark={mode === "dark"}
                            />
                            <a href={file.url}>查看源码</a>
                          </details>
                        ) : (
                          <>
                            <div className="loongark-reference-file">
                              <a href={file.url}>{file.path}</a>
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await navigator.clipboard.writeText(
                                      file.code,
                                    );
                                    setCopied(true);
                                  } catch {
                                    setError(
                                      "复制失败，请使用代码区的复制按钮或手动选择代码。",
                                    );
                                  }
                                }}
                              >
                                复制完整示例
                              </button>
                              <span role="status">
                                {copied ? "已复制" : ""}
                              </span>
                            </div>
                            <Source
                              code={file.code}
                              language={framework === "svelte" ? "html" : "tsx"}
                              dark={mode === "dark"}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <h2 id="reference">API 与默认值</h2>
                  <p>
                    展示真实公开 React 签名中的组件属性；原生 HTML
                    属性保留继承，不重复罗列。四端的绑定语法见上面的调用代码。“未指定”不表示
                    false 或空数组。
                  </p>
                  {reference.apis.length > 0 ? (
                    <>
                      <label htmlFor={`${id}-component`}>组件部件</label>
                      <LoongArkNativeSelect
                        id={`${id}-component`}
                        value={component}
                        onChange={(event) =>
                          setComponent(event.currentTarget.value)
                        }
                      >
                        {reference.apis.map((entry) => (
                          <option key={entry.name}>{entry.name}</option>
                        ))}
                      </LoongArkNativeSelect>
                      <div
                        className="loongark-reference-table"
                        tabIndex={0}
                        role="region"
                        aria-label="API 属性表"
                      >
                        <table>
                          <thead>
                            <tr>
                              <th>属性</th>
                              <th>类型 / 必填</th>
                              <th>默认值 / 来源</th>
                              <th>说明</th>
                            </tr>
                          </thead>
                          <tbody>
                            {api?.properties.map((property) => (
                              <tr key={property.name}>
                                <th scope="row">{property.name}</th>
                                <td>
                                  <code>{property.type}</code>
                                  {property.required && <strong>必填</strong>}
                                </td>
                                <td>
                                  <code>{property.default}</code>
                                  <small>{property.defaultSource}</small>
                                </td>
                                <td>
                                  {property.description ||
                                    "见公开类型与组合示例"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <p>
                      此入口提供命名空间或格式化工具，调用契约见四端完整代码与公开声明。
                    </p>
                  )}
                </>
              )}
            </section>
          )}
        </main>
      </LoongArkProvider>
    </ThemeProvider>
  );
}
