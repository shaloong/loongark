<script lang="ts">
  import {
    LoongArkNavigationMenu,
    LoongArkNavigationMenuList,
    LoongArkNavigationMenuItem,
    LoongArkNavigationMenuLink,
  } from "@shaloong/loongark-svelte";
</script>

<LoongArkNavigationMenu>
  <LoongArkNavigationMenuList>
    <LoongArkNavigationMenuItem>
      <LoongArkNavigationMenuLink href="#overview">
        概览
      </LoongArkNavigationMenuLink>
    </LoongArkNavigationMenuItem>
    <LoongArkNavigationMenuItem>
      <LoongArkNavigationMenuLink href="#reference">
        API
      </LoongArkNavigationMenuLink>
    </LoongArkNavigationMenuItem>
  </LoongArkNavigationMenuList>
</LoongArkNavigationMenu>
