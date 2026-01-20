declare module "@ark-ui/vue/portal" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface PortalProps {
    to?: string | HTMLElement | null;
    disabled?: boolean;
  }

  export const Portal: VueComponent<PortalProps>;
}
