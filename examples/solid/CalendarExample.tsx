/** @jsxImportSource solid-js */
import * as L from "@loongark/solid";
import { controlIcons } from "@loongark/kit";
const Calendar = L.LoongArkCalendar;
export function CalendarExample() {
  return (
    <Calendar.Root inline defaultValue={[L.parseDate("2026-10-08")]}>
      <Calendar.Label>选择日期</Calendar.Label>
      <Calendar.Content>
        <Calendar.View view="day">
          <Calendar.Context>
            {(calendar) => (
              <>
                <Calendar.ViewControl>
                  <Calendar.PrevTrigger aria-label="上个月">
                    <L.LoongArkIcon icon={controlIcons.chevronLeft} size="sm" />
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
                      {calendar().weekDays.map((day) => (
                        <Calendar.TableHeader>
                          {day.narrow}
                        </Calendar.TableHeader>
                      ))}
                    </Calendar.TableRow>
                  </Calendar.TableHead>
                  <Calendar.TableBody>
                    {calendar().weeks.map((week) => (
                      <Calendar.TableRow>
                        {week.map((day) => (
                          <Calendar.TableCell value={day}>
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
  );
}
