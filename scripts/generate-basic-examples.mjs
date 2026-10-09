import ts from "typescript";
import { readFile, writeFile } from "node:fs/promises";
import { formatExample } from "./format-example.mjs";

// 每条配方只展示一个组件族；状态与数据属于该组件的最小交互。
const recipes = JSON.parse(
  await readFile("scripts/basic-example-recipes.json", "utf8"),
);
const frameworks = ["react", "vue", "solid", "svelte"];
const vueGenerics = {
  "L.LoongArkAngleSlider.HiddenInput": [
    "angle-slider",
    "AngleSliderHiddenInputProps",
  ],
  "L.LoongArkPinInputHiddenInput": ["pin-input", "PinInputHiddenInputProps"],
  "L.LoongArkSelectRoot": ["select", "SelectRootProps"],
  "L.LoongArkSelectItem": ["select", "SelectItemProps"],
  "L.LoongArkSelectHiddenSelect": ["select", "SelectHiddenSelectProps"],
  "L.LoongArkComboboxRoot": ["combobox", "ComboboxRootProps"],
  "L.LoongArkComboboxItem": ["combobox", "ComboboxItemProps"],
  "L.LoongArkListboxRoot": ["listbox", "ListboxRootProps"],
  "L.LoongArkListboxItem": ["listbox", "ListboxItemProps"],
  "L.LoongArkField.Input": ["field", "FieldInputProps"],
  "L.LoongArkSegmentGroupItemHiddenInput": [
    "segment-group",
    "SegmentGroupItemHiddenInputProps",
  ],
  "L.LoongArkCommand.Input": ["combobox", "ComboboxInputProps"],
  "L.LoongArkSegmentGroupItem": ["segment-group", "SegmentGroupItemProps"],
  "L.LoongArkTreeViewRoot": ["tree-view", "TreeViewRootProps"],
  "L.LoongArkTreeViewNodeProvider": ["tree-view", "TreeViewNodeProviderProps"],
};
const unwrap = (n) =>
  ts.isParenthesizedExpression(n) ? unwrap(n.expression) : n;
function vueExpression(node, file) {
  const result = ts.transform(node, [
    (context) => {
      const visit = (n) =>
        ts.isJsxElement(n) ||
        ts.isJsxSelfClosingElement(n) ||
        ts.isJsxFragment(n)
          ? ts.factory.createIdentifier(vueNode(n, file))
          : ts.visitEachChild(n, visit, context);
      return (n) => ts.visitNode(n, visit);
    },
  ]);
  const text = ts
    .createPrinter()
    .printNode(ts.EmitHint.Unspecified, result.transformed[0], file);
  result.dispose();
  return text;
}
function vueNode(n, file) {
  if (ts.isJsxText(n)) return JSON.stringify(n.text.trim());
  if (ts.isJsxExpression(n))
    return n.expression ? vueExpression(n.expression, file) : "null";
  if (ts.isJsxFragment(n))
    return `[${n.children.map((c) => vueNode(c, file)).join(",")}]`;
  const opening = ts.isJsxElement(n) ? n.openingElement : n;
  const tag = opening.tagName.getText(file);
  const props = opening.attributes.properties.map((a) => {
    if (!ts.isJsxAttribute(a)) throw new Error("基础示例不接受 spread");
    return `${JSON.stringify(a.name.getText(file))}:${!a.initializer ? "true" : ts.isStringLiteral(a.initializer) ? JSON.stringify(a.initializer.text) : vueExpression(a.initializer.expression, file)}`;
  });
  const children = ts.isJsxElement(n)
    ? n.children.map((c) => vueNode(c, file)).filter((c) => c !== '""')
    : [];
  const generic = vueGenerics[tag];
  const events = props.filter((prop) => /^"on/.test(prop));
  const base = props.filter((prop) => !/^"on/.test(prop));
  const validated = generic
    ? `{...({${base.join(",")}} satisfies (${generic[1]}${/RootProps|NodeProviderProps/.test(generic[1]) ? `<(typeof ${tag.includes("TreeView") ? "nodes" : "collection.items"})[number]>` : ""} & VNodeProps)),${events.join(",")}}`
    : `{${props.join(",")}}`;
  const component =
    tag === "L.LoongArkCommand.Root"
      ? `${tag}<(typeof collection.items)[number]>`
      : tag;
  if (ts.isJsxSelfClosingElement(n))
    return `${generic ? "createVNode" : "h"}(${generic ? `resolveDynamicComponent(${tag})` : tag.startsWith("L.") ? component : JSON.stringify(tag)},${validated})`;
  return `${generic ? "createVNode" : "h"}(${generic ? `resolveDynamicComponent(${tag})` : tag.startsWith("L.") ? component : JSON.stringify(tag)},${validated},${tag.startsWith("L.") ? `{default:()=>[${children.join(",")}]}` : `[${children.join(",")}]`})`;
}
function svelteNode(n, file) {
  if (ts.isJsxText(n)) return n.text;
  if (ts.isJsxFragment(n))
    return n.children.map((c) => svelteNode(c, file)).join("");
  if (ts.isJsxExpression(n)) {
    if (!n.expression) return "";
    const e = unwrap(n.expression);
    if (
      ts.isBinaryExpression(e) &&
      e.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    )
      return `{#if ${e.left.getText(file)}}${svelteNode(unwrap(e.right), file)}{/if}`;
    if (
      ts.isCallExpression(e) &&
      ts.isPropertyAccessExpression(e.expression) &&
      e.expression.name.text === "map"
    ) {
      const callback = e.arguments[0];
      const names = callback.parameters.map((p) => p.name.getText(file));
      return `{#each ${e.expression.expression.getText(file)} as ${names.join(",")}}${svelteNode(unwrap(callback.body), file)}{/each}`;
    }
    return `{${e.getText(file)}}`;
  }
  const opening = ts.isJsxElement(n) ? n.openingElement : n;
  const tag = opening.tagName.getText(file);
  let snippets = "";
  const props = opening.attributes.properties.flatMap((a) => {
    const name = a.name.getText(file);
    if (name === "key") return [];
    if (["renderCell", "renderItem"].includes(name)) {
      const arrow = unwrap(a.initializer.expression);
      snippets += `{#snippet ${name}(${arrow.parameters.map((p) => p.name.getText(file)).join(",")})}{${arrow.body.getText(file)}}{/snippet}`;
      return [];
    }
    const alias =
      name === "htmlFor"
        ? "for"
          : name === "dateTime" && tag !== "L.LoongArkMessage"
          ? "datetime"
          : name === "onClick"
            ? "onclick"
            : name;
    return [alias + (a.initializer ? "=" + a.initializer.getText(file) : "")];
  });
  const body = ts.isJsxElement(n)
    ? n.children.map((c) => svelteNode(c, file)).join("\n")
    : "";
  if (["input", "img", "br", "hr"].includes(tag))
    return `<${tag} ${props.join(" ")} />`;
  if (ts.isJsxSelfClosingElement(n) && !snippets)
    return `<${tag} ${props.join(" ")} />`;
  return `<${tag} ${props.join(" ")}>\n${snippets}${body}\n</${tag}>`;
}
for (const [family, value] of Object.entries(recipes)) {
  const recipe = typeof value === "string" ? { jsx: value } : value;
  const name = family.replaceAll(" ", "") + "BasicExample";
  for (const framework of frameworks) {
    const state = Object.entries(recipe.state ?? {});
    const cap = (name) => name[0].toUpperCase() + name.slice(1);
    let setup = recipe.setup ?? "",
      derived = recipe.derived ?? "",
      jsx = recipe.jsx;
    if (framework === "vue" || framework === "solid")
      for (const [key] of state) {
        for (const setter of ["setup", "derived", "jsx"]) {
          const replace = (text) =>
            text.replace(
              new RegExp(`(?<![-\\w])${key}\\b(?!\\s*=)`, "g"),
              framework === "vue" ? `${key}.value` : `${key}()`,
            );
          if (setter === "setup") setup = replace(setup);
          if (setter === "derived") derived = replace(derived);
          if (setter === "jsx") jsx = replace(jsx);
        }
      }
    if (framework === "vue" || framework === "svelte")
      for (const [key] of state)
        jsx = jsx.replace(
          new RegExp(`set${cap(key)}\\(([^()]*)\\)`, "g"),
          `${framework === "vue" ? key + ".value" : key} = $1`,
        );
    jsx = jsx.replace(
      /\(details\) =>/g,
      family === "Combobox" || family === "Command"
        ? "(details: {inputValue: string}) =>"
        : "(details: {value: string[]}) =>",
    );
    // Vue MenuTrigger 始终克隆子元素；提供原生按钮，而非文字节点。
    if (framework === "vue")
      jsx = jsx.replace(
        /<L\.LoongArkMenuTrigger asChild=\{false\}>([^<]+)<\/L\.LoongArkMenuTrigger>/g,
        '<L.LoongArkMenuTrigger><button type="button">$1</button></L.LoongArkMenuTrigger>',
      );
    if (framework !== "react")
      jsx = jsx.replace(
        /(<L\.LoongArk(\w+)Trigger) asChild=\{false\}/g,
        (match, tag, kind) =>
          framework === "vue" && ["Tooltip", "Popover"].includes(kind)
            ? match
            : tag,
      );
    if (framework === "solid")
      jsx = jsx
        .replace(/ key=\{[^}]+\}/g, "")
        .replaceAll("<label htmlFor=", "<label for=");
    const parsed = ts.createSourceFile(
      "basic.tsx",
      `const demo=${jsx};`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const node =
      parsed.statements[0].declarationList.declarations[0].initializer;
    let source;
    const icon = jsx.includes("controlIcons")
      ? 'import {controlIcons} from "@loongark/kit";'
      : "";
    if (framework === "react" || framework === "solid") {
      let declarations = state
        .map(
          ([key, initial]) =>
            `const [${key},set${cap(key)}]=${framework === "react" ? "useState" : "createSignal"}(${initial});`,
        )
        .join("\n");
      if (framework === "solid" && derived) {
        const vars = [];
        derived = [...derived.matchAll(/const (\w+)=([^;]+);/g)]
          .map(([, name, body]) => {
            for (const v of vars)
              body = body.replace(new RegExp(`\\b${v}\\b`, "g"), `${v}()`);
            body = body.replace("{items()}", "{items:items()}");
            vars.push(name);
            return `const ${name}=createMemo(()=>${body});`;
          })
          .join("");
        for (const v of vars)
          jsx = jsx.replace(new RegExp(`\\b${v}\\b(?!\\s*=)`, "g"), `${v}()`);
      }
      source = `${framework === "solid" ? "/** @jsxImportSource solid-js */" : ""}\nimport ${framework === "react" ? 'React, {useState} from "react"' : '{createSignal,createMemo} from "solid-js"'};\nimport * as L from "@loongark/${framework}";${icon}\nexport function ${name}(){${declarations}${setup}${derived}return (${jsx});}`;
    } else if (framework === "vue") {
      const imports = [
        ...new Set(
          [...jsx.matchAll(/L\.[A-Za-z.]+/g)]
            .map((m) => vueGenerics[m[0]])
            .filter(Boolean)
            .map(
              ([path, type]) =>
                `import type {${type}} from "@ark-ui/vue/${path}";`,
            ),
        ),
      ].join("\n");
      source = `import {defineComponent,h,createVNode,resolveDynamicComponent,ref,type VNodeProps} from "vue";import * as L from "@loongark/vue";${icon}${imports}\nexport const ${name}=defineComponent({setup(){${state.map(([key, initial]) => `const ${key}=ref(${initial});`).join("")}${setup}return ()=>{${derived}return ${vueNode(node, parsed)}};}});`;
    } else {
      if (derived) {
        const variables = [...derived.matchAll(/const (\w+)=([^;]+);/g)];
        derived = variables
          .map((m) => `const ${m[1]}=$derived(${m[2]});`)
          .join("");
      }
      source = `<script lang="ts">import * as L from "@loongark/svelte";${icon}${state.map(([key, initial]) => `let ${key}=$state(${initial});`).join("")}${setup}${derived}</script>${svelteNode(node, parsed)}`;
    }
    const path = `examples/${framework}/${name}.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`;
    const used=[...new Set([...source.matchAll(/\bL\.(\w+)/g)].map(match=>match[1]))];
    source=source.replace(/import \* as L from "@loongark\/(react|vue|solid|svelte)";/, `import {${used.join(",")}} from "@loongark/${framework}";`).replace(/\bL\./g, "");
    if (!state.length) source=source.replace('React, {useState}', 'React').replace('{createSignal,createMemo}', '{}');
    if (framework==='solid' && !state.length && !derived) source=source.replace('import {} from "solid-js";', '');
    if(framework==='vue') source=source.replace(/import \{([^}]+)\} from "vue";/, (_,imports)=>`import {${imports.split(',').filter(name=>{const key=name.trim().replace(/^type /,'');return (source.match(new RegExp(`\\b${key}\\b`,'g'))??[]).length>1}).join(',')}} from "vue";`);
    await writeFile(path, await formatExample(path, source));
  }
}
console.log(`生成 ${Object.keys(recipes).length} 组组件独立基础用法。`);
