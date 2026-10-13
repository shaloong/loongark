import {
  TokenRegistry,
  TokenOverrides,
  TokenTree,
  buildTokenArtifacts,
  mergeTokens,
  tokensForMode,
  tokensToCssVariables,
  viPalette,
} from "@loongark/tokens";

export type ThemeMode = "light" | "dark" | "high-contrast";
export type StyleHost = Document | ShadowRoot;
export type ThemeTarget = StyleHost | HTMLElement;
export interface CreateThemeOptions {
  mode?: ThemeMode;
  brand?: string;
  accent?: string;
  overrides?: TokenOverrides;
  targetId?: string;
  motionPreference?: "auto" | "force";
  /** 当前文档 CSP 允许的样式 nonce；由宿主按请求生成。 */
  nonce?: string;
}
export interface LoongArkTheme {
  readonly id: string;
  readonly mode: ThemeMode;
  readonly tokens: TokenRegistry;
  readonly styleTokens: TokenRegistry;
  toCSS(): string;
  mount(target?: ThemeTarget): void;
  toStyleSheet(): string;
  mountStyles(key: string, css: string, layer?: "primitive" | "kit"): void;
  /** 为按需或迟到的样式保留固定级联顺序。 */
  setStyleOrder(keys: readonly string[]): void;
  /** 注册当前挂载周期的清理；不会保留已卸载的主题。 */
  onUnmount(cleanup: () => void): void;
  getPortalContainer(): HTMLElement | undefined;
  unmount(): void;
  snapshot(): ReturnType<typeof buildTokenArtifacts>;
  addOverride(overrides: TokenOverrides): void;
}
const isDocument = (host: StyleHost): host is Document => host.nodeType === 9;
const baseCSS = `
[data-scope], [data-scope] *, [data-lk-theme] { box-sizing:border-box; }
[data-scope] { font-family:var(--lk-typography-fontfamily-body); }
@media(prefers-reduced-motion:reduce) {
  [data-lk-motion=auto] *:not(:where([data-lk-motion=force], [data-lk-motion=force] *)),
  [data-lk-motion=auto] *:not(:where([data-lk-motion=force], [data-lk-motion=force] *))::before,
  [data-lk-motion=auto] *:not(:where([data-lk-motion=force], [data-lk-motion=force] *))::after {
    animation-duration:.01ms !important; animation-delay:0s !important; animation-iteration-count:1 !important;
    transition-duration:.01ms !important; transition-delay:0s !important; scroll-behavior:auto !important;
  }
}
`;
const hostDocument = (host: StyleHost): Document =>
  isDocument(host) ? host : host.ownerDocument;
const sharedStyles = new WeakMap<
  StyleHost,
  Map<string, { element: HTMLStyleElement; owners: Set<string> }>
>();
const sharedStyleOrder = new Map<string, number>();
const normalizeStyleKey = (key: string) =>
  key.replace(/-(light|dark|high-contrast)$/, "").toLowerCase();
const placeStyle = (element: HTMLStyleElement, target: StyleHost) => {
  const container = isDocument(target) ? target.head : target;
  const order = sharedStyleOrder.get(normalizeStyleKey(element.id));
  const next = order === undefined ? undefined :
    Array.from(container.children).find((other) =>
      other !== element &&
      (sharedStyleOrder.get(normalizeStyleKey(other.id)) ?? -1) > order,
    );
  container.insertBefore(element, next ?? null);
};
export const mountStyleSheet = (
  key: string,
  css: string,
  host?: StyleHost,
  owner = "external",
  nonce?: string,
): (() => void) => {
  const target = host ?? globalThis.document;
  if (!target) return () => {};
  const styles =
    sharedStyles.get(target) ??
    new Map<string, { element: HTMLStyleElement; owners: Set<string> }>();
  sharedStyles.set(target, styles);
  let entry = styles.get(key);
  if (!entry) {
    const element = hostDocument(target).createElement("style");
    element.id = key;
    if (nonce !== undefined) element.nonce = nonce;
    placeStyle(element, target);
    entry = { element, owners: new Set() };
    styles.set(key, entry);
  }
  const text = isDocument(target) ? css : css.replace(/:root/g, ":host");
  if (entry.element.textContent !== text) entry.element.textContent = text;
  entry.owners.add(owner);
  return () => {
    entry!.owners.delete(owner);
    if (!entry!.owners.size) {
      entry!.element.remove();
      styles.delete(key);
    }
  };
};
let sequence = 0;
const brandForeground = (color: string): string => {
  const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(color)?.[1];
  if (!hex) return "#FFFFFF";
  const full =
    hex.length === 3 ? [...hex].map((value) => value + value).join("") : hex;
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(full.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const luminance =
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  const inkChannel = parseInt(viPalette.inkNight.slice(1, 3), 16) / 255;
  const inkLuminance = ((inkChannel + 0.055) / 1.055) ** 2.4;
  return (luminance + 0.05) / (inkLuminance + 0.05) > 1.05 / (luminance + 0.05)
    ? viPalette.inkNight
    : "#FFFFFF";
};
const variableTree = (tree: TokenTree, path: string[]): TokenTree =>
  Object.fromEntries(
    Object.entries(tree).map(([key, value]) => {
      const next = [...path, key];
      return [
        key,
        typeof value === "object"
          ? variableTree(value, next)
          : `var(--lk-${next.join("-").toLowerCase()})`,
      ];
    }),
  );
const cssTokens = (tokens: TokenRegistry): TokenRegistry => ({
  color: variableTree(tokens.color, ["color"]),
  typography: variableTree(tokens.typography, ["typography"]),
  space: variableTree(tokens.space, ["space"]),
  radius: variableTree(tokens.radius, ["radius"]),
  motion: variableTree(tokens.motion, ["motion"]),
  shadow: variableTree(tokens.shadow, ["shadow"]),
  zIndex: variableTree(tokens.zIndex, ["z-index"]),
  control: variableTree(tokens.control, ["control"]),
});
class ThemeRuntime implements LoongArkTheme {
  readonly id: string;
  readonly mode: ThemeMode;
  private tokenState: TokenRegistry;
  private readonly motion: "auto" | "force";
  private readonly scopedOnServer: boolean;
  private readonly nonce?: string;
  private host?: StyleHost;
  private scope?: HTMLElement;
  private target?: ThemeTarget;
  private portal?: HTMLElement;
  private releases = new Map<string, () => void>();
  private styleSheets = new Map<string, string>();
  private styleOrder = new Map<string, number>();
  private unmountCleanups = new Set<() => void>();
  private previousAttributes?: {
    theme: string | null;
    mode: string | null;
    motion: string | null;
  };
  constructor(options: CreateThemeOptions = {}) {
    this.nonce = options.nonce;
    this.scopedOnServer = Boolean(options.targetId);
    this.id = (options.targetId ?? `loongark-theme-${++sequence}`).replace(
      /[^a-zA-Z0-9_-]/g,
      "-",
    );
    this.mode = options.mode ?? "light";
    this.motion = options.motionPreference ?? "auto";
    let tokens = tokensForMode(this.mode);
    const primary =
      options.brand === "vi" || options.brand === "shaloong"
        ? viPalette.skyBlue
        : options.brand && options.brand !== "neutral"
          ? options.brand
          : undefined;
    if (
      primary &&
      !/^(#|rgb\(|rgba\(|hsl\(|hsla\(|oklch\(|var\()/i.test(primary)
    )
      throw new Error(`无效品牌色：${primary}；请使用 neutral、vi 或 CSS 颜色`);
    if (primary) {
      const semanticPrimary =
        options.brand === "vi" || options.brand === "shaloong"
          ? "#005EDB"
          : primary;
      tokens = mergeTokens(tokens, {
        color: {
          brand: {
            primary,
            primaryHover: `color-mix(in srgb, ${primary}, ${viPalette.inkNight} 10%)`,
            secondary: viPalette.deepBlue,
            accent: options.accent ?? viPalette.dawnBlue,
          },
          semantic: {
            primary: semanticPrimary,
            primaryForeground: brandForeground(semanticPrimary),
          },
        },
      });
    }
    if (options.accent)
      tokens = mergeTokens(tokens, {
        color: { brand: { accent: options.accent } },
      });
    this.tokenState = mergeTokens(tokens, options.overrides);
    this.styleSheets.set("primitive-base", baseCSS);
  }
  get tokens(): TokenRegistry {
    return this.tokenState;
  }
  get styleTokens(): TokenRegistry {
    return cssTokens(this.tokenState);
  }
  private selector(): string {
    return this.scope || (!this.host && this.scopedOnServer)
      ? `[data-lk-theme='${this.id}']`
      : this.host && !isDocument(this.host)
        ? ":host"
        : ":root";
  }
  toCSS(): string {
    return `${this.selector()} {\n${tokensToCssVariables(this.tokens)}\ncolor-scheme: ${this.mode === "dark" ? "dark" : "light"};\ncolor: var(--lk-color-semantic-foreground);\nbackground-color: var(--lk-color-semantic-background);\nfont-family: var(--lk-typography-fontfamily-body);\n}`;
  }
  toStyleSheet(): string {
    const styles = [...this.styleSheets].sort(([a], [b]) =>
      (this.styleOrder.get(normalizeStyleKey(a)) ?? this.styleOrder.size) -
      (this.styleOrder.get(normalizeStyleKey(b)) ?? this.styleOrder.size),
    );
    return [this.toCSS(), ...styles.map(([, css]) => css)].join("\n");
  }
  setStyleOrder(keys: readonly string[]): void {
    this.styleOrder = new Map(keys.map((key, index) => [normalizeStyleKey(key), index]));
    for (const [key, order] of this.styleOrder)
      sharedStyleOrder.set(`loongark-${key}`, order);
    if (this.host) {
      const styles = sharedStyles.get(this.host);
      for (const entry of styles?.values() ?? [])
        if (sharedStyleOrder.has(normalizeStyleKey(entry.element.id)))
          placeStyle(entry.element, this.host);
    }
  }
  onUnmount(cleanup: () => void): void {
    this.unmountCleanups.add(cleanup);
  }
  mount(target: ThemeTarget = globalThis.document): void {
    if (!target) return;
    if (this.target === target) {
      this.mountVariables();
      return;
    }
    if (this.target) this.unmount();
    this.target = target;
    this.scope = target.nodeType === 1 ? (target as HTMLElement) : undefined;
    const root = this.scope?.getRootNode();
    this.host = this.scope
      ? root?.nodeType === 11
        ? (root as ShadowRoot)
        : this.scope.ownerDocument
      : (target as StyleHost);
    const attributes =
      this.scope ??
      (isDocument(this.host)
        ? this.host.documentElement
        : (this.host.host as HTMLElement));
    this.previousAttributes = {
      theme: attributes.getAttribute("data-lk-theme"),
      mode: attributes.getAttribute("data-theme"),
      motion: attributes.getAttribute("data-lk-motion"),
    };
    attributes.setAttribute("data-lk-theme", this.id);
    attributes.setAttribute("data-theme", this.mode);
    attributes.setAttribute("data-lk-motion", this.motion);
    this.mountVariables();
    this.mountStyles("base", baseCSS);
    if (this.portal)
      (isDocument(this.host) ? this.host.body : this.host).appendChild(
        this.portal,
      );
  }
  private mountVariables(): void {
    if (!this.host) return;
    this.releases.get(this.id)?.();
    this.releases.set(
      this.id,
      mountStyleSheet(this.id, this.toCSS(), this.host, this.id, this.nonce),
    );
  }
  mountStyles(
    key: string,
    css: string,
    layer: "primitive" | "kit" = "primitive",
  ): void {
    this.styleSheets.set(`${layer}-${key}`, css);
    if (!this.host) this.mount();
    if (!this.host) return;
    const id = `loongark-${layer}-${key.replace(/-(light|dark|high-contrast)$/, "")}`;
    this.releases.get(id)?.();
    this.releases.set(
      id,
      mountStyleSheet(id, css, this.host, this.id, this.nonce),
    );
  }
  getPortalContainer(): HTMLElement | undefined {
    const host = this.host ?? globalThis.document;
    if (!host) return;
    if (!this.portal) {
      this.portal = hostDocument(host).createElement("div");
      this.portal.setAttribute("data-lk-theme", this.id);
      this.portal.setAttribute("data-lk-motion", this.motion);
      this.portal.style.display = "contents";
      (isDocument(host) ? host.body : host).appendChild(this.portal);
    }
    return this.portal;
  }
  addOverride(overrides: TokenOverrides): void {
    this.tokenState = mergeTokens(this.tokens, overrides);
    this.mountVariables();
  }
  snapshot(): ReturnType<typeof buildTokenArtifacts> {
    return buildTokenArtifacts(this.tokens);
  }
  unmount(): void {
    for (const cleanup of this.unmountCleanups) cleanup();
    this.unmountCleanups.clear();
    for (const release of this.releases.values()) release();
    this.releases.clear();
    this.portal?.remove();
    this.portal = undefined;
    const attributes =
      this.scope ??
      (this.host &&
        (isDocument(this.host) ? this.host.documentElement : this.host.host));
    if (
      attributes?.getAttribute("data-lk-theme") === this.id &&
      this.previousAttributes
    ) {
      for (const [key, value] of [
        ["data-lk-theme", this.previousAttributes.theme],
        ["data-theme", this.previousAttributes.mode],
        ["data-lk-motion", this.previousAttributes.motion],
      ] as const) {
        if (value === null) attributes.removeAttribute(key);
        else attributes.setAttribute(key, value);
      }
    }
    this.previousAttributes = undefined;
    this.target = undefined;
    this.scope = undefined;
    this.host = undefined;
  }
}
export const createLoongArkTheme = (
  options: CreateThemeOptions = {},
): LoongArkTheme => new ThemeRuntime(options);
