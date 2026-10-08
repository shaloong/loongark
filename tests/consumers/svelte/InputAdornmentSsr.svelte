<script lang="ts">
  import * as L from "@loongark/svelte";
  const fail = () => {
    throw Error("SSR must not emit changes");
  };
  const states = ["default", "readonly", "disabled"];
  const actions = ["clear", "button", "text"] as const;
  const overrides = ["inherit", "false", "true"];
</script>

{#each states as state}{#each actions as action}{#each overrides as own}
      <L.LoongArkInputRoot
        disabled={state === "disabled"}
        readOnly={state === "readonly"}
      >
        <L.LoongArkInputLabel>Search</L.LoongArkInputLabel>
        <L.LoongArkInputGroup>
          <L.LoongArkInputControl name={`${state}-${action}-${own}`} />
          <L.LoongArkInputSuffix
            {action}
            disabled={own === "inherit" ? undefined : own === "true"}
            onclick={fail}
            aria-label={`${state}-${action}-${own}`}
            >Suffix</L.LoongArkInputSuffix
          >
        </L.LoongArkInputGroup>
      </L.LoongArkInputRoot>
    {/each}{/each}{/each}
