import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/NavigationMenu",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkNavigationMenu>
        <L.LoongArkNavigationMenuList>
          <L.LoongArkNavigationMenuItem>
            <L.LoongArkNavigationMenuLink href="#getting-started">
              Getting started
            </L.LoongArkNavigationMenuLink>
          </L.LoongArkNavigationMenuItem>
          <L.LoongArkNavigationMenuItem>
            <L.LoongArkNavigationMenuRoot>
              <L.LoongArkNavigationMenuTrigger>
                Components
              </L.LoongArkNavigationMenuTrigger>
              <L.LoongArkNavigationMenuPositioner>
                <L.LoongArkNavigationMenuContent>
                  Buttons, cards and forms
                </L.LoongArkNavigationMenuContent>
              </L.LoongArkNavigationMenuPositioner>
            </L.LoongArkNavigationMenuRoot>
          </L.LoongArkNavigationMenuItem>
        </L.LoongArkNavigationMenuList>
      </L.LoongArkNavigationMenu>
    </div>
  ),
};
