import type { SvelteComponent } from "svelte";
import type {
  RadioGroupSize,
  RadioGroupOrientation,
} from "@loongark/primitives";

export default class RadioGroupRoot extends SvelteComponent<{
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  form?: string;
  onValueChange?: (details: { value: string }) => void;
}> {}
