declare module "@ark-ui/svelte/avatar" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface AvatarRootProps {
    asChild?: boolean;
    id?: string;
    ids?: Record<string, string>;
    name?: string;
    src?: string;
    fallbackDelay?: number;
  }

  export interface AvatarImageProps {
    asChild?: boolean;
    src?: string;
    alt?: string;
    loading?: "eager" | "lazy";
  }

  export interface AvatarFallbackProps {
    asChild?: boolean;
  }

  export const Avatar: {
    Root: SvelteComponent<AvatarRootProps>;
    Image: SvelteComponent<AvatarImageProps>;
    Fallback: SvelteComponent<AvatarFallbackProps>;
  };
}
