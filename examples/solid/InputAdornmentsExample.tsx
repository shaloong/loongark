/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import * as L from "@loongark/solid";
import { controlIcons } from "@loongark/kit";
import {
  createInputAdornmentDemo,
  adornmentControls,
  adornmentSizes,
  adornmentLabel,
  adornmentCSS,
} from "../shared/inputAdornmentDemo";
export function InputAdornmentsExample() {
  const [revision, redraw] = createSignal(0);
  const demo = createInputAdornmentDemo(() => redraw((n) => n + 1));
  const s = createMemo(() => {
    revision();
    return demo.snapshot;
  });
  return (
    <section data-input-adornments dir={s().rtl ? "rtl" : "ltr"}>
      <style>{adornmentCSS}</style>
      <div data-demo-controls>
        {adornmentControls.map(([key, label]) => (
          <L.LoongArkButton
            size="sm"
            variant="outline"
            aria-pressed={s()[key]}
            onClick={() => demo.toggle(key)}
          >
            {label}
          </L.LoongArkButton>
        ))}
      </div>
      <div data-demo-fields>
        {adornmentSizes.map((size) => (
          <L.LoongArkInputRoot
            size={size}
            disabled={s().disabled}
            readOnly={s().readOnly}
            state={s().invalid ? "invalid" : "default"}
          >
            <L.LoongArkInputLabel>
              {adornmentLabel(size, s().long)}
            </L.LoongArkInputLabel>
            <L.LoongArkInputGroup>
              <L.LoongArkInputPrefix>
                <L.LoongArkIcon icon={controlIcons.search} size="sm" />
              </L.LoongArkInputPrefix>
              <L.LoongArkInputControl
                name={`search-${size}`}
                value={s().values[size]}
                onInput={(e) => demo.update(size, e.currentTarget.value)}
              />
              <L.LoongArkInputSuffix
                action={s().inspect ? "button" : "clear"}
                disabled={s().override ? false : undefined}
                aria-label={`${s().inspect ? "View" : "Clear"} search ${size}`}
                onClick={() => demo.activate(size)}
              >
                {s().inspect ? (
                  "View"
                ) : (
                  <L.LoongArkIcon icon={controlIcons.close} size="sm" />
                )}
              </L.LoongArkInputSuffix>
            </L.LoongArkInputGroup>
            <L.LoongArkInputHelperText>
              Search by project name.
            </L.LoongArkInputHelperText>
            <L.LoongArkInputErrorText>
              Review the search term.
            </L.LoongArkInputErrorText>
          </L.LoongArkInputRoot>
        ))}
      </div>
      <output aria-label="Viewed search value">{s().inspected}</output>
    </section>
  );
}
