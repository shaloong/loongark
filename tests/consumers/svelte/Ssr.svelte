<script lang="ts">
  import * as L from "@loongark/svelte";
  const advancedSelect=L.useSelect(()=>({collection:L.createListCollection({items:['react','vue']}),name:'ssr-framework',defaultValue:['react']}));
  const cropper=L.useImageCropper();
  import {
    LoongArkChart,
    LoongArkDataTable,
    LoongArkAttachment,
    LoongArkMessage,
    LoongArkBubble,
    LoongArkMessageScroller,
    LoongArkQuestionnaire,
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
    <LoongArkMessageScroller label="SSR conversation"
      ><LoongArkMessage author="Lin"
        ><LoongArkBubble>Conversation SSR</LoongArkBubble><LoongArkAttachment
          name="SSR.pdf"
          status="uploading"
        /></LoongArkMessage
      ></LoongArkMessageScroller
    >
    <LoongArkQuestionnaire
      label="SSR feedback"
      questions={[{ id: "answer", label: "Your answer", type: "text" }]}
      defaultValue={{ answer: "SSR answer" }}
    />
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
    <LoongArkChart
      data={[
        { name: "SSR category", value: 1e308 },
        { name: "Missing", value: null },
      ]}
      series={[{ key: "value", label: "SSR series" }]}
      labelKey="name"
      title="SSR chart"
      labels={{ series: "SSR legend" }}
    />
    <LoongArkDataTable
      data={[{ id: "a", name: "Alpha" }]}
      columns={[{ key: "name", label: "Name" }]}
      defaultSelectedIds={["a", "missing"]}
      onSelectionChange={() => {
        throw Error("SSR must not emit selection updates");
      }}
    />
  </LoongArkContainer></LoongArkProvider
>

<L.LoongArkSelectRootProvider value={advancedSelect}><L.LoongArkSelectHiddenSelect/></L.LoongArkSelectRootProvider>
<L.LoongArkImageCropperRootProvider value={cropper}><L.LoongArkImageCropperViewport/></L.LoongArkImageCropperRootProvider>
<L.LoongArkJsonTreeViewRoot data={{project:'SSR JSON'}} defaultExpandedDepth={1}><L.LoongArkJsonTreeViewTree aria-label="SSR structured data"/></L.LoongArkJsonTreeViewRoot>
<L.LoongArkClientOnly>Client-only secret{#snippet fallback()}SSR client fallback{/snippet}</L.LoongArkClientOnly>
<L.LoongArkHighlight text="SSR highlighted text" query="highlighted"/>
<L.LoongArkFormatByte value={2048} unitSystem="binary"/>
