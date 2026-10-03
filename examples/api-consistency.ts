import * as ReactApi from "@loongark/react";
import * as SolidApi from "@loongark/solid";
import * as VueApi from "@loongark/vue";
import * as SvelteApi from "@loongark/svelte";

type FrameworkSpecificKeys = "LoongArkProvider";
type ComponentKeys<T> = Exclude<
  Extract<keyof T, `LoongArk${string}`>,
  FrameworkSpecificKeys
>;

type KeyDiff<Expected, Actual> = {
  missing: Exclude<ComponentKeys<Expected>, ComponentKeys<Actual>>;
  extra: Exclude<ComponentKeys<Actual>, ComponentKeys<Expected>>;
};

type IsNever<T> = [T] extends [never] ? true : false;

type AssertNoDiff<T extends { missing: unknown; extra: unknown }> =
  IsNever<T["missing"]> extends true
    ? IsNever<T["extra"]> extends true
      ? true
      : T
    : T;

const reactVueConsistency: AssertNoDiff<
  KeyDiff<typeof ReactApi, typeof VueApi>
> = true;
const reactSolidConsistency: AssertNoDiff<
  KeyDiff<typeof ReactApi, typeof SolidApi>
> = true;
const reactSvelteConsistency: AssertNoDiff<
  KeyDiff<typeof ReactApi, typeof SvelteApi>
> = true;

void [reactVueConsistency, reactSolidConsistency, reactSvelteConsistency];
