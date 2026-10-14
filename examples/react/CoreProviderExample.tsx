import { useState } from "react";
import { LoongArkProviderCore } from "@shaloong/loongark-react/provider-core";
import { LoongArkButton } from "@shaloong/loongark-react/button";
import { createPrimitiveStyleBootstrap } from "@shaloong/loongark-primitives/styles";
import { buttonPrimitive } from "@shaloong/loongark-primitives/button";
const styleBootstrap = createPrimitiveStyleBootstrap([buttonPrimitive]);
export function CoreProviderExample() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  return (
    <LoongArkProviderCore {...{ mode, styleBootstrap }}>
      <div
        style={{
          padding: 16,
          background: "var(--lk-color-semantic-background)",
          color: "var(--lk-color-semantic-foreground)",
        }}
      >
        <LoongArkButton
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          切换轻量主题
        </LoongArkButton>
      </div>
    </LoongArkProviderCore>
  );
}
