declare module "@ark-ui/solid/avatar" {
  import type { Component, JSX } from "solid-js";

  export interface AvatarRootProps {
    id?: string;
    ids?: Record<string, string>;
    name?: string;
    src?: string;
    fallbackDelay?: number;
    onStatusChange?: (details: { status: string }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface AvatarImageProps {
    src?: string;
    alt?: string;
    loading?: "eager" | "lazy";
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface AvatarFallbackProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Avatar: {
    Root: Component<AvatarRootProps>;
    Image: Component<AvatarImageProps>;
    Fallback: Component<AvatarFallbackProps>;
  };
}
