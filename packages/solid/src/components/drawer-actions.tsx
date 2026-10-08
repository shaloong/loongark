import { createUniqueId } from "solid-js";
import { Drawer, type DrawerCloseTriggerProps } from "@ark-ui/solid/drawer";
const action =
  (variant: "solid" | "outline") => (props: DrawerCloseTriggerProps) => {
    const id = createUniqueId();
    return (
      <Drawer.CloseTrigger
        {...props}
        id={props.id ?? id}
        data-scope="button"
        data-part="root"
        data-variant={variant}
        data-size="md"
      />
    );
  };
export const DrawerAction = action("solid");
export const DrawerCancel = action("outline");
