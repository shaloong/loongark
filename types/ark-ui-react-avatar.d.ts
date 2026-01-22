declare module "@ark-ui/react/avatar" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

  export interface AvatarRootProps {
    id?: string;
    ids?: Record<string, string>;
    name?: string;
    src?: string;
    fallbackDelay?: number;
    onStatusChange?: (details: { status: string }) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface AvatarImageProps {
    src?: string;
    alt?: string;
    loading?: "eager" | "lazy";
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface AvatarFallbackProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    AvatarRootProps & RefAttributes<HTMLDivElement>
  >;
  export const Image: ForwardRefExoticComponent<
    AvatarImageProps & RefAttributes<HTMLImageElement>
  >;
  export const Fallback: ForwardRefExoticComponent<
    AvatarFallbackProps & RefAttributes<HTMLSpanElement>
  >;

  export const Avatar: {
    Root: typeof Root;
    Image: typeof Image;
    Fallback: typeof Fallback;
  };
}
