<script lang="ts">
  import * as L from "@loongark/svelte";
  import { controlIcons } from "@loongark/kit";
  const Calendar = L.LoongArkCalendar;
</script>

<Calendar.Root inline defaultValue={[L.parseDate("2026-10-08")]}
  ><Calendar.Label>选择日期</Calendar.Label><Calendar.Content
    ><Calendar.View view="day"
      ><Calendar.Context
        >{#snippet render(calendar)}<Calendar.ViewControl
            ><Calendar.PrevTrigger aria-label="上个月"
              ><L.LoongArkIcon
                icon={controlIcons.chevronLeft}
                size="sm"
              /></Calendar.PrevTrigger
            ><Calendar.RangeText /><Calendar.NextTrigger aria-label="下个月"
              ><L.LoongArkIcon
                icon={controlIcons.chevronRight}
                size="sm"
              /></Calendar.NextTrigger
            ></Calendar.ViewControl
          ><Calendar.Table
            ><Calendar.TableHead
              ><Calendar.TableRow
                >{#each calendar().weekDays as day (day.short)}<Calendar.TableHeader
                    >{day.narrow}</Calendar.TableHeader
                  >{/each}</Calendar.TableRow
              ></Calendar.TableHead
            ><Calendar.TableBody
              >{#each calendar().weeks as week (week[0].toString())}<Calendar.TableRow
                  >{#each week as day (day.toString())}<Calendar.TableCell
                      value={day}
                      ><Calendar.TableCellTrigger
                        >{day.day}</Calendar.TableCellTrigger
                      ></Calendar.TableCell
                    >{/each}</Calendar.TableRow
                >{/each}</Calendar.TableBody
            ></Calendar.Table
          >{/snippet}</Calendar.Context
      ></Calendar.View
    ></Calendar.Content
  ></Calendar.Root
>
