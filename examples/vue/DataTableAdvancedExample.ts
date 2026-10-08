import { defineComponent, h, ref, onBeforeUnmount } from "vue";
import * as L from "@loongark/vue";
import {
  remoteColumns,
  initialRemoteState,
  remoteSnapshot,
  createProjectSource,
  type RemoteSnapshot,
} from "../shared/dataTableAdvancedDemo";
export const DataTableAdvancedExample = defineComponent({
  setup() {
    const state = ref<L.DataTableState>(initialRemoteState),
      snapshot = ref<RemoteSnapshot>(remoteSnapshot(initialRemoteState)),
      ids = ref<string[]>([]),
      owner = ref(true),
      reversed = ref(false),
      locked = ref(false);
    const source = createProjectSource((next) => (snapshot.value = next));
    onBeforeUnmount(() => source.dispose());
    const button = (
      label: string,
      action: () => void,
      disabled = false,
      variant: "outline" | "ghost" = "outline",
    ) =>
      h(L.LoongArkButton, { variant, onClick: action, disabled }, () => label);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "800px" } },
        () => [
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h2" },
              () => "Projects across teams",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () => "Choose columns and keep selected projects across pages.",
            ),
          ]),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              locked.value ? "Allow table updates" : "Lock table updates",
              () => (locked.value = !locked.value),
            ),
            button(
              owner.value ? "Hide owner" : "Show owner",
              () => (owner.value = !owner.value),
            ),
            button(
              reversed.value ? "Restore column order" : "Move revenue first",
              () => (reversed.value = !reversed.value),
            ),
            button(
              "Refresh rows",
              () => source.request(state.value),
              snapshot.value.loading,
            ),
            button(
              "Refresh with error",
              () => source.request(state.value, true),
              snapshot.value.loading,
            ),
            button(
              "Find Gamma slowly",
              () => {
                const next = { query: "Gamma", page: 1 };
                state.value = next;
                source.request(next, false, 900);
              },
              false,
              "ghost",
            ),
            button(
              "Find Beta",
              () => {
                const next = { query: "Beta", page: 1 };
                state.value = next;
                source.request(next);
              },
              false,
              "ghost",
            ),
          ]),
          h(L.LoongArkDataTable, {
            label: "Remote projects",
            mode: "server",
            data: snapshot.value.data,
            columns: remoteColumns,
            totalRows: snapshot.value.totalRows,
            pageSize: 2,
            state: state.value,
            onStateChange: (next: L.DataTableState) => {
              if (!locked.value) {
                state.value = next;
                source.request(next);
              }
            },
            selectedIds: ids.value,
            onSelectionChange: (next: string[]) => (ids.value = next),
            columnKeys: (reversed.value
              ? ["amount", "name", "owner"]
              : ["name", "owner", "amount"]
            ).filter((key) => owner.value || key !== "owner"),
            loading: snapshot.value.loading,
            error: snapshot.value.error,
            onRetry: () => source.request(state.value),
          }),
          h(
            "output",
            { "aria-label": "Selected remote projects" },
            ids.value.length ? ids.value.join(", ") : "No projects selected",
          ),
        ],
      );
  },
});
