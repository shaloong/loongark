import{R as e,a as g,b as y,c as f,d as v,e as I,f as k,g as E}from"./iframe-BlkAa_1r.js";import"./preload-helper-PPVm8Dsz.js";const h={width:"100%",display:"flex",flexDirection:"column",gap:"var(--lk-space-component-md, 16px)"},u=({size:r,state:l,disabled:o,readOnly:c,helperVariant:s})=>{const[i,p]=e.useState(""),d=s==="error"?"请填写有效邮箱":s==="success"?"邮箱可用":"需要公司域邮箱";return e.createElement("div",{style:h},e.createElement(g,null,"邮箱"),e.createElement(y,{size:r,state:l,disabled:o,readOnly:c},e.createElement(f,null,"@"),e.createElement(v,{size:r,state:l,disabled:o,readOnly:c,value:i,placeholder:"teammate@loongark.dev",onChange:m=>p(m.currentTarget.value)}),e.createElement(I,{action:"button"},e.createElement(k,{variant:"ghost",size:"sm",type:"button",onClick:()=>p(""),disabled:o},"清除"))),e.createElement(E,{variant:s},d))},A={title:"Components/Input",component:u,args:{size:"md",state:"default",disabled:!1,readOnly:!1,helperVariant:"default"},argTypes:{size:{options:["sm","md","lg"],control:{type:"inline-radio"}},state:{options:["default","invalid","success"],control:{type:"inline-radio"}},helperVariant:{options:["default","error","success"],control:{type:"inline-radio"}}}},t={render:r=>e.createElement(u,{...r})},a={args:{state:"invalid",helperVariant:"error"}},n={args:{readOnly:!0,helperVariant:"default"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <InputPlayground {...args} />
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    state: "invalid",
    helperVariant: "error"
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    helperVariant: "default"
  }
}`,...n.parameters?.docs?.source}}};const S=["Playground","Invalid","ReadOnly"];export{a as Invalid,t as Playground,n as ReadOnly,S as __namedExportsOrder,A as default};
