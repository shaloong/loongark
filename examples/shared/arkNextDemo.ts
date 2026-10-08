export const documentSections = [
  { value: "overview", title: "Overview", depth: 2, text: "LoongArk shares semantic styles and behavior across React, Vue, Solid and Svelte. Start with an accessible component and compose the controls your users need." },
  { value: "keyboard", title: "Keyboard navigation", depth: 3, text: "Every interactive control needs a clear name and a visible keyboard focus. Use Tab to reach the outline links, then press Enter to move to the corresponding section." },
  { value: "delivery", title: "Delivery checklist", depth: 2, text: "Review desktop and mobile layouts in both color modes. Check form values, cleanup and server rendering before committing a verified change." },
];
export const documentItems = documentSections.map(({ value, depth }) => ({ value, depth }));
