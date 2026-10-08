<script lang="ts">
  import { Ark } from "@ark-ui/svelte/factory";
  import {
    useTocContext,
    type TocNavProps,
    type UseTocProps,
  } from "@ark-ui/svelte/toc";
  import { tocNavId } from "@loongark/kit";
  type Props = Omit<TocNavProps, keyof UseTocProps> & { id?: string };
  let {
    ref = $bindable(null),
    children,
    placement,
    id,
    ...props
  }: Props = $props();
  const toc = useTocContext();
  const rootProps = $derived(toc().getRootProps());
</script>

<Ark
  as="nav"
  bind:ref
  {...rootProps}
  {...props}
  id={id ?? tocNavId(rootProps.id)}
  data-placement={placement}>{@render children?.()}</Ark
>
