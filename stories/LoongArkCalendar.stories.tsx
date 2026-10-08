import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoongArkCalendar as Calendar, parseDate } from "@loongark/react";
const meta = {
  title: "Components/Calendar",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <Calendar.Root inline defaultValue={[parseDate("2026-10-02")]}>
      <Calendar.Label>Choose a date</Calendar.Label>
      <Calendar.Content>
        <Calendar.View view="day">
          <Calendar.Context>
            {(calendar) => (
              <>
                <Calendar.ViewControl>
                  <Calendar.PrevTrigger aria-label="Previous month">
                    <LoongArkIcon icon={controlIcons.chevronLeft} size="sm" />
                  </Calendar.PrevTrigger>
                  <Calendar.RangeText />
                  <Calendar.NextTrigger aria-label="Next month">
                    <LoongArkIcon icon={controlIcons.chevronRight} size="sm" />
                  </Calendar.NextTrigger>
                </Calendar.ViewControl>
                <Calendar.Table>
                  <Calendar.TableHead>
                    <Calendar.TableRow>
                      {calendar.weekDays.map((day) => (
                        <Calendar.TableHeader key={day.short}>
                          {day.narrow}
                        </Calendar.TableHeader>
                      ))}
                    </Calendar.TableRow>
                  </Calendar.TableHead>
                  <Calendar.TableBody>
                    {calendar.weeks.map((week, index) => (
                      <Calendar.TableRow key={index}>
                        {week.map((day) => (
                          <Calendar.TableCell key={day.toString()} value={day}>
                            <Calendar.TableCellTrigger>
                              {day.day}
                            </Calendar.TableCellTrigger>
                          </Calendar.TableCell>
                        ))}
                      </Calendar.TableRow>
                    ))}
                  </Calendar.TableBody>
                </Calendar.Table>
              </>
            )}
          </Calendar.Context>
        </Calendar.View>
      </Calendar.Content>
    </Calendar.Root>
  ),
};
