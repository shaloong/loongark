/** @jsxImportSource solid-js */
import { createSignal, Show } from "solid-js";
import * as L from "@loongark/solid";
import {
  frozenRows,
  frozenColumns,
  frozenTitle,
  frozenDescription,
  frozenKeys,
  frozenPins,
} from "../shared/dataTableFrozenDemo";
export function DataTableFrozenExample() {
  const [enabled, setEnabled] = createSignal(true);
  const [extra, setExtra] = createSignal(false);
  const [owner, setOwner] = createSignal(true);
  const [reversed, setReversed] = createSignal(false);
  const [rtl, setRtl] = createSignal(false);
  const [visible, setVisible] = createSignal(true);
  const [ids, setIds] = createSignal<string[]>([]);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "800px" }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography as="h2">{frozenTitle}</L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          {frozenDescription}
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setEnabled(!enabled())}
        >
          {enabled() ? "Unfreeze columns" : "Freeze columns"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setExtra(!extra())}>
          {extra() ? "Unfreeze owner" : "Freeze owner"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setOwner(!owner())}>
          {owner() ? "Hide owner" : "Show owner"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setReversed(!reversed())}
        >
          {reversed() ? "Restore column order" : "Move notes first"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setRtl(!rtl())}>
          {rtl() ? "Use LTR" : "Use RTL"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setVisible(!visible())}
        >
          {visible() ? "Hide table" : "Show table"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      <div dir={rtl() ? "rtl" : "ltr"}>
        <Show when={visible()} fallback={<p>Table hidden</p>}>
          <L.LoongArkDataTable
            label="Release projects"
            data={frozenRows}
            columns={frozenColumns}
            columnKeys={frozenKeys(owner(), reversed())}
            pinnedColumns={frozenPins(enabled(), extra())}
            pageSize={3}
            selectedIds={ids()}
            onSelectionChange={setIds}
          />
        </Show>
      </div>
      <output aria-label="Selected release projects">
        {ids().length ? ids().join(", ") : "No projects selected"}
      </output>
    </L.LoongArkStack>
  );
}
