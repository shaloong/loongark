import { useId } from "react";
import { useMachine, normalizeProps } from "@zag-js/react";
import { useEnvironmentContext } from "@ark-ui/react/environment";
import { useLocaleContext } from "@ark-ui/react/locale";
import { useFieldContext } from "@ark-ui/react/field";
import type {
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from "@ark-ui/react/rating-group";
import {
  ratingGroupMachine,
  connectRatingGroup,
  definedRatingGroupProps,
} from "@loongark/kit";
export const useRatingGroup = (
  props: UseRatingGroupProps = {},
): UseRatingGroupReturn => {
  const id = useId(),
    env = useEnvironmentContext(),
    locale = useLocaleContext(),
    field = useFieldContext();
  return connectRatingGroup(
    useMachine(ratingGroupMachine, {
      id,
      dir: locale.dir,
      getRootNode: env.getRootNode,
      ids: {
        label: field?.ids.label,
        hiddenInput: field?.ids.control,
        ...props.ids,
      },
      disabled: field?.disabled,
      readOnly: field?.readOnly,
      required: field?.required,
      ...definedRatingGroupProps(props),
    }),
    normalizeProps,
  );
};
