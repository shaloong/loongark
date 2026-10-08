import { formatExample } from "./format-example.mjs";
import { writeFile } from "node:fs/promises";

const parts = [
  "Root",
  "Label",
  "Control",
  "Input",
  "Trigger",
  "Positioner",
  "Content",
  "View",
  "ViewControl",
  "PrevTrigger",
  "NextTrigger",
  "RangeText",
  "Table",
  "TableHead",
  "TableBody",
  "TableRow",
  "TableHeader",
  "TableCell",
  "TableCellTrigger",
  "Context",
];
for (const framework of ["react", "vue", "solid", "svelte"]) {
  for (const popup of [false, true]) {
    const name = popup ? "DatePickerExample" : "CalendarExample";
    const declaration = popup
      ? `const Calendar={${parts.map((part) => `${part}:L.LoongArkDatePicker${part}`).join(",")}};`
      : "const Calendar=L.LoongArkCalendar;";
    const read = (name) =>
      framework === "react" || framework === "vue" ? name : `${name}()`;
    let body = `<Calendar.View view="day"><Calendar.Context>{(calendar)=><><Calendar.ViewControl><Calendar.PrevTrigger aria-label="上个月"><L.LoongArkIcon icon={controlIcons.chevronLeft} size="sm" /></Calendar.PrevTrigger><Calendar.RangeText /><Calendar.NextTrigger aria-label="下个月"><L.LoongArkIcon icon={controlIcons.chevronRight} size="sm" /></Calendar.NextTrigger></Calendar.ViewControl><Calendar.Table><Calendar.TableHead><Calendar.TableRow>{${read("calendar")}.weekDays.map(day=><Calendar.TableHeader>${read("day")}.narrow</Calendar.TableHeader>)}</Calendar.TableRow></Calendar.TableHead><Calendar.TableBody>{${read("calendar")}.weeks.map(week=><Calendar.TableRow>{week.map(day=><Calendar.TableCell value={day}><Calendar.TableCellTrigger>{day.day}</Calendar.TableCellTrigger></Calendar.TableCell>)}</Calendar.TableRow>)}</Calendar.TableBody></Calendar.Table></>}</Calendar.Context></Calendar.View>`;
    // week/day 是普通数组元素；只有状态机 context 在 Solid/Svelte 中为 accessor。
    body = body.replaceAll(`${read("day")}.narrow`, "{day.narrow}");
    let source;
    if (framework === "react" || framework === "solid") {
      source =
        (framework === "solid"
          ? "/** @jsxImportSource solid-js */\n"
          : 'import React from "react";\n') +
        `import * as L from "@loongark/${framework}";\nimport {controlIcons} from "@loongark/kit";\n${declaration}\nexport function ${name}(){return <Calendar.Root ${popup ? "" : "inline"} defaultValue={[L.parseDate("2026-10-08")]}><Calendar.Label>选择日期</Calendar.Label>${popup ? '<Calendar.Control><Calendar.Input /><Calendar.Trigger aria-label="打开日历" /></Calendar.Control><L.LoongArkPortal><Calendar.Positioner>' : ""}<Calendar.Content>${body}</Calendar.Content>${popup ? "</Calendar.Positioner></L.LoongArkPortal>" : ""}</Calendar.Root>;}`;
      if (framework === "react")
        source = source
          .replace(
            "<Calendar.TableHeader>",
            "<Calendar.TableHeader key={day.short}>",
          )
          .replace(
            "<Calendar.TableRow>{week.map",
            "<Calendar.TableRow key={week[0].toString()}>{week.map",
          )
          .replace(
            "<Calendar.TableCell value={day}>",
            "<Calendar.TableCell key={day.toString()} value={day}>",
          );
    } else if (framework === "vue") {
      source = `import {defineComponent,h} from "vue";\nimport * as L from "@loongark/vue";\nimport type {DatePickerContextProps} from "@ark-ui/vue/date-picker";\nimport {controlIcons} from "@loongark/kit";\n${declaration}\nexport const ${name}=defineComponent({setup(){const content=()=>h(Calendar.Content,{},()=>h(Calendar.View,{view:"day"},()=>h(Calendar.Context,{}, {default:(calendar: Parameters<NonNullable<DatePickerContextProps["default"]>>[0])=>[h(Calendar.ViewControl,{},()=>[h(Calendar.PrevTrigger,{"aria-label":"上个月"},()=>h(L.LoongArkIcon,{icon:controlIcons.chevronLeft,size:"sm"})),h(Calendar.RangeText),h(Calendar.NextTrigger,{"aria-label":"下个月"},()=>h(L.LoongArkIcon,{icon:controlIcons.chevronRight,size:"sm"}))]),h(Calendar.Table,{},()=>[h(Calendar.TableHead,{},()=>h(Calendar.TableRow,{},()=>calendar.weekDays.map(day=>h(Calendar.TableHeader,{key:day.short},()=>day.narrow)))),h(Calendar.TableBody,{},()=>calendar.weeks.map(week=>h(Calendar.TableRow,{key:week[0].toString()},()=>week.map(day=>h(Calendar.TableCell,{value:day,key:day.toString()},()=>h(Calendar.TableCellTrigger,{},()=>day.day))))))])]})));return ()=>h(Calendar.Root,{${popup ? "" : "inline:true,"}defaultValue:[L.parseDate("2026-10-08")]},()=>[h(Calendar.Label,{},()=>"选择日期"),${popup ? 'h(Calendar.Control,{},()=>[h(Calendar.Input),h(Calendar.Trigger,{"aria-label":"打开日历"})]),h(L.LoongArkPortal,{},()=>h(Calendar.Positioner,{},content))' : "content()"}]);}});`;
      // Vue Context 直接展开状态机 API 为 slot 参数；使用实际 useDatePickerContext 返回类型。
      source = source
        .replace(
          'import type {DatePickerContextProps} from "@ark-ui/vue/date-picker";',
          "",
        )
        .replace(
          'Parameters<NonNullable<DatePickerContextProps["default"]>>[0]',
          'ReturnType<typeof L.useDatePickerContext>["value"]',
        );
    } else {
      const content = `<Calendar.Content><Calendar.View view="day"><Calendar.Context>{#snippet render(calendar)}<Calendar.ViewControl><Calendar.PrevTrigger aria-label="上个月"><L.LoongArkIcon icon={controlIcons.chevronLeft} size="sm" /></Calendar.PrevTrigger><Calendar.RangeText /><Calendar.NextTrigger aria-label="下个月"><L.LoongArkIcon icon={controlIcons.chevronRight} size="sm" /></Calendar.NextTrigger></Calendar.ViewControl><Calendar.Table><Calendar.TableHead><Calendar.TableRow>{#each calendar().weekDays as day (day.short)}<Calendar.TableHeader>{day.narrow}</Calendar.TableHeader>{/each}</Calendar.TableRow></Calendar.TableHead><Calendar.TableBody>{#each calendar().weeks as week (week[0].toString())}<Calendar.TableRow>{#each week as day (day.toString())}<Calendar.TableCell value={day}><Calendar.TableCellTrigger>{day.day}</Calendar.TableCellTrigger></Calendar.TableCell>{/each}</Calendar.TableRow>{/each}</Calendar.TableBody></Calendar.Table>{/snippet}</Calendar.Context></Calendar.View></Calendar.Content>`;
      source = `<script lang="ts">import * as L from "@loongark/svelte";import {controlIcons} from "@loongark/kit";${declaration}</script><Calendar.Root ${popup ? "" : "inline"} defaultValue={[L.parseDate("2026-10-08")]}><Calendar.Label>选择日期</Calendar.Label>${popup ? '<Calendar.Control><Calendar.Input /><Calendar.Trigger aria-label="打开日历" /></Calendar.Control><L.LoongArkPortal><Calendar.Positioner>' : ""}${content}${popup ? "</Calendar.Positioner></L.LoongArkPortal>" : ""}</Calendar.Root>`;
    }
    await writeFile(
      `examples/${framework}/${name}.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
      await formatExample(
        `examples/${framework}/${name}.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
        source + "\n",
      ),
    );
  }
}
