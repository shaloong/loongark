import assert from "node:assert/strict";

// 使用原生 Safari 的真实计算样式；不把 Linux WebKit 结果当作 Safari。
export async function runNativeColorPicker(h, framework, mode) {
  const { navigate, click, execute, waitFor, screenshot, report } = h;
  await navigate(framework, "ColorPickerExample", mode);
  await click('[data-scope="color-picker"][data-part="trigger"]');
  await waitFor(
    () =>
      execute(
        'return [...document.querySelectorAll("[data-scope=color-picker][data-part=content]")].some(node=>getComputedStyle(node).opacity==="1" && node.getBoundingClientRect().width>0)',
      ),
    "颜色面板完成入场",
  );
  await click(
    '[data-scope="color-picker"][data-part="swatch-trigger"]:nth-child(2)',
  );
  await waitFor(
    () =>
      execute(
        'return document.querySelector("[data-scope=color-picker][data-part=channel-input]")?.value.toLowerCase()==="#0a3565"',
      ),
    "Deep Blue 已接受",
  );
  const markers = await execute(`
    const parts=["area-thumb","channel-slider-thumb","swatch-indicator"];
    return parts.map(part=>{
      const node=[...document.querySelectorAll('[data-scope=color-picker][data-part="'+part+'"]')].find(node=>node.getBoundingClientRect().width>0);
      if(!node) throw Error("缺少可见颜色标记: "+part);
      const css=getComputedStyle(node);
      return {part,border:css.borderTopColor,shadow:css.boxShadow};
    });
  `);
  for (const marker of markers) {
    assert.equal(
      marker.border,
      "rgb(255, 255, 255)",
      `${marker.part} 使用固定明色边框`,
    );
    assert.match(
      marker.shadow,
      /rgb\(18, 18, 18\)/,
      `${marker.part} 保留固定暗色外圈`,
    );
  }
  await screenshot(`color-picker-contrast-${framework}-${mode}`);
  report.interactions.push({
    framework,
    mode,
    case: "color-picker-contrast",
    markers,
  });
}
