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

  constructor(options: CreateThemeOptions = {}) {
    this.mode = options.mode ?? "light";
    const merged = mergeTokens(baseTokens, options.overrides);
    this.tokens = applyBrandOverrides(merged, options.brand, options.accent);
    this.targetId = options.targetId ?? `${STYLE_TAG_PREFIX}-${this.mode}`;
  }

  public toCSS(): string {
    const vars = tokensToCssVariables(this.tokens);
    const selector = this.mode === "dark" ? "html[data-theme='dark']" : ":root";
    return `${selector} {\n${vars}\n}`;
  }

  public mount(target?: StyleHost): void {
    const host = target ?? (globalThis.document as Document | undefined);
    if (!host) {
      return;
    }

    const doc = resolveDocument(host);
    if (!doc) {
      return;
    }

    const existing = host.querySelector?.(
      `#${this.targetId}`
    ) as HTMLStyleElement | null;
    const styleEl = existing ?? doc.createElement("style");
    styleEl.id = this.targetId;
    styleEl.textContent = this.toCSS();

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
