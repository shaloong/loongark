import type { SelectSize } from "@loongark/primitives";
import type {
  SelectRootProps as NativeRootProps,
  SelectItemProps as NativeItemProps,
} from "@ark-ui/svelte/select";
export type SelectRootProps<T extends object = object> = NativeRootProps<T> & {
  size?: SelectSize;
};
export type SelectItemProps<T extends object = object> = NativeItemProps<T>;
export type { SelectValueTextProps } from "@ark-ui/svelte/select";
