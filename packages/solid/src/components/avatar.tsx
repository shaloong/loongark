
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticAvatarStyles } from "@shaloong/loongark-primitives/automatic-styles/avatar";
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
import type { AvatarSize } from "@shaloong/loongark-primitives";

export interface LoongArkAvatarRootProps extends Omit<
  ArkAvatarRootProps,
  "asChild"
> {
  size?: AvatarSize;
  children?: JSX.Element;
}

export const LoongArkAvatarRoot: Component<LoongArkAvatarRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps({ size: "md" as AvatarSize }, props);

  return (
    <ArkAvatar.Root
      {...props}
      data-scope="avatar"
      data-part="root"
      data-size={merged.size}
    >
      {props.children}
    </ArkAvatar.Root>
  );
}, lkAutomaticAvatarStyles);

export const LoongArkAvatarImage: Component<ArkAvatarImageProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return <ArkAvatar.Image {...props} data-scope="avatar" data-part="image" />;
}, lkAutomaticAvatarStyles);

export const LoongArkAvatarFallback: Component<
  ArkAvatarFallbackProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkAvatar.Fallback {...props} data-scope="avatar" data-part="fallback">
      {props.children}
    </ArkAvatar.Fallback>
  );
}, lkAutomaticAvatarStyles);
