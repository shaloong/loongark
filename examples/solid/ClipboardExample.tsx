import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
  LoongArkClipboardValueText,
} from "@loongark/solid";
import type { ClipboardSize } from "@loongark/primitives";

interface ClipboardExampleProps {
  size?: ClipboardSize;
  disabled?: boolean;
}

export const ClipboardExample: Component<ClipboardExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const disabled = () => props.disabled ?? false;
  const [value, setValue] = createSignal("https://loongark.dev");

  return (
    <LoongArkClipboardRoot size={size()} disabled={disabled()} value={value()}>
      <LoongArkClipboardLabel>Share link</LoongArkClipboardLabel>
      <LoongArkClipboardControl>
        <LoongArkClipboardInput
          value={value()}
          onInput={(event: InputEvent & { currentTarget: HTMLInputElement }) =>
            setValue(event.currentTarget.value)
          }
          readOnly={disabled()}
        />
        <LoongArkClipboardTrigger disabled={disabled()}>Copy</LoongArkClipboardTrigger>
      </LoongArkClipboardControl>
      <LoongArkClipboardIndicator>Copied</LoongArkClipboardIndicator>
      <LoongArkClipboardValueText>{value()}</LoongArkClipboardValueText>
    </LoongArkClipboardRoot>
  );
};
