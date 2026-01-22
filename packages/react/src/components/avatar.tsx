/**
 * Avatar component - React wrapper.
 * Injects data-scope/data-part and size mapping.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Avatar } from "@ark-ui/react/avatar";
import type { AvatarSize } from "@loongark/primitives";

type ArkAvatarRootProps = ComponentPropsWithoutRef<typeof Avatar.Root>;
type ArkAvatarImageProps = ComponentPropsWithoutRef<typeof Avatar.Image>;
type ArkAvatarFallbackProps = ComponentPropsWithoutRef<typeof Avatar.Fallback>;

export interface LoongArkAvatarRootProps
  extends Omit<ArkAvatarRootProps, "asChild"> {
  size?: AvatarSize;
  children?: ReactNode;
}

export interface LoongArkAvatarImageProps
  extends Omit<ArkAvatarImageProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkAvatarFallbackProps
  extends Omit<ArkAvatarFallbackProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkAvatarRoot = forwardRef<
  HTMLDivElement,
  LoongArkAvatarRootProps
>(({ children, size = "md", ...props }, ref) => {
  return (
    <Avatar.Root
      {...props}
      ref={ref}
      data-scope="avatar"
      data-part="root"
      data-size={size}
    >
      {children}
    </Avatar.Root>
  );
});

LoongArkAvatarRoot.displayName = "LoongArkAvatarRoot";

export const LoongArkAvatarImage = forwardRef<
  HTMLImageElement,
  LoongArkAvatarImageProps
>(({ children, ...props }, ref) => {
  return (
    <Avatar.Image
      {...props}
      ref={ref}
      data-scope="avatar"
      data-part="image"
    >
      {children}
    </Avatar.Image>
  );
});

LoongArkAvatarImage.displayName = "LoongArkAvatarImage";

export const LoongArkAvatarFallback = forwardRef<
  HTMLSpanElement,
  LoongArkAvatarFallbackProps
>(({ children, ...props }, ref) => {
  return (
    <Avatar.Fallback
      {...props}
      ref={ref}
      data-scope="avatar"
      data-part="fallback"
    >
      {children}
    </Avatar.Fallback>
  );
});

LoongArkAvatarFallback.displayName = "LoongArkAvatarFallback";
