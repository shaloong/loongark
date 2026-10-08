import React from "react";
import * as L from "@loongark/react";
import { controlIcons } from "@loongark/kit";
const Calendar = {
  Root: L.LoongArkDatePickerRoot,
  Label: L.LoongArkDatePickerLabel,
  Control: L.LoongArkDatePickerControl,
  Input: L.LoongArkDatePickerInput,
  Trigger: L.LoongArkDatePickerTrigger,
  Positioner: L.LoongArkDatePickerPositioner,
  Content: L.LoongArkDatePickerContent,
  View: L.LoongArkDatePickerView,
  ViewControl: L.LoongArkDatePickerViewControl,
  PrevTrigger: L.LoongArkDatePickerPrevTrigger,
  NextTrigger: L.LoongArkDatePickerNextTrigger,
  RangeText: L.LoongArkDatePickerRangeText,
  Table: L.LoongArkDatePickerTable,
  TableHead: L.LoongArkDatePickerTableHead,
  TableBody: L.LoongArkDatePickerTableBody,
  TableRow: L.LoongArkDatePickerTableRow,
  TableHeader: L.LoongArkDatePickerTableHeader,
  TableCell: L.LoongArkDatePickerTableCell,
  TableCellTrigger: L.LoongArkDatePickerTableCellTrigger,
  Context: L.LoongArkDatePickerContext,
};
export function DatePickerExample() {
  return (
    <Calendar.Root defaultValue={[L.parseDate("2026-10-08")]}>
      <Calendar.Label>选择日期</Calendar.Label>
      <Calendar.Control>
        <Calendar.Input />
        <Calendar.Trigger aria-label="打开日历" />
      </Calendar.Control>
      <L.LoongArkPortal>
        <Calendar.Positioner>
          <Calendar.Content>
            <Calendar.View view="day">
              <Calendar.Context>
                {(calendar) => (
                  <>
                    <Calendar.ViewControl>
                      <Calendar.PrevTrigger aria-label="上个月">
                        <L.LoongArkIcon
                          icon={controlIcons.chevronLeft}
                          size="sm"
                        />
                      </Calendar.PrevTrigger>
                      <Calendar.RangeText />
                      <Calendar.NextTrigger aria-label="下个月">
                        <L.LoongArkIcon
                          icon={controlIcons.chevronRight}
                          size="sm"
                        />
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
                        {calendar.weeks.map((week) => (
                          <Calendar.TableRow key={week[0].toString()}>
                            {week.map((day) => (
                              <Calendar.TableCell
                                key={day.toString()}
                                value={day}
                              >
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
        </Calendar.Positioner>
      </L.LoongArkPortal>
    </Calendar.Root>
  );
}
