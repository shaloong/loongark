/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
const items = [
    { value: "design", label: "Design" },
    { value: "docs", label: "Documentation" },
    { value: "dev", label: "Development" },
    { value: "support", label: "Support", disabled: true },
  ],
  longNote =
    "Project note 1\nProject note 2\nProject note 3\nProject note 4\nProject note 5\nProject note 6\nProject note 7\nProject note 8\nProject note 9\nProject note 10\nProject note 11\nProject note 12";
export function SelectionInputsExample() {
  const [auto, setAuto] = createSignal(true);
  const [assigned, setAssigned] = createSignal(["dev"]),
    [time, setTime] = createSignal("08:30"),
    [notes, setNotes] = createSignal(""),
    [submitted, setSubmitted] = createSignal(0);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "800px" }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted((v) => v + 1);
        }}
      >
        <L.LoongArkStack gap="lg">
          <section>
            <h2>Workspace access</h2>
            <L.LoongArkTransferList
              items={items}
              value={assigned()}
              onValueChange={(details) => setAssigned(details.value)}
              name="members"
            />
            <output data-testid="transfer-value">
              Assigned: {assigned().join(",")}
            </output>
          </section>
          <L.LoongArkGrid columns={2}>
            <L.LoongArkPaper>
              <L.LoongArkTimePicker
                label="Meeting time"
                name="meeting"
                value={time()}
                onValueChange={(details) => setTime(details.value)}
                minuteStep={15}
                min="08:00"
                max="18:00"
                locale="en-US"
                hourCycle="h12"
              />
              <output data-testid="time-value">{time()}</output>
            </L.LoongArkPaper>
            <L.LoongArkPaper>
              <L.LoongArkStack gap="sm">
                <L.LoongArkLabel htmlFor="autosize-notes">
                  Notes
                </L.LoongArkLabel>
                <label data-lk-autosize-toggle="">
                  <input
                    type="checkbox"
                    checked={auto()}
                    onChange={(e) => setAuto(e.currentTarget.checked)}
                  />{" "}
                  Automatic height
                </label>
                <L.LoongArkTextarea
                  id="autosize-notes"
                  name="notes"
                  value={notes()}
                  onInput={(event) => setNotes(event.currentTarget.value)}
                  autoSize={auto()}
                  minRows={2}
                  maxRows={5}
                  placeholder="Add a note…"
                />
                <L.LoongArkStack orientation="horizontal" gap="sm">
                  <L.LoongArkButton
                    variant="outline"
                    onClick={() => setNotes(longNote)}
                  >
                    Insert long note
                  </L.LoongArkButton>
                  <L.LoongArkButton
                    variant="ghost"
                    onClick={() => setNotes("")}
                  >
                    Clear notes
                  </L.LoongArkButton>
                </L.LoongArkStack>
              </L.LoongArkStack>
            </L.LoongArkPaper>
          </L.LoongArkGrid>
        </L.LoongArkStack>
        <span hidden data-testid="selection-submitted">
          {submitted()}
        </span>
      </form>
    </L.LoongArkStack>
  );
}
