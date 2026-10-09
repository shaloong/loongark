import { defineComponent, h, ref } from "vue";
import { LoongArkQuestionnaire } from "@loongark/vue";
export const QuestionnaireBasicExample = defineComponent({
  setup() {
    const completed = ref(false);
    return () => {
      return h(LoongArkQuestionnaire, {
        label: "反馈问卷",
        questions: [
          { id: "name", type: "text", label: "姓名", required: true },
          { id: "notes", type: "text", label: "建议" },
        ],
        completed: completed.value,
        onComplete: () => (completed.value = true),
      });
    };
  },
});
