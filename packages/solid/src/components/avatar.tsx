/**
 * Avatar component - Solid wrapper.
 * Based on Ark UI Avatar.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Avatar as ArkAvatar,
  type AvatarRootProps as ArkAvatarRootProps,
  type AvatarImageProps as ArkAvatarImageProps,
  type AvatarFallbackProps as ArkAvatarFallbackProps,
} from "@ark-ui/solid/avatar";
import type { AvatarSize } from "@loongark/primitives";

export interface LoongArkAvatarRootProps
  extends Omit<ArkAvatarRootProps, "asChild"> {
  size?: AvatarSize;
  children?: JSX.Element;
}

export const LoongArkAvatarRoot: Component<LoongArkAvatarRootProps> = (
  props
) => {
  const merged = mergeProps({ size: "md" as AvatarSize }, props);

  return (
    <ArkAvatar.Root
      {...(props as any)}
      data-scope="avatar"
      data-part="root"
      data-size={merged.size}
    >
      {props.children}
    </ArkAvatar.Root>
  );
};

export const LoongArkAvatarImage: Component<ArkAvatarImageProps> = (props) => {
  return (
    <ArkAvatar.Image {...props} data-scope="avatar" data-part="image" />
  );
};

export const LoongArkAvatarFallback: Component<
  ArkAvatarFallbackProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkAvatar.Fallback {...props} data-scope="avatar" data-part="fallback">
      {props.children}
    </ArkAvatar.Fallback>
  );
};
