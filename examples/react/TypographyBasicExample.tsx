import React from "react";
import { LoongArkTypography } from "@loongark/react";
export function TypographyBasicExample() {
  return (
    <div>
      <LoongArkTypography as="h2">项目说明</LoongArkTypography>
      <LoongArkTypography>清晰的正文内容。</LoongArkTypography>
      <LoongArkTypography variant="muted">次要信息。</LoongArkTypography>
    </div>
  );
}
