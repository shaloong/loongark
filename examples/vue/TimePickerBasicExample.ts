import { defineComponent, h } from "vue";
import { LoongArkTimePicker } from "@loongark/vue";
export const TimePickerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkTimePicker, {
        label: "会议时间",
        name: "meeting",
        defaultValue: "09:30",
        minuteStep: 15,
      });
    };
  },
});
