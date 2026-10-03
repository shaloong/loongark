import { createLoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";

export const checkThemeLifecycle = () => {
  const a = document.createElement("section"),
    b = document.createElement("section"),
    host = document.createElement("div");
  document.body.append(a, b, host);
  const shadow = host.attachShadow({ mode: "open" });
  const before = document.querySelectorAll("style[id^=loongark]").length;
  const attributesBefore =
    document.documentElement.outerHTML.split("<head>")[0];
  const light = createLoongArkTheme({
      overrides: { zIndex: { dialog: 1201 } },
    }),
    dark = createLoongArkTheme({
      mode: "dark",
      overrides: { zIndex: { dialog: 2202 } },
    }),
    isolated = createLoongArkTheme({ mode: "dark" });
  const constructorClean =
    document.querySelectorAll("style[id^=loongark]").length === before &&
    document.documentElement.outerHTML.split("<head>")[0] === attributesBefore;
  light.mount(a);
  bootstrapKit(light);
  dark.mount(b);
  bootstrapKit(dark);
  isolated.mount(shadow);
  bootstrapKit(isolated);
  const control = (target: HTMLElement | ShadowRoot) => {
    const el = document.createElement("button");
    el.style.transition = "none";
    el.dataset.scope = "button";
    el.dataset.part = "root";
    el.dataset.variant = "solid";
    el.dataset.size = "md";
    el.textContent = "Test";
    target.append(el);
    return el;
  };
  const first = control(a),
    second = control(b),
    third = control(shadow);
  const colors = [first, second, third].map(
    (el) => getComputedStyle(el).backgroundColor,
  );
  const forcedHost = document.createElement("section");
  a.append(forcedHost);
  const forced = createLoongArkTheme({ motionPreference: "force" });
  forced.mount(forcedHost);
  bootstrapKit(forced);
  const spinner = (target: HTMLElement) => {
    const el = document.createElement("span");
    el.style.animation = "lk-spin .8s linear infinite";
    target.append(el);
    return el;
  };
  const motion = {
    auto: getComputedStyle(spinner(a)).animationDuration,
    force: getComputedStyle(spinner(forcedHost)).animationDuration,
  };
  const portal = dark.getPortalContainer()!;
  const portalColor = getComputedStyle(portal).color;
  const layers = [
    getComputedStyle(a).getPropertyValue("--lk-z-index-dialog").trim(),
    getComputedStyle(b).getPropertyValue("--lk-z-index-dialog").trim(),
  ];
  dark.addOverride({ color: { semantic: { primary: "#008844" } } });
  const overridden = getComputedStyle(second).backgroundColor;
  forced.unmount();
  light.unmount();
  const survivor = getComputedStyle(second).backgroundColor;
  dark.unmount();
  isolated.unmount();
  const clean =
    shadow.querySelectorAll("style, [data-lk-theme]").length === 0 &&
    !portal.isConnected &&
    document.querySelectorAll("style[id^=loongark]").length === before;
  a.remove();
  b.remove();
  host.remove();
  return {
    colors,
    portalColor,
    layers,
    overridden,
    survivor,
    clean,
    constructorClean,
    motion,
  };
};
declare global {
  interface Window {
    checkThemeLifecycle: typeof checkThemeLifecycle;
  }
}
window.checkThemeLifecycle = checkThemeLifecycle;
