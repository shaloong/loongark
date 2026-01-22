declare module "@ark-ui/vue/avatar" {
  import type { DefineComponent } from "vue";

  export const AvatarRoot: DefineComponent<any>;
  export const AvatarImage: DefineComponent<any>;
  export const AvatarFallback: DefineComponent<any>;

  export const Avatar: {
    Root: typeof AvatarRoot;
    Image: typeof AvatarImage;
    Fallback: typeof AvatarFallback;
  };
}
