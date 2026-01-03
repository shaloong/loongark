declare module "@storybook/react" {
  export interface Meta<T = any> {
    title?: string;
    component?: any;
    argTypes?: Record<string, any>;
    args?: Record<string, any>;
    parameters?: Record<string, any>;
    tags?: string[];
    [key: string]: any;
  }

  export interface StoryObj<T = any> {
    args?: Record<string, any>;
    render?: (args: any) => any;
    [key: string]: any;
  }
}
