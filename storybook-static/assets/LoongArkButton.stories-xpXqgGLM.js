import{f as r,R as a}from"./iframe-BlkAa_1r.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Components/Button",component:r,parameters:{docs:{description:{component:"LoongArkButton 是 Ark UI Button 的皮肤层，variant/size/block/loading 均映射到 primitives token。"}}},argTypes:{variant:{options:["solid","outline","ghost"],control:{type:"inline-radio"}},size:{options:["sm","md","lg"],control:{type:"inline-radio"}},block:{control:"boolean"},loading:{control:"boolean"},disabled:{control:"boolean"},children:{control:"text"}},args:{children:"发送邀请",variant:"solid",size:"md",block:!1,loading:!1,disabled:!1}},o={render:n=>a.createElement(r,{...n})},e={args:{loading:!0,disabled:!0,children:"处理中…"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <LoongArkButton {...args} />
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    disabled: true,
    children: "处理中…"
  }
}`,...e.parameters?.docs?.source}}};const l=["Playground","Loading"];export{e as Loading,o as Playground,l as __namedExportsOrder,i as default};
