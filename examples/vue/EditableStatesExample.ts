import { defineComponent, h } from "vue";
import { EditableExample } from "./EditableExample";
import {
  editableStates,
  editableStateStyle,
} from "../shared/editableStateDemo";
export const EditableStatesExample = defineComponent({
  name: "EditableStatesExample",
  setup: () => () =>
    h(
      "section",
      { "data-editable-states": "", style: editableStateStyle },
      editableStates.map((item) =>
        h(
          "div",
          { "data-demo-state": item.disabled ? "disabled" : item.state },
          [
            h(
              "p",
              {
                style: {
                  margin: "0 0 var(--lk-space-component-sm)",
                  fontWeight: 600,
                },
              },
              item.label,
            ),
            h(EditableExample, { state: item.state, disabled: item.disabled }),
          ],
        ),
      ),
    ),
});
