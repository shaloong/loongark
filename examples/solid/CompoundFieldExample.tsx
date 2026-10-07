/** @jsxImportSource solid-js */
import { createSignal, createMemo, createUniqueId } from "solid-js";
import * as L from "@loongark/solid";
import {
  createCompoundFieldDemo,
  compoundFieldControls,
  compoundOwnFlags,
  compoundFieldLabel,
  compoundFieldCSS,
} from "../shared/compoundFieldDemo";
export function CompoundFieldExample() {
  const [revision, redraw] = createSignal(0);
  const demo = createCompoundFieldDemo(() => redraw((n) => n + 1));
  const s = createMemo(() => {
    revision();
    return demo.snapshot;
  });
  const note = createUniqueId();
  return (
    <L.LoongArkLocaleProvider locale={s().rtl ? "ar-EG" : "en-US"}>
      <style>{compoundFieldCSS}</style>
      <form
        data-compound-field-demo
        dir={s().rtl ? "rtl" : "ltr"}
        aria-label="Compound field preferences"
        onSubmit={(event) => {
          event.preventDefault();
          demo.submit(event.currentTarget);
        }}
      >
        <header>
          <h2>Field state inheritance</h2>
          <p id={note}>
            Disabled inputs are excluded from submission; read-only inputs keep
            their values.
          </p>
        </header>
        <div data-demo-controls>
          {compoundFieldControls.map(([key, label]) => (
            <L.LoongArkButton
              type="button"
              size="sm"
              variant="outline"
              aria-pressed={s()[key]}
              onClick={() => demo.toggle(key)}
            >
              {label}
            </L.LoongArkButton>
          ))}
        </div>
        <div data-demo-grid>
          {[false, true].map((own) => (
            <section>
              <h3>
                {own ? "Explicit false overrides" : "Inherited field state"}
              </h3>
              <L.LoongArkFieldRoot
                disabled={s().disabled}
                readOnly={s().readOnly}
                invalid={s().invalid}
                required={s().required}
              >
                <L.LoongArkFieldLabel>
                  {compoundFieldLabel("quantity", own, s().long)}
                </L.LoongArkFieldLabel>
                <L.LoongArkNumberInputRoot
                  {...(own ? compoundOwnFlags : {})}
                  name={own ? "own-quantity" : "quantity"}
                  value={own ? s().ownQuantity : s().quantity}
                  defaultValue="3"
                  min={0}
                  max={99}
                  onValueChange={(details) => demo.quantity(own, details.value)}
                >
                  <L.LoongArkNumberInputControl>
                    <L.LoongArkNumberInputInput aria-describedby={note} />
                    <L.LoongArkNumberInputIncrementTrigger />
                    <L.LoongArkNumberInputDecrementTrigger />
                  </L.LoongArkNumberInputControl>
                </L.LoongArkNumberInputRoot>
                <L.LoongArkFieldHelperText>
                  {own
                    ? "The input overrides all four Field flags."
                    : "A quantity between 0 and 99."}
                </L.LoongArkFieldHelperText>
                {!own && (
                  <L.LoongArkFieldErrorText>
                    Review the quantity before submitting.
                  </L.LoongArkFieldErrorText>
                )}
              </L.LoongArkFieldRoot>
              <L.LoongArkFieldRoot
                disabled={s().disabled}
                readOnly={s().readOnly}
                invalid={s().invalid}
                required={s().required}
              >
                <L.LoongArkFieldLabel>
                  {compoundFieldLabel("password", own, s().long)}
                </L.LoongArkFieldLabel>
                <L.LoongArkPasswordInputRoot
                  {...(own ? compoundOwnFlags : {})}
                  name={own ? "own-password" : "password"}
                >
                  <L.LoongArkPasswordInputControl>
                    <L.LoongArkPasswordInputInput
                      placeholder="Enter a password"
                      aria-describedby={note}
                    />
                    <L.LoongArkPasswordInputVisibilityTrigger
                      aria-label={
                        own ? "Show independent password" : "Show password"
                      }
                    >
                      Show
                    </L.LoongArkPasswordInputVisibilityTrigger>
                  </L.LoongArkPasswordInputControl>
                </L.LoongArkPasswordInputRoot>
                <L.LoongArkFieldHelperText>
                  {own
                    ? "Explicit overrides keep this input usable."
                    : "This demo accepts a sample password."}
                </L.LoongArkFieldHelperText>
                {!own && (
                  <L.LoongArkFieldErrorText>
                    Review the password before submitting.
                  </L.LoongArkFieldErrorText>
                )}
              </L.LoongArkFieldRoot>
            </section>
          ))}
        </div>
        <div data-demo-controls>
          <L.LoongArkButton type="submit" size="sm">
            Submit
          </L.LoongArkButton>
          <L.LoongArkButton type="reset" size="sm" variant="outline">
            Reset
          </L.LoongArkButton>
        </div>
        <output aria-label="Submitted field names">
          {s().submitted || "No submission yet"}
        </output>
      </form>
    </L.LoongArkLocaleProvider>
  );
}
