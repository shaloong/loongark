import { createUniqueId } from "solid-js";
import { Dialog, type DialogCloseTriggerProps } from "@ark-ui/solid/dialog";
const action =
  (variant: "solid" | "outline") => (props: DialogCloseTriggerProps) => {
    const id = createUniqueId();
    return (
      <Dialog.CloseTrigger
        {...props}
        id={props.id ?? id}
        data-scope="button"
        data-part="root"
        data-variant={variant}
        data-size="md"
      />
    );
  };
export const DialogAction = action("solid");
export const DialogCancel = action("outline");
