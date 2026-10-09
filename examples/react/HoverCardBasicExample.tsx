import React from "react";
import {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
} from "@loongark/react";
export function HoverCardBasicExample() {
  return (
    <LoongArkHoverCardRoot>
      <LoongArkHoverCardTrigger>查看个人资料</LoongArkHoverCardTrigger>
      <LoongArkHoverCardPositioner>
        <LoongArkHoverCardContent>项目维护者</LoongArkHoverCardContent>
      </LoongArkHoverCardPositioner>
    </LoongArkHoverCardRoot>
  );
}
