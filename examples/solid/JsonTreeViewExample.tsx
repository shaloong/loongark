/** @jsxImportSource solid-js */
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/solid";

import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { inspectionData } from "../shared/arkAdditionsDemo";
export function JsonTreeViewExample() {
  const [data, setData] = createSignal(inspectionData);
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">
        Inspect structured data
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Expand branches with arrow keys. Values are rendered as text.
      </L.LoongArkTypography>
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() =>
          setData({
            ...inspectionData,
            project:
              data().project === "LoongArk" ? "Updated project" : "LoongArk",
          })
        }
      >
        Update data
      </L.LoongArkButton>
      <L.LoongArkJsonTreeViewRoot data={data()} defaultExpandedDepth={1}>
        <L.LoongArkJsonTreeViewTree
          aria-label="Project data"
          arrow={
            <span aria-hidden="true">
              <LoongArkIcon icon={controlIcons.chevronRight} size="sm" />
            </span>
          }
        />
      </L.LoongArkJsonTreeViewRoot>
    </L.LoongArkStack>
  );
}
