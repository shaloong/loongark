import { useMachine, normalizeProps } from "@zag-js/svelte";
import { useEnvironmentContext } from "@ark-ui/svelte/environment";
import { useLocaleContext } from "@ark-ui/svelte/locale";
import { useFieldContext } from "@ark-ui/svelte/field";
import type {
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from "@ark-ui/svelte/rating-group";
import {
  ratingGroupMachine,
  connectRatingGroup,
  definedRatingGroupProps,
} from "@loongark/kit";
export const useRatingGroup = (
  props: UseRatingGroupProps | (() => UseRatingGroupProps),
): UseRatingGroupReturn => {
  const env = useEnvironmentContext(),
    locale = useLocaleContext(),
    field = useFieldContext();
  const resolve = () => (typeof props === "function" ? props() : props);
  const options = $derived.by(() => {
    const p = resolve();
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ids: {
        label: field?.()?.ids.label,
        hiddenInput: field?.()?.ids.control,
        ...p.ids,
      },
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      required: field?.()?.required,
      ...definedRatingGroupProps(p),
    };
  });
  const service = useMachine(ratingGroupMachine, () => options);
  const api = $derived(connectRatingGroup(service, normalizeProps));
  return () => api;
};
