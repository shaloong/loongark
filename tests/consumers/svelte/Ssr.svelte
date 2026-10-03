<script lang="ts">
  import {
    LoongArkFloatingActionButton,
    LoongArkSpeedDial,
    LoongArkImageList,
    LoongArkImageListItem,
    LoongArkMasonry,
    LoongArkMasonryItem,
    LoongArkTransferList,
    LoongArkTimePicker,
    LoongArkProvider,
    LoongArkButton,
    LoongArkContainer,
    LoongArkTextarea,
    LoongArkChipRemoveTrigger,
    LoongArkBottomNavigationItem,
  } from "@loongark/svelte";
</script>

<LoongArkProvider
  ><LoongArkContainer>
    <LoongArkFloatingActionButton aria-label="Create SSR"
      >＋</LoongArkFloatingActionButton
    >
    <LoongArkSpeedDial
      label="SSR actions"
      actions={[{ value: "new", label: "New" }]}
    />
    <LoongArkImageList columns={2}
      ><LoongArkImageListItem>Image SSR</LoongArkImageListItem
      ></LoongArkImageList
    >
    <LoongArkMasonry columns={2}
      ><LoongArkMasonryItem>Media SSR</LoongArkMasonryItem></LoongArkMasonry
    >
    <LoongArkTransferList
      items={[{ value: "alpha", label: "Alpha" }]}
      defaultValue={["alpha"]}
      name="assigned"
    />
    <LoongArkTimePicker defaultValue="13:30" name="meeting" minuteStep={15} />
    <LoongArkButton>Hello from Svelte SSR</LoongArkButton>
    <LoongArkTextarea
      name="notes"
      value="SSR notes"
      readonly
      autoSize
      minRows={2}
      maxRows={5}
    />
    <LoongArkChipRemoveTrigger>Remove</LoongArkChipRemoveTrigger>
    <LoongArkBottomNavigationItem href="#home" active
      >Home</LoongArkBottomNavigationItem
    >
  </LoongArkContainer></LoongArkProvider
>
