import React from "react";
import {
  LoongArkBreadcrumb,
  LoongArkBreadcrumbList,
  LoongArkBreadcrumbItem,
  LoongArkBreadcrumbLink,
  LoongArkBreadcrumbSeparator,
  LoongArkBreadcrumbPage,
} from "@loongark/react";
export function BreadcrumbBasicExample() {
  return (
    <LoongArkBreadcrumb>
      <LoongArkBreadcrumbList>
        <LoongArkBreadcrumbItem>
          <LoongArkBreadcrumbLink href="#overview">概览</LoongArkBreadcrumbLink>
        </LoongArkBreadcrumbItem>
        <LoongArkBreadcrumbSeparator />
        <LoongArkBreadcrumbItem>
          <LoongArkBreadcrumbPage>组件</LoongArkBreadcrumbPage>
        </LoongArkBreadcrumbItem>
      </LoongArkBreadcrumbList>
    </LoongArkBreadcrumb>
  );
}
