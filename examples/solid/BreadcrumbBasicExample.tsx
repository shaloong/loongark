/** @jsxImportSource solid-js */

import {
  LoongArkBreadcrumb,
  LoongArkBreadcrumbList,
  LoongArkBreadcrumbItem,
  LoongArkBreadcrumbLink,
  LoongArkBreadcrumbSeparator,
  LoongArkBreadcrumbPage,
} from "@loongark/solid";
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
