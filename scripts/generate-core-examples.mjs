import { formatExample } from "./format-example.mjs";
import ts from "typescript";
import { readFile, writeFile } from "node:fs/promises";

// 这些静态组合用同一部件树生成四端调用代码；交互仍由真实组件的状态机负责。
// 不生成动态组件映射或绕过框架类型检查的 Props。
const recipes = JSON.parse(
  await readFile("scripts/basic-example-recipes.json", "utf8"),
);
const demos = Object.fromEntries(
  [
    "Accordion",
    "Alert",
    "AlertDialog",
    "AngleSlider",
    "AspectRatio",
    "Badge",
    "Breadcrumb",
    "ButtonGroup",
    "Collapsible",
    "Direction",
    "Empty",
    "FilterBar",
    "FloatingPanel",
    "Item",
    "Kbd",
    "Marquee",
    "Menubar",
    "NativeSelect",
    "NavigationMenu",
    "PinInput",
    "Popover",
    "QRCode",
    "Separator",
    "Sheet",
    "Sidebar",
    "SignaturePad",
    "Skeleton",
    "Slider",
    "Spinner",
    "Table",
    "Tabs",
    "Timer",
    "Toggle",
    "ToggleGroup",
    "Tooltip",
  ].map((name) => [
    name,
    recipes[
      name === "FilterBar"
        ? "Filter Bar"
        : name === "ToggleGroup"
          ? "Toggle Group"
          : name
    ],
  ]),
);

function vueNode(node, file) {
  if (ts.isJsxText(node)) return JSON.stringify(node.text.trim());
  if (ts.isJsxExpression(node)) return node.expression?.getText(file) ?? "null";
  const opening = ts.isJsxElement(node) ? node.openingElement : node;
  const tag = opening.tagName.getText(file);
  const props = opening.attributes.properties.map((attribute) => {
    if (!ts.isJsxAttribute(attribute)) throw new Error("静态示例不使用 spread");
    const value = !attribute.initializer
      ? "true"
      : ts.isStringLiteral(attribute.initializer)
        ? JSON.stringify(attribute.initializer.text)
        : attribute.initializer.expression.getText(file);
    return `${JSON.stringify(attribute.name.getText(file))}:${value}`;
  });
  const children = ts.isJsxElement(node)
    ? node.children
        .map((child) => vueNode(child, file))
        .filter((value) => value !== '""')
    : [];
  const generic = {
    "L.LoongArkAngleSlider.HiddenInput": "AngleSliderHiddenInputProps",
    "L.LoongArkPinInputHiddenInput": "PinInputHiddenInputProps",
  }[tag];
  return `${generic ? "createVNode" : "h"}(${generic ? `resolveDynamicComponent(${tag})` : tag.startsWith("L.") ? tag : JSON.stringify(tag)},{${props.join(",")}}${generic ? ` satisfies ${generic}` : ""},${tag.startsWith("L.") ? `{default:()=>[${children.join(",")}]}` : `[${children.join(",")}]`})`;
}
const families = Object.keys(demos);
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const header = `// 本文件由 scripts/generate-core-examples.mjs 生成，并参与真实四端编译与浏览器验收。\n`;
  let source;
  if (framework === "react" || framework === "solid") {
    source =
      (framework === "solid" ? "/** @jsxImportSource solid-js */\n" : "") +
      header +
      (framework === "react"
        ? `import React, {useState} from "react";`
        : `import {createSignal} from "solid-js";`) +
      `\nimport * as L from "@loongark/${framework}";\nexport function CoreComponentsExample() {\n`;
    source +=
      framework === "react"
        ? `const [family,setFamily]=useState("NativeSelect");\n`
        : `const [family,setFamily]=createSignal("NativeSelect");\n`;
    const read = framework === "react" ? "family" : "family()";
    source += `return <section style={{display:"grid",gap:"var(--lk-space-component-lg)","max-width":"40rem","min-width":0,width:"100%"}}><label style={{display:"grid",gap:"var(--lk-control-fieldgap)"}}>组件示例<L.LoongArkNativeSelect aria-label="组件示例" value={${read}} onChange={(event)=>setFamily(event.currentTarget.value)}>${families.map((family) => `<option>${family}</option>`).join("")}</L.LoongArkNativeSelect></label>`;
    source +=
      families
        .map(
          (family) =>
            `{${read}===${JSON.stringify(family)}&&<div style={{"min-width":0}} data-core-family=${JSON.stringify(family)}>${demos[family]}</div>}`,
        )
        .join("\n") + `</section>;\n}\n`;
  } else if (framework === "vue") {
    source =
      header +
      `import type {AngleSliderHiddenInputProps} from "@ark-ui/vue/angle-slider";\nimport type {PinInputHiddenInputProps} from "@ark-ui/vue/pin-input";\nimport {defineComponent,h,createVNode,resolveDynamicComponent,ref} from "vue";\nimport * as L from "@loongark/vue";\nexport const CoreComponentsExample=defineComponent({setup(){const family=ref("NativeSelect");return ()=>h("section",{style:{display:"grid",gap:"var(--lk-space-component-lg)","max-width":"40rem","min-width":0,width:"100%"}},[h("label",{style:{display:"grid",gap:"var(--lk-control-fieldgap)"}},["组件示例",h(L.LoongArkNativeSelect,{"aria-label":"组件示例",value:family.value,onChange:(event:Event)=>{if(event.target instanceof HTMLSelectElement)family.value=event.target.value;}},${JSON.stringify(families)}.map(name=>h("option",{},name)))]),`;
    source +=
      families
        .map((family) => {
          const file = ts.createSourceFile(
            "demo.tsx",
            `const demo=${demos[family]};`,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TSX,
          );
          const node =
            file.statements[0].declarationList.declarations[0].initializer;
          return `family.value===${JSON.stringify(family)}?h("div",{"data-core-family":${JSON.stringify(family)},style:{minWidth:0}},[${vueNode(node, file)}]):null`;
        })
        .join(",\n") + `]);}});\n`;
  } else {
    source = `<script lang="ts">\n${header}import * as L from "@loongark/svelte";\nlet family=$state("NativeSelect");\nconst families=${JSON.stringify(families)};\n</script>\n<section style="display:grid;gap:var(--lk-space-component-lg);max-width:40rem;min-width:0;width:100%"><label style="display:grid;gap:var(--lk-control-fieldgap)">组件示例<L.LoongArkNativeSelect aria-label="组件示例" value={family} onchange={(event)=>family=event.currentTarget.value}>{#each families as name}<option>{name}</option>{/each}</L.LoongArkNativeSelect></label>\n`;
    source +=
      families
        .map(
          (family) =>
            `{#if family===${JSON.stringify(family)}}<div style="min-width:0" data-core-family=${JSON.stringify(family)}>${demos[family]}</div>{/if}`,
        )
        .join("\n") + `</section>\n`;
  }
  if (framework === "react")
    source = source
      .replaceAll('"max-width":', "maxWidth:")
      .replaceAll('"min-width":', "minWidth:");
  if (framework === "solid" || framework === "svelte")
    source = source.replaceAll(" asChild={false}", "");
  await writeFile(
    `examples/${framework}/CoreComponentsExample.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
    await formatExample(
      `examples/${framework}/CoreComponentsExample.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
      source,
    ),
  );
}
console.log(`已生成 ${families.length} 组真实四端静态组合示例。`);
