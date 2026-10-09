/** @jsxImportSource solid-js */

import { LoongArkMarquee, LoongArkBadge } from "@loongark/solid";
export function MarqueeBasicExample() {
  return (
    <LoongArkMarquee.Root>
      <LoongArkMarquee.Viewport>
        <LoongArkMarquee.Content>
          <LoongArkMarquee.Item>
            <LoongArkBadge variant="outline">React</LoongArkBadge>
          </LoongArkMarquee.Item>
          <LoongArkMarquee.Item>
            <LoongArkBadge variant="outline">Vue</LoongArkBadge>
          </LoongArkMarquee.Item>
          <LoongArkMarquee.Item>
            <LoongArkBadge variant="outline">Solid / Svelte</LoongArkBadge>
          </LoongArkMarquee.Item>
        </LoongArkMarquee.Content>
      </LoongArkMarquee.Viewport>
    </LoongArkMarquee.Root>
  );
}
