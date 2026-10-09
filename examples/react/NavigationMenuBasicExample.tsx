import React from "react";
import {
  LoongArkNavigationMenu,
  LoongArkNavigationMenuList,
  LoongArkNavigationMenuItem,
  LoongArkNavigationMenuLink,
} from "@loongark/react";
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
