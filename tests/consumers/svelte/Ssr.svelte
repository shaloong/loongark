<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import * as L from "@loongark/svelte";
  const advancedSelect = L.useSelect(() => ({
    collection: L.createListCollection({ items: ["react", "vue"] }),
    name: "ssr-framework",
    defaultValue: ["react"],
  }));
  const asyncSSRLoader = L.createAsyncCollectionLoader<{ id: string }>({
    getKey: (item) => item.id,
    load: () => {
      throw Error("SSR must not request a collection");
    },
  });
  const asyncSSRList = L.useAsyncList(() => ({
    load: asyncSSRLoader.load,
    autoReload: false,
    initialItems: [{ id: "initial" }],
  }));
  const cropper = L.useImageCropper();
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
  const conditionalQuestions: readonly L.Question[] = [
    {
      id: "hiddenSSR",
      label: "Hidden SSR",
      type: "text",
      required: true,
      when: () => false,
      validate: () => {
        throw Error("SSR must not validate");
      },
      validateAsync: () => {
        throw Error("SSR must not request async validation");
      },
    },
    {
      id: "visibleSSR",
      label: "Visible SSR",
      type: "text",
      validate: () => {
        throw Error("SSR must not validate");
      },
      validateAsync: () => {
        throw Error("SSR must not request async validation");
      },
    },
  ];
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
      columns={[
        {
          key: "name",
          label: "Name",
          editor: {
            validate: () => {
              throw Error("SSR must not validate edit");
            },
          },
        },
      ]}
      onBatchCommit={() => {
        throw Error("SSR must not save batch");
      }}
      onCellCommit={() => {
        throw Error("SSR must not save edit");
      }}
      defaultSelectedIds={["a", "missing"]}
      onSelectionChange={() => {
        throw Error("SSR must not emit selection updates");
      }}
    />
  </LoongArkContainer></LoongArkProvider
>

<L.LoongArkSelectRootProvider value={advancedSelect}
  ><L.LoongArkSelectHiddenSelect /></L.LoongArkSelectRootProvider
>
<L.LoongArkImageCropperRootProvider value={cropper}
  ><L.LoongArkImageCropperViewport /></L.LoongArkImageCropperRootProvider
>
<L.LoongArkJsonTreeViewRoot
  data={{ project: "SSR JSON" }}
  defaultExpandedDepth={1}
  ><L.LoongArkJsonTreeViewTree
    aria-label="SSR structured data"
  /></L.LoongArkJsonTreeViewRoot
>
<L.LoongArkClientOnly
  >Client-only secret{#snippet fallback()}SSR client fallback{/snippet}</L.LoongArkClientOnly
>
<L.LoongArkHighlight text="SSR highlighted text" query="highlighted" />
<L.LoongArkFormatByte value={2048} unitSystem="binary" />

<L.LoongArkDateInputRoot
  name="ssr-date"
  locale="en-US"
  defaultValue={[L.parseDate("2026-10-03")]}
  ><L.LoongArkDateInputLabel>SSR date</L.LoongArkDateInputLabel
  ><L.LoongArkDateInputHiddenInput /></L.LoongArkDateInputRoot
>
<L.LoongArkTocRoot id="ssr-outline" items={[]}
  ><L.LoongArkTocNav
    ><L.LoongArkTocTitle>SSR outline</L.LoongArkTocTitle></L.LoongArkTocNav
  ></L.LoongArkTocRoot
>
<L.LoongArkSwapRoot swapped={false}
  ><L.LoongArkSwapIndicator type="off">SSR swap off</L.LoongArkSwapIndicator
  ></L.LoongArkSwapRoot
>
<L.LoongArkDrawerRoot
  ><L.LoongArkDrawerTrigger>SSR drawer trigger</L.LoongArkDrawerTrigger
  ></L.LoongArkDrawerRoot
>

<L.LoongArkQuestionnaire
  label="Conditional SSR"
  questions={conditionalQuestions}
  defaultValue={{
    hiddenSSR: "Hidden answer must not leak",
    visibleSSR: "Visible conditional SSR answer",
  }}
  onValueChange={() => {
    throw Error("SSR must not emit");
  }}
  onComplete={() => {
    throw Error("SSR must not complete");
  }}
/>

<L.LoongArkDataTable
  label="SSR remote table"
  data={[{ id: "remoteSSR", name: "SSR remote row", value: 9 }]}
  columns={[
    { key: "name", label: "Remote project" },
    { key: "value", label: "Remote revenue" },
  ]}
  columnKeys={["value", "name"]}
  pinnedColumns={{ start: ["value"], end: ["name"] }}
  mode="server"
  totalRows={21}
  pageSize={2}
  state={{
    query: "not-matching",
    page: 3,
    sort: { key: "value", direction: "asc" },
  }}
  selectedIds={["off-page"]}
  loading
  error="SSR remote failure"
  onRetry={() => {
    throw Error("SSR must not retry");
  }}
  onStateChange={() => {
    throw Error("SSR must not change table state");
  }}
  onSelectionChange={() => {
    throw Error("SSR must not select");
  }}
/>

<LoongArkChart
  data={[{ name: "Advanced SSR category", value: 75, hidden: 20 }]}
  series={[
    { key: "value", label: "Visible SSR series" },
    { key: "hidden", label: "Hidden SSR series" },
  ]}
  seriesKeys={["value"]}
  labelKey="name"
  title="Advanced SSR chart"
  domain={[0, 50]}
  interactive
  showDataTable
  onSeriesKeysChange={() => {
    throw Error("SSR must not toggle series");
  }}
/>

<L.LoongArkMessage
  author="Async SSR"
  status="error"
  onRetry={() => {
    throw Error("SSR must not retry");
  }}
  actions={[
    {
      id: "save",
      label: "Save SSR",
      onAction: () => {
        throw Error("SSR must not execute");
      },
    },
    {
      id: "archive",
      label: "Archive SSR",
      disabled: true,
      onAction: () => {
        throw Error("SSR must not execute");
      },
    },
  ]}
/>
<L.LoongArkAttachment
  name="SSR actions.txt"
  onPreview={() => {
    throw Error("SSR must not preview");
  }}
  onRemove={() => {
    throw Error("SSR must not remove");
  }}
/>
<L.LoongArkAttachment
  name="SSR upload.zip"
  status="uploading"
  progress={42}
  onCancel={() => {
    throw Error("SSR must not cancel");
  }}
/>

<L.LoongArkIcon
  icon={controlIcons.search}
  label="SSR search"
  size={32}
  absoluteStrokeWidth
/>

<LoongArkDataTable
  data={Array.from({ length: 1000 }, (_, i) => ({
    id: `v-${i}`,
    name: `Virtual ${i}`,
  }))}
  columns={[{ key: "name", label: "Virtual name" }]}
  pageSize={1000}
  virtualization={{ height: 200, estimateSize: 50, overscan: 1 }}
/>
<LoongArkMessageScroller
  virtualization={{
    keys: Array.from({ length: 500 }, (_, i) => `m-${i}`),
    height: 200,
    estimateSize: 50,
    overscan: 1,
  }}
  onAtBottomChange={() => {
    throw Error("SSR must not emit virtual scroll");
  }}
/>

<LoongArkChart
  data={[{ label: "SSR window", value: 3 }]}
  series={[{ key: "value", label: "SSR value" }]}
  labelKey="label"
  zoomable
  tooltip
  range={[0, 0]}
  onRangeChange={() => {
    throw Error("SSR must not change range");
  }}
/>

<LoongArkQuestionnaire
  label="SSR typed survey"
  questions={[
    {
      id: "typed",
      label: "SSR matrix",
      type: "matrix",
      rows: [{ id: "row", label: "SSR row" }],
      options: [{ value: "yes", label: "Yes" }],
      validateAsync: () => {
        throw Error("SSR must not validate");
      },
    },
  ]}
  defaultValue={{ typed: { row: "yes" } }}
/>

<p>SSR async idle {asyncSSRList().items.length}</p>

{#each ["first", "second"] as instance}
  <LoongArkDataTable
    label={`SSR query table ${instance}`}
    data={[{ id: "query", name: "Query SSR row", amount: 9, team: "" }]}
    columns={[
      { key: "name", label: "Project", filter: { type: "text" } },
      { key: "amount", label: "Revenue", filter: { type: "number" } },
      {
        key: "team",
        label: "Team",
        filter: {
          type: "select",
          options: [{ value: "", label: "Unassigned" }],
        },
      },
    ]}
    state={{
      query: "",
      page: 1,
      sorts: [
        { key: "name", direction: "asc" },
        { key: "amount", direction: "desc" },
      ],
      filters: [
        { key: "amount", operator: "gte", value: "-" },
        { key: "team", operator: "equals", value: "" },
      ],
    }}
    onStateChange={() => {
      throw Error("SSR must not change query");
    }}
  />
{/each}
