import { useId, computed, toValue, type MaybeRef } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import {
  useEnvironmentContext,
  DEFAULT_ENVIRONMENT,
} from "@ark-ui/vue/environment";
import { useLocaleContext, DEFAULT_LOCALE } from "@ark-ui/vue/locale";
import { useFieldContext } from "@ark-ui/vue/field";
import type {
  useRatingGroup as nativeUseRatingGroup,
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from "@ark-ui/vue/rating-group";
import {
  ratingGroupMachine,
  connectRatingGroup,
  definedRatingGroupProps,
} from "@loongark/kit";
export const useRatingGroup = (
  props: MaybeRef<UseRatingGroupProps> = {},
  emits?: Parameters<typeof nativeUseRatingGroup>[1],
): UseRatingGroupReturn => {
  const id = useId(),
    env = useEnvironmentContext(DEFAULT_ENVIRONMENT),
    locale = useLocaleContext(DEFAULT_LOCALE),
    field = useFieldContext();
  const options = computed(() => {
    const p = toValue(props) ?? {};
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env.value.getRootNode,
      ids: {
        label: field?.value.ids.label,
        hiddenInput: field?.value.ids.control,
        ...p.ids,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      required: field?.value.required,
      value: p.modelValue,
      ...definedRatingGroupProps(p),
      onValueChange(
        details: Parameters<
          NonNullable<UseRatingGroupProps["onValueChange"]>
        >[0],
      ) {
        emits?.("valueChange", details);
        emits?.("update:modelValue", details.value);
        p.onValueChange?.(details);
      },
      onHoverChange(
        details: Parameters<
          NonNullable<UseRatingGroupProps["onHoverChange"]>
        >[0],
      ) {
        emits?.("hoverChange", details);
        p.onHoverChange?.(details);
      },
    };
  });
  const service = useMachine(ratingGroupMachine, options);
  return computed(() => connectRatingGroup(service, normalizeProps));
};
