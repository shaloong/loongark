/** @jsxImportSource solid-js */
import { render } from "solid-js/web";
import * as L from "../../../packages/solid/dist/index.js";

let dispose: (() => void) | undefined;
const inputs = new Map<string, HTMLInputElement>();
export function nativeRefs() {
  return [...inputs].map(([name, input]) => ({
    name,
    connected: input.isConnected,
    value: input.value,
  }));
}
export function unmountNativeRefs() {
  dispose?.();
  dispose = undefined;
}
export function mountNativeRefs() {
  inputs.clear();
  const ref = (name: string) => (input: HTMLInputElement) =>
    inputs.set(name, input);
  dispose = render(
    () => (
      <L.LoongArkProvider>
        <form aria-label="Native selection refs">
          <L.LoongArkCheckboxRoot
            checked
            name="agreement"
            onCheckedChange={() => {}}
          >
            <L.LoongArkCheckboxControl>
              <L.LoongArkCheckboxIndicator />
            </L.LoongArkCheckboxControl>
            <L.LoongArkCheckboxLabel>Agreement</L.LoongArkCheckboxLabel>
            <L.LoongArkCheckboxHiddenInput ref={ref("checkbox")} />
          </L.LoongArkCheckboxRoot>
          <L.LoongArkSwitchRoot
            checked
            name="notifications"
            onCheckedChange={() => {}}
          >
            <L.LoongArkSwitchControl>
              <L.LoongArkSwitchThumb />
            </L.LoongArkSwitchControl>
            <L.LoongArkSwitchLabel>Notifications</L.LoongArkSwitchLabel>
            <L.LoongArkSwitchHiddenInput ref={ref("switch")} />
          </L.LoongArkSwitchRoot>
          <L.LoongArkRadioGroupRoot
            value="compact"
            name="density"
            onValueChange={() => {}}
          >
            <L.LoongArkRadioGroupLabel>Density</L.LoongArkRadioGroupLabel>
            {["compact", "comfortable"].map((value) => (
              <L.LoongArkRadioGroupItem value={value}>
                <L.LoongArkRadioGroupItemControl />
                <L.LoongArkRadioGroupItemText>
                  {value}
                </L.LoongArkRadioGroupItemText>
                <L.LoongArkRadioGroupItemHiddenInput ref={ref(value)} />
              </L.LoongArkRadioGroupItem>
            ))}
          </L.LoongArkRadioGroupRoot>
          <L.LoongArkTagsInputRoot
            value={["Solid"]}
            name="frameworks"
            onValueChange={() => {}}
          >
            <L.LoongArkTagsInputLabel>Frameworks</L.LoongArkTagsInputLabel>
            <L.LoongArkTagsInputControl>
              <L.LoongArkTagsInputItem value="Solid" index={0}>
                <L.LoongArkTagsInputItemText>Solid</L.LoongArkTagsInputItemText>
              </L.LoongArkTagsInputItem>
              <L.LoongArkTagsInputInput />
            </L.LoongArkTagsInputControl>
            <L.LoongArkTagsInputHiddenInput ref={ref("tags")} />
          </L.LoongArkTagsInputRoot>
        </form>
      </L.LoongArkProvider>
    ),
    document.querySelector("main")!,
  );
}
