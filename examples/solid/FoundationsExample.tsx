/** @jsxImportSource solid-js */
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/solid";

import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
export function FoundationsExample() {
  const [notes, setNotes] = createSignal("");
  const [chip, setChip] = createSignal(true);
  const [selection, setSelection] = createSignal("Overview");
  const [route, setRoute] = createSignal("Home");
  const [submitted, setSubmitted] = createSignal(0);
  return (
    <L.LoongArkContainer>
      <L.LoongArkStack gap="lg">
        <L.LoongArkAppBar>
          <L.LoongArkToolbar>
            <strong>LoongArk</strong>
            <L.LoongArkLink href="#docs">Documentation</L.LoongArkLink>
          </L.LoongArkToolbar>
        </L.LoongArkAppBar>
        <L.LoongArkGrid columns={2} gap="md">
          <L.LoongArkPaper>
            <L.LoongArkStack gap="md">
              <h2>Project notes</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted((v) => v + 1);
                }}
              >
                <L.LoongArkStack gap="sm">
                  <L.LoongArkLabel htmlFor="foundation-notes">
                    Notes
                  </L.LoongArkLabel>
                  <L.LoongArkTextarea
                    id="foundation-notes"
                    name="notes"
                    value={notes()}
                    onInput={(e) => setNotes(e.currentTarget.value)}
                    placeholder="Write a project note…"
                  />
                  <output data-testid="notes-count">
                    {notes().length} characters
                  </output>
                  {chip() ? (
                    <L.LoongArkChip style={{ width: "fit-content" }}>
                      <L.LoongArkChipLabel>Design</L.LoongArkChipLabel>
                      <L.LoongArkChipRemoveTrigger
                        aria-label="Remove Design"
                        onClick={() => setChip(false)}
                      >
                        <LoongArkIcon icon={controlIcons.close} size="sm" />
                      </L.LoongArkChipRemoveTrigger>
                    </L.LoongArkChip>
                  ) : (
                    <L.LoongArkButton
                      variant="outline"
                      onClick={() => setChip(true)}
                    >
                      Restore Design
                    </L.LoongArkButton>
                  )}
                  <span data-testid="submitted" hidden>
                    {submitted()}
                  </span>
                </L.LoongArkStack>
              </form>
            </L.LoongArkStack>
          </L.LoongArkPaper>
          <L.LoongArkPaper>
            <L.LoongArkStack gap="md">
              <h2>Workspace</h2>
              <L.LoongArkList>
                {["Overview", "Members", "Settings"].map((name) => (
                  <L.LoongArkListItem>
                    <L.LoongArkListItemButton
                      aria-pressed={selection() === name}
                      onClick={() => setSelection(name)}
                    >
                      <L.LoongArkListItemIcon>○</L.LoongArkListItemIcon>
                      <L.LoongArkListItemText>{name}</L.LoongArkListItemText>
                    </L.LoongArkListItemButton>
                  </L.LoongArkListItem>
                ))}
              </L.LoongArkList>
              <L.LoongArkAvatarGroup role="group" aria-label="Members">
                {["LA", "JL", "MK"].map((name) => (
                  <L.LoongArkAvatarRoot>
                    <L.LoongArkAvatarFallback>{name}</L.LoongArkAvatarFallback>
                  </L.LoongArkAvatarRoot>
                ))}
                <L.LoongArkAvatarGroupOverflow aria-label="3 more members">
                  +3
                </L.LoongArkAvatarGroupOverflow>
              </L.LoongArkAvatarGroup>
            </L.LoongArkStack>
          </L.LoongArkPaper>
        </L.LoongArkGrid>
        <L.LoongArkBox padding="sm">
          <L.LoongArkTimeline>
            {["Created", "Designed", "Published"].map((name, i) => (
              <L.LoongArkTimelineItem>
                <L.LoongArkTimelineIndicator>
                  {i + 1}
                </L.LoongArkTimelineIndicator>
                <L.LoongArkTimelineContent>
                  <L.LoongArkTimelineTitle>{name}</L.LoongArkTimelineTitle>
                  <L.LoongArkTimelineDescription>
                    Project activity
                  </L.LoongArkTimelineDescription>
                  <L.LoongArkTimelineTime
                    dateTime={
                      "2026-10-03T" +
                      String(i + 8).padStart(2, "0") +
                      ":00:00+08:00"
                    }
                  >
                    {i + 8}:00
                  </L.LoongArkTimelineTime>
                </L.LoongArkTimelineContent>
              </L.LoongArkTimelineItem>
            ))}
          </L.LoongArkTimeline>
        </L.LoongArkBox>
        <L.LoongArkBottomNavigation>
          {["Home", "Search", "Settings"].map((name) => (
            <L.LoongArkBottomNavigationItem
              href={"#" + name}
              active={route() === name}
              onClick={(e) => {
                e.preventDefault();
                setRoute(name);
              }}
            >
              <L.LoongArkBottomNavigationIcon>○</L.LoongArkBottomNavigationIcon>
              <L.LoongArkBottomNavigationLabel>
                {name}
              </L.LoongArkBottomNavigationLabel>
            </L.LoongArkBottomNavigationItem>
          ))}
        </L.LoongArkBottomNavigation>
      </L.LoongArkStack>
    </L.LoongArkContainer>
  );
}
