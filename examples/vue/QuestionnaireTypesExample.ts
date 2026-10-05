import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { complexQuestions, createQuestionnaireTypesDemo } from "../shared/questionnaireTypesDemo";
export const QuestionnaireTypesExample = defineComponent({setup() {
 const revision = ref(0), demo = createQuestionnaireTypesDemo(() => revision.value++);
 return () => { revision.value; const snapshot = demo.snapshot;
 const button = (label: string, onClick: () => void) => h(L.LoongArkButton, {variant:"outline",onClick}, () => label);
 return h(L.LoongArkStack,{gap:"md",style:{maxWidth:"640px",width:"100%"}},()=>[
 h(L.LoongArkTypography,{as:"h2"},()=>"Structured answers"),
 h(L.LoongArkStack,{orientation:"horizontal",gap:"sm"},()=>[
 button(snapshot.reject ? "Accept updates" : "Reject updates",demo.toggleReject),button(snapshot.disabled ? "Enable survey" : "Disable survey",demo.toggleDisabled),button(snapshot.shown ? "Hide survey" : "Show survey",demo.toggleShown),button("Reset survey",demo.reset)]),
 snapshot.shown && h(L.LoongArkQuestionnaire,{label:"Structured review",questions:complexQuestions,value:snapshot.value,disabled:snapshot.disabled,completed:!!snapshot.saved,onValueChange:demo.change,onComplete:demo.complete}),
 h("output",{"aria-label":"Saved structured answers",style:{minWidth:0,maxWidth:"100%",overflowWrap:"anywhere"}},snapshot.saved ? JSON.stringify(snapshot.saved) : "No answers saved")]); };
}});
