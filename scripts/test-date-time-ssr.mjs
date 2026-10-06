import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
for (const framework of ["react", "vue", "solid"]) {
  const intro =
    framework === "react"
      ? "import {createElement as h} from 'react';import {renderToString} from 'react-dom/server';"
      : framework === "vue"
        ? "import {createSSRApp,h} from 'vue';import {renderToString} from 'vue/server-renderer';"
        : "import {createComponent as h} from 'solid-js';import {renderToString} from 'solid-js/web';";
  let script =
    intro +
    `import * as L from './packages/${framework}/dist/${framework === "solid" ? "server/" : ""}index.js';`;
  script +=
    "if(L.parseLocalizedDate('٦/١٠/٢٠٢٦',{locale:'ar-EG'})?.toString()!=='2026-10-06')throw Error('SSR locale parser');";
  for (const zoned of [false, true]) {
    const name = zoned ? "ssr-zoned-datetime" : "ssr-local-datetime";
    const value = zoned
      ? "L.parseZonedDateTime('2026-10-06T14:35:20[Asia/Shanghai]')"
      : "L.parseDateTime('2026-10-06T14:35:20')";
    const props = `{name:'${name}',locale:'ar-EG',dir:'rtl',defaultValue:[${value}],granularity:'second',hourCycle:24,format:date=>date.toString(),onValueChange:()=>{throw Error('SSR must not emit')}}`;
    script +=
      framework === "react"
        ? `console.log(renderToString(h(L.LoongArkDateInputRoot,${props},h(L.LoongArkDateInputHiddenInput))));`
        : framework === "vue"
          ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkDateInputRoot,${props},()=>h(L.LoongArkDateInputHiddenInput))})));`
          : `console.log(renderToString(()=>h(L.LoongArkDateInputRoot,{...${props},get children(){return h(L.LoongArkDateInputHiddenInput,{})}})));`;
  }
  for (const inherited of [true, false]) {
    const prefix = inherited ? "ssr-inherit" : "ssr-individual";
    const rootProps = inherited
      ? "{disabled:true,readOnly:true,required:true}"
      : "{}";
    const children = ["input", "textarea"]
      .map((kind) => {
        const component =
          kind === "input" ? "LoongArkInputInput" : "LoongArkTextareaControl";
        const props = `{name:'${prefix}-${kind}'${inherited ? "" : ",disabled:true,readOnly:true,required:true"}}`;
        return `h(L.${component},${props})`;
      })
      .join(",");
    script +=
      framework === "react"
        ? `console.log(renderToString(h(L.LoongArkInputRoot,${rootProps},${children})));`
        : framework === "vue"
          ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkInputRoot,${rootProps},()=>[${children}])})));`
          : `console.log(renderToString(()=>h(L.LoongArkInputRoot,{...${rootProps},get children(){return [${children}]}})));`;
  }
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", script],
    { cwd: process.cwd(), encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /<input(?=[^>]*name="ssr-local-datetime")(?=[^>]*value="2026-10-06T14:35:20")[^>]*>/,
  );
  assert.match(
    result.stdout,
    /<input(?=[^>]*name="ssr-zoned-datetime")(?=[^>]*value="2026-10-06T14:35:20\+08:00\[Asia\/Shanghai\]")[^>]*>/,
  );
  assert.match(result.stdout, /dir="rtl"/);
  for (const prefix of ["ssr-inherit", "ssr-individual"])
    for (const kind of ["input", "textarea"]) {
      const tag = result.stdout.match(
        new RegExp(
          "<" + kind + '(?=[^>]*name="' + prefix + "-" + kind + '")[^>]*>',
        ),
      )?.[0];
      assert.ok(tag, prefix + " " + kind);
      for (const state of ["disabled", "readonly", "required"])
        assert.match(tag, new RegExp("\\s" + state + "(?:\\s|=|>)", "i"));
    }
  console.log(`${framework} 本地化解析与完整日期时间/时区表单值SSR无回调通过`);
}
