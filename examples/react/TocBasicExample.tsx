import React from "react";
import {
  LoongArkTocRoot,
  LoongArkTocNav,
  LoongArkTocTitle,
  LoongArkTocList,
  LoongArkTocItem,
  LoongArkTocLink,
} from "@loongark/react";
export function TocBasicExample() {
  return (
    <div>
      <LoongArkTocRoot
        items={[
          { value: "intro", depth: 2 },
          { value: "usage", depth: 2 },
        ]}
      >
        <LoongArkTocNav>
          <LoongArkTocTitle>本页目录</LoongArkTocTitle>
          <LoongArkTocList>
            <LoongArkTocItem item={{ value: "intro", depth: 2 }}>
              <LoongArkTocLink href="#intro">介绍</LoongArkTocLink>
            </LoongArkTocItem>
            <LoongArkTocItem item={{ value: "usage", depth: 2 }}>
              <LoongArkTocLink href="#usage">用法</LoongArkTocLink>
            </LoongArkTocItem>
          </LoongArkTocList>
        </LoongArkTocNav>
      </LoongArkTocRoot>
      <article>
        <h2 id="intro">介绍</h2>
        <p>组件介绍。</p>
        <h2 id="usage">用法</h2>
        <p>组件用法。</p>
      </article>
    </div>
  );
}
