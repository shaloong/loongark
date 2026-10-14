/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import { LoongArkProviderCore } from "@shaloong/loongark-solid/provider-core";
import { LoongArkButton } from "@shaloong/loongark-solid/button";
import { createPrimitiveStyleBootstrap } from "@shaloong/loongark-primitives/styles";
import { buttonPrimitive } from "@shaloong/loongark-primitives/button";
const styleBootstrap = createPrimitiveStyleBootstrap([buttonPrimitive]);
export function CoreProviderExample() {
  const [mode, setMode] = createSignal<"light" | "dark">("light");
  return (
    <LoongArkProviderCore mode={mode()} styleBootstrap={styleBootstrap}>
      <div
        style={{
          padding: "16px",
          background: "var(--lk-color-semantic-background)",
          color: "var(--lk-color-semantic-foreground)",
        }}
      >
        <LoongArkButton
          onClick={() => setMode(mode() === "light" ? "dark" : "light")}
        >
          切换轻量主题
        </LoongArkButton>
      </div>
    </LoongArkProviderCore>
  );
}
