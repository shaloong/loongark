declare module "@ark-ui/vue/rating-group" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface RatingGroupRootProps {}
  export interface RatingGroupLabelProps {}
  export interface RatingGroupControlProps {}
  export interface RatingGroupItemProps {}
  export interface RatingGroupHiddenInputProps {}

  export const RatingGroup: {
    Root: VueComponent<RatingGroupRootProps>;
    Label: VueComponent<RatingGroupLabelProps>;
    Control: VueComponent<RatingGroupControlProps>;
    Item: VueComponent<RatingGroupItemProps>;
    HiddenInput: VueComponent<RatingGroupHiddenInputProps>;
  };
}
