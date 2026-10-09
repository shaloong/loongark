import { defineComponent, h } from "vue";
import { LoongArkTimer } from "@loongark/vue";
export const TimerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkTimer.Root,
        { countdown: true, startMs: 60000 },
        {
          default: () => [
            h(
              LoongArkTimer.Area,
              {},
              {
                default: () => [
                  h(LoongArkTimer.Item, { type: "minutes" }),
                  h(LoongArkTimer.Separator, {}, { default: () => [":"] }),
                  h(LoongArkTimer.Item, { type: "seconds" }),
                ],
              },
            ),
            h(
              LoongArkTimer.Control,
              {},
              {
                default: () => [
                  h(
                    LoongArkTimer.ActionTrigger,
                    { action: "start" },
                    { default: () => ["开始"] },
                  ),
                  h(
                    LoongArkTimer.ActionTrigger,
                    { action: "pause" },
                    { default: () => ["暂停"] },
                  ),
                  h(
                    LoongArkTimer.ActionTrigger,
                    { action: "reset" },
                    { default: () => ["重置"] },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
