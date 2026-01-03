declare module "@ark-ui/svelte/radio-group" {
  import type { SvelteComponent } from "svelte";

  export namespace RadioGroup {
    export class Root extends SvelteComponent<{
      defaultValue?: string;
      value?: string;
      disabled?: boolean;
      readOnly?: boolean;
      name?: string;
      form?: string;
      orientation?: "horizontal" | "vertical";
      onValueChange?: (details: { value: string }) => void;
      "data-size"?: string;
      "data-orientation"?: string;
    }> {}

    export class Label extends SvelteComponent<{}> {}

    export class Item extends SvelteComponent<{
      value: string;
      disabled?: boolean;
      invalid?: boolean;
    }> {}

    export class ItemControl extends SvelteComponent<{}> {}

    export class ItemText extends SvelteComponent<{}> {}

    export class Indicator extends SvelteComponent<{}> {}

    export class ItemHiddenInput extends SvelteComponent<{}> {}
  }
}
