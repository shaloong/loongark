import assert from 'node:assert/strict';
import {createLoongArkTheme} from '../packages/theme/dist/index.js';
import {LoongArkButton} from '../packages/react/dist/components/button.js';
import {buttonPrimitive} from '../packages/primitives/dist/button.js';
import {inputPrimitive} from '../packages/primitives/dist/input.js';
import {createPrimitive,registerPrimitive} from '../packages/primitives/dist/core.js';
import {createPrimitiveStyleBootstrap} from '../packages/primitives/dist/styles.js';
import {withAutomaticStyles,registerAutomaticStyles,automaticStyleRegistry} from '../packages/primitives/dist/automatic.js';
import {bootstrapKitAutomatic} from '../packages/kit/dist/automatic-bootstrap.js';
import {registerKitComponent} from '../packages/kit/dist/component-registry.js';

const descriptors=Object.getOwnPropertyDescriptors(LoongArkButton);
assert.equal(withAutomaticStyles(LoongArkButton,[buttonPrimitive]),LoongArkButton,'样式声明保留真实组件引用');
assert.deepEqual(Object.getOwnPropertyDescriptors(LoongArkButton),descriptors,'不修改组件属性');
for(const mode of ['light','dark','high-contrast']){
 const options={mode,targetId:'automatic-contract'};
 const auto=createLoongArkTheme(options);bootstrapKitAutomatic(auto);
 const explicit=createLoongArkTheme(options);createPrimitiveStyleBootstrap([buttonPrimitive])(explicit);
 assert.equal(auto.toStyleSheet(),explicit.toStyleSheet(),`${mode}：自动 Button 与显式样式规则和顺序一致`);
 assert.ok(!auto.toStyleSheet().includes('[data-scope=data-table]'));
 assert.ok(!auto.toStyleSheet().includes('[data-scope=editor]'));
 assert.ok(Buffer.byteLength(auto.toStyleSheet())<45000,'默认基础样式不保留完整组件 CSS');
}
let notifications=0;const unsubscribe=automaticStyleRegistry.subscribe(()=>notifications++);
registerAutomaticStyles([buttonPrimitive,buttonPrimitive]);assert.equal(notifications,0,'重复入口不重复通知');
registerAutomaticStyles([inputPrimitive,inputPrimitive]);assert.equal(notifications,1,'同一入口的新增样式只通知一次');
unsubscribe();
const {styles:fieldStyles}=await import('../packages/primitives/dist/automatic-styles/field.js');
registerAutomaticStyles(fieldStyles);assert.equal(notifications,1,'解绑后不保留监听');
const options={targetId:'ordered-style'};
const selected=createLoongArkTheme(options);bootstrapKitAutomatic(selected);
const expected=createLoongArkTheme(options);
expected.setStyleOrder((await import('../packages/primitives/dist/automatic-style-order.js')).automaticStyleOrder);
createPrimitiveStyleBootstrap([buttonPrimitive,inputPrimitive,...fieldStyles])(expected);
assert.equal(selected.toStyleSheet(),expected.toStyleSheet(),'迟到入口保持统一级联顺序');

registerPrimitive(createPrimitive(buttonPrimitive.contract,theme=>theme.mountStyles('button-custom','.app-button-override { color:var(--lk-color-semantic-primary); }')));
registerPrimitive(createPrimitive({name:'field',tokens:[],defaults:{}},theme=>theme.mountStyles('field-custom','.app-field-override { color:var(--lk-color-semantic-primary); }')));
registerPrimitive(createPrimitive({name:'app-extension',tokens:[],defaults:{}},theme=>theme.mountStyles('app-extension','.app-extension { display:grid; }')));
registerKitComponent({name:'app-kit',mount:theme=>theme.mountStyles('app-kit','.app-kit { display:flex; }','kit')});
const custom=createLoongArkTheme({targetId:'custom'});bootstrapKitAutomatic(custom);
for(const marker of ['app-button-override','app-field-override','app-extension','app-kit'])assert.ok(custom.toStyleSheet().includes(marker),`保留已有扩展：${marker}`);
assert.ok(!custom.toStyleSheet().includes('--lk-button-height:'),'注册覆盖不会重新加载默认 Button');
// 只消费组合组件的公开样式入口，不能依赖其他示例偶然注册底层规则。
for(const [scope,selectors] of [
 ['menubar',['[data-scope=menubar]','[data-scope="menu"]']],
 ['data-table',['[data-scope=data-table]','[data-scope=table][data-part=root]']],
]) {
 const {styles}=await import(`../packages/primitives/dist/automatic-styles/${scope}.js`);
 for(const mode of ['light','dark','high-contrast']) {
  const theme=createLoongArkTheme({mode,targetId:`composition-${scope}`});
  createPrimitiveStyleBootstrap(styles)(theme);
  for(const selector of selectors) assert.ok(theme.toStyleSheet().includes(selector),`${scope} ${mode} 保留内部部件 ${selector}`);
 }
}
console.log('默认自动样式：真实组件引用、三主题精确规则、成本、重复/迟到入口、监听解绑与 Primitives/Kit 扩展通过。');
