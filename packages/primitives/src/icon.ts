import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=icon][data-part=root] { --lk-icon-size:var(--lk-control-icon-md);display:inline-block;flex:none;vertical-align:middle;width:var(--lk-icon-size,var(--lk-control-icon-md));height:var(--lk-icon-size,var(--lk-control-icon-md)); }
[data-scope=icon][data-part=root][data-mirror-rtl=true]:dir(rtl) { transform:scaleX(-1); }
`;
registerPrimitive(
  createPrimitive(
    {
      name: "icon",
      tokens: ["control.icon.sm", "control.icon.md", "control.icon.lg"],
      defaults: {},
    },
    (theme) => theme.mountStyles("icon", css),
  ),
);
