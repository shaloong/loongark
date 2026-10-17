import { defineComponent, h, ref } from "vue";
import {
  LoongArkStack,
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputControl,
  LoongArkButton,
  LoongArkDataTable,
} from "@shaloong/loongark-vue";
import type { DataTableState } from "@shaloong/loongark-kit";
import { searchRows, searchColumns } from "../shared/tableSearchDemo";

export const DataTableSearchExample = defineComponent({
  setup() {
    const state = ref<DataTableState>({ query: "Alpha", page: 1 });
    const showSearch = ref(false);
    return () =>
      h(LoongArkStack, { gap: "md" }, () => [
        h(LoongArkInputRoot, {}, () => [
          h(LoongArkInputLabel, {}, () => "外部搜索"),
          h(LoongArkInputControl, {
            type: "search",
            value: state.value.query,
            onInput(event: Event) {
              if (event.target instanceof HTMLInputElement)
                state.value = {
                  ...state.value,
                  query: event.target.value,
                  page: 1,
                };
            },
          }),
        ]),
        h(
          LoongArkButton,
          {
            "aria-pressed": showSearch.value,
            onClick: () => {
              showSearch.value = !showSearch.value;
            },
          },
          () => "切换内置搜索",
        ),
        h(LoongArkDataTable, {
          label: "搜索示例",
          data: searchRows,
          columns: searchColumns,
          state: state.value,
          onStateChange: (next: DataTableState) => {
            state.value = next;
          },
          showSearch: showSearch.value,
        }),
      ]);
  },
});
