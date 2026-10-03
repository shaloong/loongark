<script lang="ts">
  import {
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
  </LoongArkContainer></LoongArkProvider
>
