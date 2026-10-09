import { defineComponent, h } from "vue";
import {
  LoongArkLocaleProvider,
  LoongArkFormatByte,
  LoongArkFormatNumber,
} from "@loongark/vue";
export const FormatBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkLocaleProvider,
        { locale: "zh-CN" },
        {
          default: () => [
            h("dl", {}, [
              h("dt", {}, ["文件大小"]),
              h("dd", {}, [
                h(LoongArkFormatByte, { value: 2048, unitSystem: "binary" }),
              ]),
              h("dt", {}, ["预算"]),
              h("dd", {}, [
                h(LoongArkFormatNumber, {
                  value: 1250,
                  style: "currency",
                  currency: "CNY",
                }),
              ]),
            ]),
          ],
        },
      );
    };
  },
});
