/** @jsxImportSource solid-js */

import {
  LoongArkCard,
  LoongArkCardHeader,
  LoongArkCardTitle,
  LoongArkCardDescription,
  LoongArkCardContent,
} from "@loongark/solid";
export function CardBasicExample() {
  return (
    <LoongArkCard>
      <LoongArkCardHeader>
        <LoongArkCardTitle>项目说明</LoongArkCardTitle>
        <LoongArkCardDescription>用于展示相关内容。</LoongArkCardDescription>
      </LoongArkCardHeader>
      <LoongArkCardContent>这里是卡片内容。</LoongArkCardContent>
    </LoongArkCard>
  );
}
