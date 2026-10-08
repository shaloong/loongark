import assert from "node:assert/strict";
import {
  controlIcons,
  iconAttributes,
  iconStyles,
  reactSvgAttributes,
} from "../packages/kit/dist/index.js";
const icon = controlIcons.search;
assert.equal(iconAttributes({ icon })["aria-hidden"], "true");
assert.equal(
  iconAttributes({ icon, label: "  Find item  " })["aria-label"],
  "Find item",
);
assert.equal(iconAttributes({ icon, label: "  " })["aria-hidden"], "true");
assert.equal(
  iconAttributes({ icon }, { "aria-label": "Search" })["aria-hidden"],
  undefined,
);
assert.equal(
  iconAttributes({ icon }, { "aria-labelledby": "caption" }).role,
  "img",
);
for (const size of [0, -1, NaN, Infinity])
  assert.throws(() => iconStyles(size), /positive finite/);
for (const strokeWidth of [-1, NaN, Infinity])
  assert.throws(
    () => iconAttributes({ icon, strokeWidth }),
    /non-negative finite/,
  );
assert.equal(iconStyles(32)["--lk-icon-size"], "32px");
assert.deepEqual(
  reactSvgAttributes({
    "stroke-width": 2,
    "stroke-linecap": "round",
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
  }),
  {
    strokeWidth: 2,
    strokeLinecap: "round",
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
  },
);
console.log(
  "Icon models: accessible names, finite geometry and framework SVG attributes passed.",
);
