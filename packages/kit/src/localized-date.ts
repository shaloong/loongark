import { CalendarDate, parseDate } from "@internationalized/date";
export { parseDateTime, parseZonedDateTime } from "@internationalized/date";
export interface LocalizedDateOptions {
  /** 使用 Gregorian 日期；数字顺序、数字系统与月份名称按此 locale 解析。 */
  locale: string;
}
interface DatePattern {
  expression: RegExp;
  month: number;
  fields: ("year" | "day")[];
}
interface LocaleParser {
  digits: Map<string, string>;
  order: ("year" | "month" | "day")[];
  patterns: DatePattern[];
  names: Map<string, number>;
}
const parsers = new Map<string, LocaleParser>();
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalize = (value: string, locale: string) =>
  value
    .normalize("NFKC")
    .replace(/[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "")
    .toLocaleLowerCase(locale);
const valid = (year: number, month: number, day: number) => {
  if (
    !Number.isInteger(year) ||
    year < 1 ||
    year > 9999 ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    !Number.isInteger(day) ||
    day < 1 ||
    day > 31
  )
    return undefined;
  const date = new CalendarDate(year, month, day);
  return date.year === year && date.month === month && date.day === day
    ? date
    : undefined;
};
function parser(locale: string): LocaleParser {
  const cached = parsers.get(locale);
  if (cached) return cached;
  const digits = new Map<string, string>(),
    numbers = new Intl.NumberFormat(locale, { useGrouping: false });
  for (let index = 0; index < 10; index++)
    digits.set(normalize(numbers.format(index), locale), String(index));
  const numeric = new Intl.DateTimeFormat(locale, {
    calendar: "gregory",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const order = numeric
    .formatToParts(new Date(Date.UTC(2024, 10, 23)))
    .filter((part) => ["year", "month", "day"].includes(part.type))
    .map((part) => part.type as "year" | "month" | "day");
  const patterns: DatePattern[] = [],
    monthNames = new Map<string, number>();
  for (const monthStyle of ["long", "short"] as const) {
    const formatter = new Intl.DateTimeFormat(locale, {
      calendar: "gregory",
      year: "numeric",
      month: monthStyle,
      day: "numeric",
      timeZone: "UTC",
    });
    const standalone = new Intl.DateTimeFormat(locale, {
      calendar: "gregory",
      month: monthStyle,
      timeZone: "UTC",
    });
    for (let month = 1; month <= 12; month++) {
      const sample = new Date(Date.UTC(2024, month - 1, 23)),
        fields: ("year" | "day")[] = [];
      const parts = formatter.formatToParts(sample);
      const context = parts.find((part) => part.type === "month")!.value;
      const names = [...new Set([context, standalone.format(sample)])];
      for (const name of names) monthNames.set(normalize(name, locale), month);
      const pattern = parts
        .map((part) => {
          if (part.type === "year" || part.type === "day") {
            fields.push(part.type);
            return part.type === "year" ? "(\\d{4})" : "(\\d{1,2})";
          }
          if (part.type === "month")
            return `(?:${names.map((name) => escape(normalize(name, locale))).join("|")})`;
          return escape(normalize(part.value, locale)).replace(/\s+/g, "\\s+");
        })
        .join("");
      patterns.push({
        expression: new RegExp(`^${pattern}$`, "u"),
        month,
        fields,
      });
    }
  }
  const result = { digits, order, patterns, names: monthNames };
  if (parsers.size >= 32) parsers.delete(parsers.keys().next().value!);
  parsers.set(locale, result);
  return result;
}
/** 不猜测两位年份、相对日期或日月顺序；无效/不完整文本返回 undefined。 */
export function parseLocalizedDate(
  value: string,
  options: LocalizedDateOptions,
): CalendarDate | undefined {
  try {
    const config = parser(options.locale);
    let text = normalize(value, options.locale).trim();
    for (const [digit, ascii] of config.digits)
      text = text.split(digit).join(ascii);
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      const date = parseDate(text);
      return date.year >= 1 && date.toString() === text ? date : undefined;
    }
    const eastAsian = /^(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日?$/.exec(text);
    if (eastAsian)
      return valid(
        Number(eastAsian[1]),
        Number(eastAsian[2]),
        Number(eastAsian[3]),
      );
    if (/^[\d\s./-]+$/.test(text)) {
      const pieces = text.split(/[\s./-]+/);
      if (pieces.length !== 3) return undefined;
      const result = { year: 0, month: 0, day: 0 };
      for (let index = 0; index < 3; index++) {
        const field = config.order[index];
        if (
          !field ||
          !/^\d+$/.test(pieces[index]) ||
          (field === "year" && pieces[index].length !== 4) ||
          (field !== "year" && pieces[index].length > 2)
        )
          return undefined;
        result[field] = Number(pieces[index]);
      }
      return valid(result.year, result.month, result.day);
    }
    for (const pattern of config.patterns) {
      const match = pattern.expression.exec(text);
      if (!match) continue;
      let year = 0,
        day = 0;
      pattern.fields.forEach((field, index) => {
        if (field === "year") year = Number(match[index + 1]);
        else day = Number(match[index + 1]);
      });
      return valid(year, pattern.month, day);
    }
    // 月份名称消除日月歧义；允许常见的日/月名称顺序和可选逗号，拒绝未知后缀。
    for (const [name, month] of config.names) {
      const token = escape(name);
      const dayFirst = new RegExp(
        "^(\\d{1,2})\\.?\\s+" + token + "\\s*,?\\s*(\\d{4})$",
        "u",
      ).exec(text);
      if (dayFirst)
        return valid(Number(dayFirst[2]), month, Number(dayFirst[1]));
      const monthFirst = new RegExp(
        "^" + token + "\\s+(\\d{1,2})\\s*,?\\s*(\\d{4})$",
        "u",
      ).exec(text);
      if (monthFirst)
        return valid(Number(monthFirst[2]), month, Number(monthFirst[1]));
    }
    return undefined;
  } catch {
    return undefined;
  }
}
