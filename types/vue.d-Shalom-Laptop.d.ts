declare module "vue" {
    interface App {
        provide(key: string, value: object): void;
    }
    interface Plugin {
        install(app: App): void;
    }
    type Primitive = string | number | boolean | null | undefined;
    type SlotRender = () => VueChild | VueChild[];
    type AttrValue = Primitive | Primitive[] | ((event: Event) => void);
    type Attrs = Record<string, AttrValue | undefined>;
    type Slots = Record<string, SlotRender | undefined>;
    interface SetupContext {
        attrs: Attrs;
        slots: Slots;
    }
    type PropType<T> = {
        __propType?: T;
    };
    type ComponentPropsMap<Props> = {
        [Key in keyof Props]-?: {
            type?: PropType<Props[Key]>;
            default?: Props[Key];
        };
    };
    type VueChild = Primitive | VueChild[];
    interface Component<Props = any> {
        (props?: Props): VueChild | VueChild[];
    }
    interface ComponentOptions<Props> {
        name?: string;
        props?: ComponentPropsMap<Props>;
        setup?: (props: Readonly<Props>, context: SetupContext) => () => VueChild | VueChild[];
    }
    function defineComponent<Props>(options: ComponentOptions<Props>): Component<Props>;
    function h(type: string | Component<any>, props?: any, children?: VueChild | VueChild[] | Record<string, SlotRender>): VueChild | VueChild[];
    function ref<T>(value: T): {
        value: T;
    };
}
