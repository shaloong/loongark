import { defineComponent, h } from "vue";
import * as L from "@loongark/vue";

import { controlIcons } from "@loongark/kit";
const Calendar = L.LoongArkCalendar;
export const CalendarExample = defineComponent({
  setup() {
    const content = () =>
      h(Calendar.Content, {}, () =>
        h(Calendar.View, { view: "day" }, () =>
          h(
            Calendar.Context,
            {},
            {
              default: (
                calendar: ReturnType<typeof L.useDatePickerContext>["value"],
              ) => [
                h(Calendar.ViewControl, {}, () => [
                  h(Calendar.PrevTrigger, { "aria-label": "上个月" }, () =>
                    h(L.LoongArkIcon, {
                      icon: controlIcons.chevronLeft,
                      size: "sm",
                    }),
                  ),
                  h(Calendar.RangeText),
                  h(Calendar.NextTrigger, { "aria-label": "下个月" }, () =>
                    h(L.LoongArkIcon, {
                      icon: controlIcons.chevronRight,
                      size: "sm",
                    }),
                  ),
                ]),
                h(Calendar.Table, {}, () => [
                  h(Calendar.TableHead, {}, () =>
                    h(Calendar.TableRow, {}, () =>
                      calendar.weekDays.map((day) =>
                        h(
                          Calendar.TableHeader,
                          { key: day.short },
                          () => day.narrow,
                        ),
                      ),
                    ),
                  ),
                  h(Calendar.TableBody, {}, () =>
                    calendar.weeks.map((week) =>
                      h(Calendar.TableRow, { key: week[0].toString() }, () =>
                        week.map((day) =>
                          h(
                            Calendar.TableCell,
                            { value: day, key: day.toString() },
                            () =>
                              h(Calendar.TableCellTrigger, {}, () => day.day),
                          ),
                        ),
                      ),
                    ),
                  ),
                ]),
              ],
            },
          ),
        ),
      );
    return () =>
      h(
        Calendar.Root,
        { inline: true, defaultValue: [L.parseDate("2026-10-08")] },
        () => [h(Calendar.Label, {}, () => "选择日期"), content()],
      );
  },
});
