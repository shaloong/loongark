<script lang="ts">
  import * as L from "@loongark/svelte";
</script>

<L.LoongArkDateInputRoot
  name="appointment"
  locale="zh-CN"
  defaultValue={[L.parseDate("2026-10-09")]}
  ><L.LoongArkDateInputLabel>预约日期</L.LoongArkDateInputLabel
  ><L.LoongArkDateInputControl
    ><L.LoongArkDateInputSegmentGroup
      ><L.LoongArkDateInputSegmentContext
        >{#snippet render(segment)}<L.LoongArkDateInputSegment {segment}
            >{segment.text}</L.LoongArkDateInputSegment
          >{/snippet}</L.LoongArkDateInputSegmentContext
      ></L.LoongArkDateInputSegmentGroup
    ></L.LoongArkDateInputControl
  ><L.LoongArkDateInputHiddenInput /></L.LoongArkDateInputRoot
>
