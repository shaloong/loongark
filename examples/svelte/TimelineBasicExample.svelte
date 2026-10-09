<script lang="ts">
  import {
    LoongArkTimeline,
    LoongArkTimelineItem,
    LoongArkTimelineIndicator,
    LoongArkTimelineContent,
    LoongArkTimelineTitle,
    LoongArkTimelineDescription,
    LoongArkTimelineTime,
  } from "@loongark/svelte";
</script>

<LoongArkTimeline>
  <LoongArkTimelineItem>
    <LoongArkTimelineIndicator>1</LoongArkTimelineIndicator>
    <LoongArkTimelineContent>
      <LoongArkTimelineTitle>创建项目</LoongArkTimelineTitle>
      <LoongArkTimelineDescription>项目已经创建。</LoongArkTimelineDescription>
      <LoongArkTimelineTime datetime="2026-10-09T09:00:00+08:00">
        09:00
      </LoongArkTimelineTime>
    </LoongArkTimelineContent>
  </LoongArkTimelineItem>
</LoongArkTimeline>
