import React from "react";
import * as L from "@loongark/react";
export function FoundationsExample() {
  const [notes, setNotes] = React.useState("");
  const [chip, setChip] = React.useState(true);
  const [selection, setSelection] = React.useState("Overview");
  const [route, setRoute] = React.useState("Home");
  const [submitted, setSubmitted] = React.useState(0);
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
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write a project note…"
                  />
                  <output data-testid="notes-count">
                    {notes.length} characters
                  </output>
                  {chip ? (
                    <L.LoongArkChip style={{ width: "fit-content" }}>
                      <L.LoongArkChipLabel>Design</L.LoongArkChipLabel>
                      <L.LoongArkChipRemoveTrigger
                        aria-label="Remove Design"
                        onClick={() => setChip(false)}
                      >
                        ×
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
                    {submitted}
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
                  <L.LoongArkListItem key={name}>
                    <L.LoongArkListItemButton
                      aria-pressed={selection === name}
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
                  <L.LoongArkAvatarRoot key={name}>
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
              <L.LoongArkTimelineItem key={name}>
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
              key={name}
              href={"#" + name}
              active={route === name}
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
