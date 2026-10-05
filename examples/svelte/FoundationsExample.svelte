<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import { LoongArkIcon } from "@loongark/svelte";

  import * as L from "@loongark/svelte";
  let notes = "",
    chip = true,
    selection = "Overview",
    route = "Home",
    submitted = 0;
</script>

<L.LoongArkContainer
  ><L.LoongArkStack gap="lg">
    <L.LoongArkAppBar
      ><L.LoongArkToolbar
        ><strong>LoongArk</strong><L.LoongArkLink href="#docs"
          >Documentation</L.LoongArkLink
        ></L.LoongArkToolbar
      ></L.LoongArkAppBar
    >
    <L.LoongArkGrid columns={2} gap="md">
      <L.LoongArkPaper
        ><L.LoongArkStack gap="md"
          ><h2>Project notes</h2>
          <form on:submit|preventDefault={() => submitted++}>
            <L.LoongArkStack gap="sm">
              <L.LoongArkLabel for="foundation-notes">Notes</L.LoongArkLabel
              ><L.LoongArkTextarea
                id="foundation-notes"
                name="notes"
                bind:value={notes}
                placeholder="Write a project note…"
              />
              <output data-testid="notes-count"
                >{notes.length} characters</output
              >
              {#if chip}<L.LoongArkChip style="width:fit-content"
                  ><L.LoongArkChipLabel>Design</L.LoongArkChipLabel
                  ><L.LoongArkChipRemoveTrigger
                    aria-label="Remove Design"
                    on:click={() => (chip = false)}
                    ><LoongArkIcon
                      icon={controlIcons.close}
                      size="sm"
                    /></L.LoongArkChipRemoveTrigger
                  ></L.LoongArkChip
                >
              {:else}<L.LoongArkButton
                  variant="outline"
                  on:click={() => (chip = true)}
                  >Restore Design</L.LoongArkButton
                >{/if}
              <span data-testid="submitted" hidden>{submitted}</span
              ></L.LoongArkStack
            >
          </form></L.LoongArkStack
        ></L.LoongArkPaper
      >
      <L.LoongArkPaper
        ><L.LoongArkStack gap="md"
          ><h2>Workspace</h2>
          <L.LoongArkList
            >{#each ["Overview", "Members", "Settings"] as name}<L.LoongArkListItem
                ><L.LoongArkListItemButton
                  aria-pressed={selection === name}
                  on:click={() => (selection = name)}
                  ><L.LoongArkListItemIcon>○</L.LoongArkListItemIcon
                  ><L.LoongArkListItemText>{name}</L.LoongArkListItemText
                  ></L.LoongArkListItemButton
                ></L.LoongArkListItem
              >{/each}</L.LoongArkList
          >
          <L.LoongArkAvatarGroup role="group" aria-label="Members"
            >{#each ["LA", "JL", "MK"] as name}<L.LoongArkAvatarRoot
                ><L.LoongArkAvatarFallback>{name}</L.LoongArkAvatarFallback
                ></L.LoongArkAvatarRoot
              >{/each}<L.LoongArkAvatarGroupOverflow aria-label="3 more members"
              >+3</L.LoongArkAvatarGroupOverflow
            ></L.LoongArkAvatarGroup
          ></L.LoongArkStack
        ></L.LoongArkPaper
      >
    </L.LoongArkGrid>
    <L.LoongArkBox padding="sm"
      ><L.LoongArkTimeline
        >{#each ["Created", "Designed", "Published"] as name, i}<L.LoongArkTimelineItem
            ><L.LoongArkTimelineIndicator>{i + 1}</L.LoongArkTimelineIndicator
            ><L.LoongArkTimelineContent
              ><L.LoongArkTimelineTitle>{name}</L.LoongArkTimelineTitle
              ><L.LoongArkTimelineDescription
                >Project activity</L.LoongArkTimelineDescription
              ><L.LoongArkTimelineTime
                datetime={"2026-10-03T" +
                  String(i + 8).padStart(2, "0") +
                  ":00:00+08:00"}>{i + 8}:00</L.LoongArkTimelineTime
              ></L.LoongArkTimelineContent
            ></L.LoongArkTimelineItem
          >{/each}</L.LoongArkTimeline
      ></L.LoongArkBox
    >
    <L.LoongArkBottomNavigation
      >{#each ["Home", "Search", "Settings"] as name}<L.LoongArkBottomNavigationItem
          href={"#" + name}
          active={route === name}
          on:click={(e) => {
            e.preventDefault();
            route = name;
          }}
          ><L.LoongArkBottomNavigationIcon>○</L.LoongArkBottomNavigationIcon
          ><L.LoongArkBottomNavigationLabel
            >{name}</L.LoongArkBottomNavigationLabel
          ></L.LoongArkBottomNavigationItem
        >{/each}</L.LoongArkBottomNavigation
    >
  </L.LoongArkStack></L.LoongArkContainer
>
