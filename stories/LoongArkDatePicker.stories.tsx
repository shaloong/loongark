import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkDatePickerRoot,
  LoongArkDatePickerLabel,
  LoongArkDatePickerControl,
  LoongArkDatePickerInput,
  LoongArkDatePickerTrigger,
  LoongArkDatePickerClearTrigger,
  LoongArkDatePickerPositioner,
  LoongArkDatePickerContent,
  LoongArkDatePickerView,
  LoongArkDatePickerViewControl,
  LoongArkDatePickerViewTrigger,
  LoongArkDatePickerPrevTrigger,
  LoongArkDatePickerNextTrigger,
  LoongArkDatePickerMonthSelect,
  LoongArkDatePickerYearSelect,
  LoongArkDatePickerTable,
  LoongArkDatePickerTableHead,
  LoongArkDatePickerTableBody,
  LoongArkDatePickerTableRow,
  LoongArkDatePickerTableHeader,
  LoongArkDatePickerTableCell,
  LoongArkDatePickerTableCellTrigger,
  LoongArkDatePickerRangeText,
} from "@loongark/react";
import { useDatePickerContext, parseDate } from "@ark-ui/react/date-picker";

const meta: Meta = {
  title: "Components/Date Picker",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkDatePicker wraps Ark UI Date Picker with token-driven styling and size variants.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const CalendarView = () => {
  const datePicker = useDatePickerContext();
  const weekDays = datePicker.weekDays || [];
  const weeks = datePicker.weeks || [];
  const months = datePicker.getMonths?.({ format: "short" }) || [];
  const years = datePicker.getYears?.() || [];

  return (
    <LoongArkDatePickerView view="day">
      <LoongArkDatePickerViewControl>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LoongArkDatePickerPrevTrigger>{"<"}</LoongArkDatePickerPrevTrigger>
          <LoongArkDatePickerViewTrigger>
            {datePicker.visibleRangeText?.formatted || "Calendar"}
          </LoongArkDatePickerViewTrigger>
          <LoongArkDatePickerNextTrigger>{">"}</LoongArkDatePickerNextTrigger>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LoongArkDatePickerMonthSelect>
            {months.map((month: any) => (
              <option
                key={month.value}
                value={month.value}
                disabled={month.disabled}
              >
                {month.label}
              </option>
            ))}
          </LoongArkDatePickerMonthSelect>
          <LoongArkDatePickerYearSelect>
            {years.map((year: any) => (
              <option
                key={year.value}
                value={year.value}
                disabled={year.disabled}
              >
                {year.label}
              </option>
            ))}
          </LoongArkDatePickerYearSelect>
        </div>
      </LoongArkDatePickerViewControl>
      <LoongArkDatePickerTable>
        <LoongArkDatePickerTableHead>
          <LoongArkDatePickerTableRow>
            {weekDays.map((day: any) => (
              <LoongArkDatePickerTableHeader key={day.short}>
                {day.narrow}
              </LoongArkDatePickerTableHeader>
            ))}
          </LoongArkDatePickerTableRow>
        </LoongArkDatePickerTableHead>
        <LoongArkDatePickerTableBody>
          {weeks.map((week: any, weekIndex: number) => (
            <LoongArkDatePickerTableRow key={weekIndex}>
              {week.map((day: any, dayIndex: number) => (
                <LoongArkDatePickerTableCell
                  key={`${day.month}-${day.day}-${dayIndex}`}
                  value={day}
                >
                  <LoongArkDatePickerTableCellTrigger>
                    {day.day}
                  </LoongArkDatePickerTableCellTrigger>
                </LoongArkDatePickerTableCell>
              ))}
            </LoongArkDatePickerTableRow>
          ))}
        </LoongArkDatePickerTableBody>
      </LoongArkDatePickerTable>
    </LoongArkDatePickerView>
  );
};

const RangeSummary = () => {
  const datePicker = useDatePickerContext();
  const [start, end] = datePicker.valueAsString || [];
  const label = start && end ? `${start} - ${end}` : start || "Select a range";
  return <LoongArkDatePickerRangeText>{label}</LoongArkDatePickerRangeText>;
};

interface DatePickerDemoProps {
  size?: "sm" | "md" | "lg";
  selectionMode?: "single" | "range";
  inline?: boolean;
  defaultValue?: any[];
  label?: string;
}

const DatePickerDemo = ({
  size = "md",
  selectionMode = "single",
  inline = false,
  defaultValue,
  label = "Pick a date",
}: DatePickerDemoProps) => {
  return (
    <LoongArkDatePickerRoot
      size={size}
      selectionMode={selectionMode}
      defaultValue={defaultValue}
      defaultOpen={!inline}
      inline={inline}
      minView="day"
      maxView="day"
    >
      <LoongArkDatePickerLabel>{label}</LoongArkDatePickerLabel>
      <LoongArkDatePickerControl>
        <LoongArkDatePickerInput index={0} />
        {selectionMode === "range" && (
          <>
            <span style={{ color: "#767680", padding: "0 4px" }}>-</span>
            <LoongArkDatePickerInput index={1} />
          </>
        )}
        <LoongArkDatePickerClearTrigger>x</LoongArkDatePickerClearTrigger>
        <LoongArkDatePickerTrigger>Open</LoongArkDatePickerTrigger>
      </LoongArkDatePickerControl>
      {selectionMode === "range" && <RangeSummary />}
      {inline ? (
        <LoongArkDatePickerContent>
          <CalendarView />
        </LoongArkDatePickerContent>
      ) : (
        <LoongArkDatePickerPositioner>
          <LoongArkDatePickerContent>
            <CalendarView />
          </LoongArkDatePickerContent>
        </LoongArkDatePickerPositioner>
      )}
    </LoongArkDatePickerRoot>
  );
};

export const Basic: Story = {
  render: () => (
    <DatePickerDemo defaultValue={[parseDate("2026-01-12")]} />
  ),
};

export const Range: Story = {
  render: () => (
    <DatePickerDemo
      selectionMode="range"
      label="Select range"
      defaultValue={[parseDate("2026-01-10"), parseDate("2026-01-16")]}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <DatePickerDemo size="sm" inline label="Small" />
      <DatePickerDemo size="md" inline label="Medium" />
      <DatePickerDemo size="lg" inline label="Large" />
    </div>
  ),
};
