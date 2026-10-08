import assert from "node:assert/strict";
import {
  parseLocalizedDate,
  parseDateTime,
  parseZonedDateTime,
} from "../packages/kit/dist/localized-date.js";
const check = (input, locale, expected) =>
  assert.equal(
    parseLocalizedDate(input, { locale })?.toString(),
    expected,
    `${locale} ${input}`,
  );
check("10/6/2026", "en-US", "2026-10-06");
check("06/10/2026", "en-GB", "2026-10-06");
check("6.10.2026", "de-DE", "2026-10-06");
check("2026年10月6日", "zh-CN", "2026-10-06");
check("2026-10-06", "en-US", "2026-10-06");
check("October 6, 2026", "en-US", "2026-10-06");
check("6 October 2026", "en-GB", "2026-10-06");
check("6 octobre 2026", "fr-FR", "2026-10-06");
check("6. Oktober 2026", "de-DE", "2026-10-06");
check("6 de octubre de 2026", "es-ES", "2026-10-06");
check("6 октября 2026 г.", "ru-RU", "2026-10-06");
check("Oct 6 2026", "en-US", "2026-10-06");
check("October 6,2026", "en-US", "2026-10-06");
check("6 Oct 2026", "en-US", "2026-10-06");
check("29 Feb 2025", "en-GB", undefined);
check("6 Oct 26", "en-US", undefined);
check("6 Oct 2026 trailing", "en-US", undefined);
check("٦/١٠/٢٠٢٦", "ar-EG", "2026-10-06");
check("29/02/2024", "en-GB", "2024-02-29");
check("29/02/2025", "en-GB", undefined);
check("02/29/2025", "en-US", undefined);
check("13/6/2026", "en-US", undefined);
check("6/10/26", "en-GB", undefined);
check("tomorrow", "en-US", undefined);
check("2026-02-30", "en-US", undefined);
check("2026-10-06 trailing", "en-US", undefined);
check("06/10/2026", "invalid_locale", undefined);
check("", "en-US", undefined);
for (const locale of [
  "en-US",
  "en-GB",
  "de-DE",
  "fr-FR",
  "es-ES",
  "ru-RU",
  "pl-PL",
  "ar-EG",
  "fa-IR",
  "th-TH",
  "zh-CN",
  "ja-JP",
])
  for (const month of ["numeric", "long", "short"]) {
    const formatter = new Intl.DateTimeFormat(locale, {
      calendar: "gregory",
      year: "numeric",
      month,
      day: "numeric",
      timeZone: "UTC",
    });
    check(
      formatter.format(new Date(Date.UTC(2024, 1, 29))),
      locale,
      "2024-02-29",
    );
  }
assert.equal(
  parseDateTime("2026-10-06T14:35:20").toString(),
  "2026-10-06T14:35:20",
);
assert.throws(() => parseDateTime("2026-10-06T25:00"));
const zoned = parseZonedDateTime("2026-10-06T14:35[Asia/Shanghai]");
assert.equal(zoned.timeZone, "Asia/Shanghai");
assert.equal(zoned.offset, 28800000);
console.log(
  "本地化 Gregorian 数字/月份/本地数字、闰日/无效值/两位年份拒绝、日期时间与时区解析通过",
);
