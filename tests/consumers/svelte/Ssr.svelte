<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import * as L from "@loongark/svelte";
  import DrawerDirectionsExample from "../../../examples/svelte/DrawerDirectionsExample.svelte";
  const id = $props.id();
  const advancedSelect = L.useSelect(() => ({
    id: `${id}-advanced-select`,
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
<LoongArkDataTable
  label="SSR column layout"
  data={[{ id: "column", name: "Column SSR row" }]}
  columns={[
    { key: "name", label: "Project <safe>", minWidth: 120, maxWidth: 480 },
  ]}
  columnReorderable
  columnResizable
  loading
  columnWidths={{ name: 220 }}
  onColumnKeysChange={() => {
    throw Error("SSR must not change columns");
  }}
  onColumnWidthsChange={() => {
    throw Error("SSR must not resize columns");
  }}
/>

<LoongArkDataTable
  label="SSR groups"
  data={[
    { id: "sr1", name: "SSR grouped row", team: "Team <safe>", budget: 2 },
    {
      id: "sr2",
      name: "SSR second grouped row",
      team: "Team <safe>",
      budget: 3,
    },
  ]}
  columns={[
    { key: "name", label: "Project" },
    { key: "team", label: "Team" },
    { key: "budget", label: "Budget" },
  ]}
  groupBy={["team"]}
  aggregations={{ budget: "sum" }}
  onExpandedRowIdsChange={() => {
    throw Error("SSR must not expand rows");
  }}
/>

<LoongArkDataTable
  label="SSR hidden columns"
  data={[{ id: "sh1", team: "Hidden columns group" }]}
  columns={[{ key: "team", label: "Team" }]}
  columnKeys={[]}
  groupBy={["team"]}
/>

<L.LoongArkDataTable label="SSR range selection" data={[{id:"range",name:"Range <safe>"}]} columns={[{key:"name",label:"Project",editor:true}]} cellSelection defaultCellRange={{anchor:{rowId:"range",columnKey:"name"},focus:{rowId:"range",columnKey:"name"}}} onCellRangeChange={()=>{throw Error("SSR must not select cells")}} onCellCommit={()=>{throw Error("SSR must not edit cells")}}/>

<L.LoongArkCodeEditor id="ssr-code" name="ssr-source" defaultValue={'SSR source <safe>\nnext line'} onReady={() => { throw Error("SSR must not mount editor"); }} onValueChange={() => { throw Error("SSR must not edit"); }} language={() => { throw Error("SSR must not load syntax"); }} />
<L.LoongArkRichTextEditor id="ssr-rich" name="ssr-document" defaultValue={{ type:"doc", content:[{ type:"paragraph", content:[{type:"text",text:"SSR rich <safe>"}] }] }} onReady={() => { throw Error("SSR must not mount editor"); }} onValueChange={() => { throw Error("SSR must not edit"); }} />

{#each ["area", "donut", "scatter", "time", "log"] as mode}
  <LoongArkChart
    data={[{ id:"a",name:"Axis <safe>",at:"2026-09-01T00:00:00Z",x:1,value:10 },{ id:"b",name:"Next",at:"2026-09-10T00:00:00Z",x:5,value:100 }]}
    series={[{key:"value"}]} labelKey="name"
    type={mode === "time" || mode === "log" ? "line" : mode === "area" ? "area" : mode === "scatter" ? "scatter" : "donut"}
    xAxis={mode === "time" ? {type:"time",key:"at"} : mode === "scatter" ? {type:"linear",key:"x"} : undefined}
    yAxis={mode === "log" ? {type:"log"} : undefined}
    interactive showDataTable
    onSliceKeysChange={() => { throw Error("SSR must not toggle slices"); }}
  />
{/each}

<LoongArkQuestionnaire label="SSR multi matrix" questions={[{id:"multiMatrix",label:"Multiple matrix",type:"matrix",multiple:true,minSelections:1,maxSelections:2,rows:[{id:"row",label:"Multiple row"}],options:[{value:"a",label:"A"},{value:"b",label:"B"}],validateAsync:()=>{throw Error("SSR must not validate");}}]} defaultValue={{multiMatrix:{row:["a","b"]}}} onValueChange={()=>{throw Error("SSR must not emit");}} />

<LoongArkQuestionnaire label="SSR ranking" questions={[{id:"rankSurvey",label:"Ranking",type:"ranking",options:[{value:"a",label:"A"},{value:"b",label:"B"}],validateAsync:()=>{throw Error("SSR must not validate");}}]} defaultValue={{rankSurvey:["b","a"]}} onValueChange={()=>{throw Error("SSR must not emit");}} />

<LoongArkQuestionnaire label="SSR repeated survey" questions={[{id:"contactsSSR",label:"Contacts",type:"group",questions:[{id:"name",label:"Name",type:"text",validateAsync:()=>{throw Error("SSR must not validate");}},{id:"hidden",label:"Hidden",type:"text",when:()=>false}]}]} defaultValue={{contactsSSR:[{id:"stable",value:{name:"Group <safe>",hidden:"must-not-render-hidden"}}]}} onValueChange={()=>{throw Error("SSR must not emit");}} />

{#snippet customWidget(context:import("@loongark/kit").QuestionnaireCustomContext)}<L.LoongArkButton id={context.controlId} aria-labelledby={context.labelId}>SSR custom &lt;safe&gt; {context.answer}</L.LoongArkButton>{/snippet}
<LoongArkQuestionnaire label="SSR custom" questions={[{id:"score",label:"Score",type:"custom",customKind:"widget",validateAsync:()=>{throw Error("SSR must not validate custom");}}]} defaultValue={{score:"3"}} renderers={{widget:customWidget}} onValueChange={()=>{throw Error("SSR must not emit custom");}}/>
<LoongArkQuestionnaire label="SSR nested custom" questions={[{id:"customPeople",label:"People",type:"group",questions:[{id:"score",label:"Score",type:"custom",customKind:"widget"},{id:"ordinary",label:"Ordinary",type:"text"},{id:"hiddenCustom",label:"Hidden",type:"custom",customKind:"missing",when:()=>false}]}]} defaultValue={{customPeople:[{id:"stable",value:{score:"4",ordinary:"SSR ordinary <safe>",hiddenCustom:"hidden-custom-answer"}}]}} renderers={{widget:customWidget}} onValueChange={()=>{throw Error("SSR must not emit custom");}}/>

<L.LoongArkRatingGroupRoot name="ssr-rating" defaultValue={3} onValueChange={()=>{throw Error("SSR must not change rating");}}>
  <L.LoongArkRatingGroupLabel>SSR rating</L.LoongArkRatingGroupLabel>
  <L.LoongArkRatingGroupControl>{#each [1,2,3,4,5] as index}<L.LoongArkRatingGroupItem {index}>{index}</L.LoongArkRatingGroupItem>{/each}</L.LoongArkRatingGroupControl>
  <L.LoongArkRatingGroupHiddenInput/>
</L.LoongArkRatingGroupRoot>

<LoongArkDataTable
  label="SSR column window"
  data={[{ id: "ssr-window" }]}
  columns={Array.from({ length: 50 }, (_, index) => ({
    key: `cw${index}`,
    label: `SSR_window_${index}`,
  }))}
  columnVirtualization={{ width: 320, overscan: 1 }}
  pinnedColumns={{ end: ["cw49"] }}
  onColumnWidthsChange={() => {
    throw Error("SSR must not measure columns");
  }}
/>

<L.LoongArkVirtualGrid
  rowKeys={Array.from({ length: 10000 }, (_, i) => `grid-row-${i}`)}
  columnKeys={Array.from({ length: 80 }, (_, i) => `grid-column-${i}`)}
  height={200}
  width={320}
>
  {#snippet renderCell(
    details,
  )}SSR_grid_{details.rowIndex}_{details.columnIndex}{/snippet}
</L.LoongArkVirtualGrid>
<L.LoongArkVirtualMasonry
  keys={Array.from({ length: 10000 }, (_, i) => `masonry-${i}`)}
  height={200}
  width={640}
  estimateSize={100}
>
  {#snippet renderItem(details)}SSR_masonry_{details.index}{/snippet}
</L.LoongArkVirtualMasonry>

<L.LoongArkDateInputRoot name="ssr-local-datetime" locale="ar-EG" dir="rtl" defaultValue={[L.parseDateTime("2026-10-06T14:35:20")]} granularity="second" hourCycle={24} format={(date) => date.toString()} onValueChange={() => { throw Error("SSR must not emit"); }}>
  <L.LoongArkDateInputHiddenInput />
</L.LoongArkDateInputRoot>
<L.LoongArkDateInputRoot name="ssr-zoned-datetime" locale="ar-EG" dir="rtl" defaultValue={[L.parseZonedDateTime("2026-10-06T14:35:20[Asia/Shanghai]")]} granularity="second" hourCycle={24} format={(date) => date.toString()} onValueChange={() => { throw Error("SSR must not emit"); }}>
  <L.LoongArkDateInputHiddenInput />
</L.LoongArkDateInputRoot>
<output aria-label="SSR localized date">{L.parseLocalizedDate("٦/١٠/٢٠٢٦", {locale:"ar-EG"})?.toString()}</output>

<L.LoongArkInputRoot disabled readOnly required>
  <L.LoongArkInputInput name="ssr-inherit-input" />
  <L.LoongArkTextareaControl name="ssr-inherit-textarea" />
</L.LoongArkInputRoot>
<DrawerDirectionsExample />
<DrawerDirectionsExample />
<L.LoongArkInputRoot>
  <L.LoongArkInputInput name="ssr-individual-input" disabled readOnly required />
  <L.LoongArkTextareaControl name="ssr-individual-textarea" disabled readOnly required />
</L.LoongArkInputRoot>

<L.LoongArkEditableRoot defaultValue="Editable SSR &lt;value&gt;">
  <L.LoongArkEditableArea>
    <L.LoongArkEditablePreview data-testid="ssr-editable-value" />
    <L.LoongArkEditableInput />
  </L.LoongArkEditableArea>
</L.LoongArkEditableRoot>
<L.LoongArkEditableRoot defaultValue="Must not override custom preview">
  <L.LoongArkEditableArea>
    <L.LoongArkEditablePreview data-testid="ssr-editable-custom">Custom preview</L.LoongArkEditablePreview>
  </L.LoongArkEditableArea>
</L.LoongArkEditableRoot>
