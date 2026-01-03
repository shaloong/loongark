type TokenValue = string | number;
export type TokenTree = {
    [key: string]: TokenValue | TokenTree;
};
export interface TokenRegistry {
    color: TokenTree;
    typography: TokenTree;
    space: TokenTree;
    radius: TokenTree;
    motion: TokenTree;
}
export declare const baseTokens: TokenRegistry;
export type TokenOverrides = Partial<TokenRegistry>;
export declare const mergeTokens: (base: TokenRegistry, overrides?: TokenOverrides) => TokenRegistry;
export declare const tokensToCssVariables: (tokens: TokenRegistry, prefix?: string) => string;
export declare const buildTokenArtifacts: (tokens?: TokenRegistry) => {
    css: string;
    json: string;
};
export {};
