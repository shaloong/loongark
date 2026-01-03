declare module "vue" {
  export interface App {
    provide(key: string, value: object): void;
  }

  export interface Plugin {
    install(app: App): void;
  }

  type Primitive = string | number | boolean | null | undefined;
  type SlotRender = () => VueChild | VueChild[];

  export type AttrValue = Primitive | Primitive[] | ((event: Event) => void);
  export type Attrs = Record<string, AttrValue | undefined>;
  export type Slots = Record<string, SlotRender | undefined>;

  export interface SetupContext {
    attrs: Attrs;
    slots: Slots;
  }

  export type PropType<T> = { __propType?: T };

  type ComponentPropsMap<Props> = {
    [Key in keyof Props]-?: {
      type?: PropType<Props[Key]>;
      default?: Props[Key];
    };
  };

  export type VueChild = Primitive | VueChild[];

  export interface Component<Props = any> {
    (props?: Props): VueChild | VueChild[];
  }

  export interface ComponentOptions<Props> {
    name?: string;
    props?: ComponentPropsMap<Props>;
    setup?: (
      props: Readonly<Props>,
      context: SetupContext
    ) => () => VueChild | VueChild[];
  }

  export function defineComponent<Props>(
    options: ComponentOptions<Props>
  ): Component<Props>;

  export function h(
    type: string | Component<any>,
    props?: any,
    children?: VueChild | VueChild[] | Record<string, SlotRender>
  ): VueChild | VueChild[];

  export function ref<T>(value: T): { value: T };
}
