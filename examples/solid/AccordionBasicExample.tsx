/** @jsxImportSource solid-js */

import {
  LoongArkAccordionRoot,
  LoongArkAccordionItem,
  LoongArkAccordionItemTrigger,
  LoongArkAccordionItemIndicator,
  LoongArkAccordionItemContent,
} from "@loongark/solid";
export function AccordionBasicExample() {
  return (
    <LoongArkAccordionRoot collapsible>
      <LoongArkAccordionItem value="one">
        <LoongArkAccordionItemTrigger>
          部署设置
          <LoongArkAccordionItemIndicator />
        </LoongArkAccordionItemTrigger>
        <LoongArkAccordionItemContent>
          这里是展开后的详细设置。
        </LoongArkAccordionItemContent>
      </LoongArkAccordionItem>
    </LoongArkAccordionRoot>
  );
}
