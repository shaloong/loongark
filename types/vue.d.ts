declare module "vue" {
  export interface App {
    provide(key: string, value: object): void;
  }

  export interface Plugin {
    install(app: App): void;
  }

  type Primitive = string | number | boolean | null | undefined;
  type SlotRender = () => VueChild;

  export type AttrValue =
    | Primitive
    | Primitive[]
    | String
    | Number
    | Boolean
    | Record<string, unknown>
    | AttrValue[]
    | ((...args: any[]) => any);
  export type Attrs = Record<string, AttrValue>;
  export type Slots = Record<string, SlotRender | undefined>;

  export interface SetupContext {
    attrs: Attrs;
    slots: Slots;
  }

  export type PropType<T> =
    | { __propType?: T }
    | (new (...args: any[]) => T)
    | ((...args: any[]) => T);

  type ComponentPropsMap<Props> = {
    [Key in keyof Props]-?: {
      type?: PropType<Props[Key]>;
      default?: Props[Key];
      required?: boolean;
    };
  };

  export type VueChild = any;

  export interface Component<Props = any> {
    (props: Props): VueChild;
  }

  export interface ComponentOptions<Props> {
    name?: string;
    props?: ComponentPropsMap<Props>;
    setup?: (props: Readonly<Props>, context: SetupContext) => () => VueChild;
  }

  export function defineComponent<Props>(
    options: ComponentOptions<Props>
  ): Component<Props>;

  export function ref<T>(value: T): { value: T };
  export type ComputedRef<T> = { value: T };
  export function computed<T>(getter: () => T): ComputedRef<T>;
  export function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K
  ): { value: T[K] };

  export function provide<T>(key: string | symbol, value: T): void;
  export function inject<T>(key: string | symbol): T | undefined;
  export function inject<T>(key: string | symbol, defaultValue: T): T;

  export type VueSlots = {
    [key: string]: VueChild | VueChild[] | ((...args: any[]) => VueChild);
  };

  export function h(
    type: string | Component<any>,
    props?: Attrs | null,
    children?: VueChild | VueChild[] | VueSlots
  ): VueChild;
}
