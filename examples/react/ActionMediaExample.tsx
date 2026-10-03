import * as L from "@loongark/react";
import { useState } from "react";
import { quickActions, mediaDemoItems } from "../shared/mediaDemo";
export function ActionMediaExample() {
  const [selected, setSelected] = useState("None"),
    [submitted, setSubmitted] = useState(0),
    [opened, setOpened] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted((n) => n + 1);
      }}
    >
      <L.LoongArkStack style={{ width: "100%", maxWidth: "800px" }}>
        <L.LoongArkPaper>
          <L.LoongArkStack>
            <h2>Workspace actions</h2>
            <L.LoongArkStack orientation="horizontal" gap="sm">
              <L.LoongArkFloatingActionButton
                aria-label="Create workspace"
                onClick={() => setSelected("workspace")}
              >
                <span aria-hidden="true">＋</span>
              </L.LoongArkFloatingActionButton>
              <L.LoongArkFloatingActionButton
                extended
                variant="secondary"
                onClick={() => setSelected("import")}
              >
                Import files
              </L.LoongArkFloatingActionButton>
              <L.LoongArkFloatingActionButton
                disabled
                aria-label="Unavailable action"
              >
                <span aria-hidden="true">−</span>
              </L.LoongArkFloatingActionButton>
            </L.LoongArkStack>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                minHeight: "200px",
              }}
            >
              <L.LoongArkSpeedDial
                label="Quick actions"
                actions={quickActions}
                open={opened}
                onOpenChange={(d) => setOpened(d.open)}
                onSelect={(d) => setSelected(d.value)}
              />
            </div>
            <output data-testid="action-value">Action: {selected}</output>
          </L.LoongArkStack>
        </L.LoongArkPaper>
        <section>
          <h2>Image list</h2>
          <L.LoongArkImageList
            columns={3}
            gap="sm"
            rowHeight={180}
            aria-label="Image collection"
          >
            {mediaDemoItems.slice(0, 4).map((item, i) => (
              <L.LoongArkImageListItem
                key={item.label}
                columnSpan={i === 0 ? 2 : 1}
                rowSpan={i === 0 ? 2 : 1}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
                <L.LoongArkImageListCaption>
                  {item.label}
                </L.LoongArkImageListCaption>
              </L.LoongArkImageListItem>
            ))}
          </L.LoongArkImageList>
        </section>
        <section>
          <h2>Masonry</h2>
          <L.LoongArkMasonry
            columns={3}
            gap="sm"
            aria-label="Masonry collection"
          >
            {mediaDemoItems.map((item) => (
              <L.LoongArkMasonryItem key={item.label}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
              </L.LoongArkMasonryItem>
            ))}
          </L.LoongArkMasonry>
        </section>
        <span hidden data-testid="action-submitted">
          {submitted}
        </span>
      </L.LoongArkStack>
    </form>
  );
}
