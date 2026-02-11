declare module "@ark-ui/svelte/rating-group" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface RatingGroupRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface RatingGroupLabelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface RatingGroupControlProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface RatingGroupItemProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface RatingGroupHiddenInputProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const RatingGroup: {
    Root: SvelteComponent<RatingGroupRootProps>;
    Label: SvelteComponent<RatingGroupLabelProps>;
    Control: SvelteComponent<RatingGroupControlProps>;
    Item: SvelteComponent<RatingGroupItemProps>;
    HiddenInput: SvelteComponent<RatingGroupHiddenInputProps>;
  };
}
