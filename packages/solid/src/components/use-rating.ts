import { createUniqueId, createMemo } from "solid-js";
import { useMachine, normalizeProps } from "@zag-js/solid";
import { useEnvironmentContext } from "@ark-ui/solid/environment";
import { useLocaleContext } from "@ark-ui/solid/locale";
import { useFieldContext } from "@ark-ui/solid/field";
import type {
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from "@ark-ui/solid/rating-group";
import {
  ratingGroupMachine,
  connectRatingGroup,
  definedRatingGroupProps,
} from "@loongark/kit";
export const useRatingGroup = (
  props: UseRatingGroupProps = {},
): UseRatingGroupReturn => {
  const id = createUniqueId(),
    env = useEnvironmentContext(),
    locale = useLocaleContext(),
    field = useFieldContext();
  const options = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: env().getRootNode,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
      ...props.ids,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    ...definedRatingGroupProps(props),
  }));
  const service = useMachine(ratingGroupMachine, options);
  return createMemo(() => connectRatingGroup(service, normalizeProps));
};
