/** State motion shared by all framework adapters. Geometry belongs to the component. */
export const stateMotionCSS = `
@keyframes lk-surface-in { from { opacity:0; transform:translateY(var(--lk-space-component-xs)) scale(.98); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes lk-surface-out { from { opacity:1; transform:translateY(0) scale(1); visibility:visible; } to { opacity:0; transform:translateY(var(--lk-space-component-xs)) scale(.98); visibility:hidden; } }
@keyframes lk-expand { from { height:var(--collapsed-height,0); opacity:0; } to { height:var(--height); opacity:1; } }
@keyframes lk-collapse { from { height:var(--height); opacity:1; } to { height:var(--collapsed-height,0); opacity:0; } }
:is([data-scope=select],[data-scope=combobox],[data-scope=menu],[data-scope=popover],[data-scope=hover-card],[data-scope=tooltip],[data-scope=color-picker],[data-scope=date-picker],[data-scope=tour])[data-part=content] {
  transform-origin:var(--transform-origin,center); will-change:auto;
}
:is([data-scope=select],[data-scope=combobox],[data-scope=menu],[data-scope=popover],[data-scope=hover-card],[data-scope=tooltip],[data-scope=color-picker],[data-scope=date-picker],[data-scope=tour])[data-part=content][data-state=open] {
  animation:lk-surface-in var(--lk-motion-duration-base) var(--lk-motion-easing-entrance);
  visibility:visible;
}
:is([data-scope=select],[data-scope=combobox],[data-scope=menu],[data-scope=popover],[data-scope=hover-card],[data-scope=tooltip],[data-scope=color-picker],[data-scope=date-picker],[data-scope=tour])[data-part=content][data-state=closed] {
  animation:lk-surface-out var(--lk-motion-duration-exit) var(--lk-motion-easing-exit) forwards;
  visibility:visible;
  pointer-events:none;
}
:is([data-scope=accordion][data-part=item-content],[data-scope=collapsible][data-part=content]) { overflow:hidden; }
:is([data-scope=accordion][data-part=item-content],[data-scope=collapsible][data-part=content])[data-state=open] { animation:lk-expand var(--lk-motion-duration-base) var(--lk-motion-easing-standard); }
:is([data-scope=accordion][data-part=item-content],[data-scope=collapsible][data-part=content])[data-state=closed] { animation:lk-collapse var(--lk-motion-duration-exit) var(--lk-motion-easing-exit); }
:is([data-scope=tabs][data-part=trigger],[data-scope=segment-group][data-part=item],[data-scope=toggle][data-part=root],[data-scope=toggle-group][data-part=item],[data-scope=menu][data-part=item],[data-scope=select][data-part=item],[data-scope=combobox][data-part=item],[data-scope=navigation-menu][data-part=link],[data-scope=sidebar][data-part=menu-button]) {
  transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), box-shadow var(--lk-motion-duration-fast) var(--lk-motion-easing-standard);
}
`;
