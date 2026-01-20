import {
  TokenRegistry,
  TokenOverrides,
  baseTokens,
  buildTokenArtifacts,
  mergeTokens,
  tokensToCssVariables,
} from "@loongark/tokens";

export type ThemeMode = "light" | "dark" | "high-contrast";

export interface CreateThemeOptions {
  mode?: ThemeMode;
  brand?: string;
  accent?: string;
  overrides?: TokenOverrides;
  targetId?: string;
  /** 动效偏好：auto 遵循系统，force 强制启用动画 */
  motionPreference?: "auto" | "force";
}

export interface LoongArkTheme {
  readonly mode: ThemeMode;
  readonly tokens: TokenRegistry;
  toCSS(): string;
  mount(target?: Document | ShadowRoot): void;
  snapshot(): ReturnType<typeof buildTokenArtifacts>;
  addOverride(overrides: TokenOverrides): void;
}

const STYLE_TAG_PREFIX = "loongark-theme";

type StyleHost = Document | ShadowRoot;

const isDocumentHost = (host: StyleHost): host is Document =>
  typeof (host as Document).head !== "undefined";

const resolveDocument = (host: StyleHost): Document | null =>
  isDocumentHost(host) ? host : host.ownerDocument;

const applyBrandOverrides = (
  tokens: TokenRegistry,
  brand?: string,
  accent?: string
): TokenRegistry => {
  if (!brand && !accent) {
    return tokens;
  }

  const overrides: TokenOverrides = {
    color: {
      brand: {
        ...(brand ? { primary: brand } : {}),
        ...(accent ? { accent } : {}),
      },
    },
  };

  return mergeTokens(tokens, overrides);
};

class ThemeRuntime implements LoongArkTheme {
  public readonly mode: ThemeMode;
  public readonly tokens: TokenRegistry;
  private readonly targetId: string;
  private readonly motionPreference: "auto" | "force";

  constructor(options: CreateThemeOptions = {}) {
    this.mode = options.mode ?? "light";
    const merged = mergeTokens(baseTokens, options.overrides);
    this.tokens = applyBrandOverrides(merged, options.brand, options.accent);
    this.targetId = options.targetId ?? `${STYLE_TAG_PREFIX}-${this.mode}`;
    this.motionPreference = options.motionPreference ?? "force";
  }

  public toCSS(): string {
    const vars = tokensToCssVariables(this.tokens);
    const selector = this.mode === "dark" ? "html[data-theme='dark']" : ":root";
    return `${selector} {\n${vars}\n}`;
  }

  public mount(target?: StyleHost): void {
    const host = target ?? (globalThis.document as Document | undefined);
    if (!host) {
      if (typeof window !== "undefined") {
        console.warn(
          "[LoongArk Theme] Unable to mount theme: Document not available. " +
            "This may happen during SSR or in non-DOM environments. " +
            "The theme will be available in JS context but CSS variables won't be injected."
        );
      }
      return;
    }

    const doc = resolveDocument(host);
    if (!doc) {
      if (typeof window !== "undefined" && typeof console !== "undefined") {
        console.error(
          "[LoongArk Theme] Failed to resolve document for mounting theme"
        );
      }
      return;
    }

    const existing = host.querySelector?.(
      `#${this.targetId}`
    ) as HTMLStyleElement | null;
    const styleEl = existing ?? doc.createElement("style");
    styleEl.id = this.targetId;
    styleEl.textContent = this.toCSS();

    const rootEl = doc.documentElement ?? doc.body;
    if (rootEl) {
      if (this.motionPreference === "force") {
        rootEl.setAttribute("data-lk-motion", "force");
      } else {
        rootEl.removeAttribute("data-lk-motion");
      }
    }

    if (!existing) {
      if (isDocumentHost(host)) {
        host.head?.appendChild(styleEl);
      } else {
        host.appendChild(styleEl);
      }
    }
  }

  public snapshot() {
    return buildTokenArtifacts(this.tokens);
  }

  public addOverride(overrides: TokenOverrides): void {
    const merged = mergeTokens(this.tokens, overrides);
    (this as { tokens: TokenRegistry }).tokens = merged;
  }
}

export const createLoongArkTheme = (
  options: CreateThemeOptions = {}
): LoongArkTheme => new ThemeRuntime(options);
