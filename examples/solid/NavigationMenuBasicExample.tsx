/** @jsxImportSource solid-js */

import {
  LoongArkNavigationMenu,
  LoongArkNavigationMenuList,
  LoongArkNavigationMenuItem,
  LoongArkNavigationMenuLink,
} from "@loongark/solid";
export function NavigationMenuBasicExample() {
  return (
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
  );
}
