import React from "react";
import { EditableExample } from "./EditableExample";
import {
  editableStates,
  editableStateStyle,
} from "../shared/editableStateDemo";
export function EditableStatesExample() {
  return (
    <section data-editable-states style={editableStateStyle}>
      {editableStates.map((item) => (
        <div
          key={item.label}
          data-demo-state={item.disabled ? "disabled" : item.state}
        >
          <p
            style={{
              margin: "0 0 var(--lk-space-component-sm)",
              fontWeight: 600,
            }}
          >
            {item.label}
          </p>
          <EditableExample state={item.state} disabled={item.disabled} />
        </div>
      ))}
    </section>
  );
}
