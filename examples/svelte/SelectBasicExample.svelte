<script lang="ts">
  import {
    createListCollection,
    LoongArkSelectRoot,
    LoongArkSelectLabel,
    LoongArkSelectControl,
    LoongArkSelectTrigger,
    LoongArkSelectValueText,
    LoongArkSelectIndicator,
    LoongArkSelectPositioner,
    LoongArkSelectContent,
    LoongArkSelectList,
    LoongArkSelectItem,
    LoongArkSelectItemText,
    LoongArkSelectItemIndicator,
    LoongArkSelectHiddenSelect,
  } from "@loongark/svelte";
  const collection = createListCollection({
    items: [
      { value: "beijing", label: "北京" },
      { value: "shanghai", label: "上海" },
    ],
  });
</script>

<LoongArkSelectRoot {collection} name="city">
  <LoongArkSelectLabel>城市</LoongArkSelectLabel>
  <LoongArkSelectControl>
    <LoongArkSelectTrigger>
      <LoongArkSelectValueText placeholder="选择城市" />
      <LoongArkSelectIndicator />
    </LoongArkSelectTrigger>
  </LoongArkSelectControl>
  <LoongArkSelectPositioner>
    <LoongArkSelectContent>
      <LoongArkSelectList>
        {#each collection.items as item}<LoongArkSelectItem {item}>
            <LoongArkSelectItemText>
              {item.label}
            </LoongArkSelectItemText>
            <LoongArkSelectItemIndicator />
          </LoongArkSelectItem>{/each}
      </LoongArkSelectList>
    </LoongArkSelectContent>
  </LoongArkSelectPositioner>
  <LoongArkSelectHiddenSelect />
</LoongArkSelectRoot>
