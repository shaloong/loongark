<script lang="ts">
  import {
    LoongArkBreadcrumb,
    LoongArkBreadcrumbList,
    LoongArkBreadcrumbItem,
    LoongArkBreadcrumbLink,
    LoongArkBreadcrumbSeparator,
    LoongArkBreadcrumbPage,
  } from "@loongark/svelte";
</script>

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
