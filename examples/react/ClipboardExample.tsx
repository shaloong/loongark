import React from "react";
import {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
  LoongArkClipboardValueText,
} from "@loongark/react";
import type { ClipboardSize } from "@loongark/primitives";

interface ClipboardExampleProps {
  size?: ClipboardSize;
  disabled?: boolean;
}

export const ClipboardExample: React.FC<ClipboardExampleProps> = ({
  size = "md",
  disabled = false,
}) => {
  const [value, setValue] = React.useState("https://loongark.dev");

  return (
    <LoongArkClipboardRoot size={size} disabled={disabled} value={value}>
      <LoongArkClipboardLabel>Share link</LoongArkClipboardLabel>
      <LoongArkClipboardControl>
        <LoongArkClipboardInput
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          readOnly={disabled}
        />
        <LoongArkClipboardTrigger disabled={disabled}>
          Copy
        </LoongArkClipboardTrigger>
      </LoongArkClipboardControl>
      <LoongArkClipboardIndicator>Copied</LoongArkClipboardIndicator>
      <LoongArkClipboardValueText>{value}</LoongArkClipboardValueText>
    </LoongArkClipboardRoot>
  );
};
