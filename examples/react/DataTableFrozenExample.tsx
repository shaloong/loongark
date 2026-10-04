import { useState } from "react";
import * as L from "@loongark/react";
import {
  frozenRows,
  frozenColumns,
  frozenTitle,
  frozenDescription,
  frozenKeys,
  frozenPins,
} from "../shared/dataTableFrozenDemo";
export function DataTableFrozenExample() {
  const [enabled, setEnabled] = useState(true);
  const [extra, setExtra] = useState(false);
  const [owner, setOwner] = useState(true);
  const [reversed, setReversed] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ids, setIds] = useState<string[]>([]);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 800 }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography as="h2">{frozenTitle}</L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          {frozenDescription}
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setEnabled(!enabled)}
        >
          {enabled ? "Unfreeze columns" : "Freeze columns"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setExtra(!extra)}>
          {extra ? "Unfreeze owner" : "Freeze owner"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setOwner(!owner)}>
          {owner ? "Hide owner" : "Show owner"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setReversed(!reversed)}
        >
          {reversed ? "Restore column order" : "Move notes first"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setRtl(!rtl)}>
          {rtl ? "Use LTR" : "Use RTL"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Hide table" : "Show table"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      <div dir={rtl ? "rtl" : "ltr"}>
        {visible ? (
          <L.LoongArkDataTable
            label="Release projects"
            data={frozenRows}
            columns={frozenColumns}
            columnKeys={frozenKeys(owner, reversed)}
            pinnedColumns={frozenPins(enabled, extra)}
            pageSize={3}
            selectedIds={ids}
            onSelectionChange={setIds}
          />
        ) : (
          <p>Table hidden</p>
        )}
      </div>
      <output aria-label="Selected release projects">
        {ids.length ? ids.join(", ") : "No projects selected"}
      </output>
    </L.LoongArkStack>
  );
}
