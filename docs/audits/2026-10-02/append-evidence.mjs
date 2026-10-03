import { readFile, writeFile } from 'node:fs/promises';

const captures = JSON.parse(await readFile(new URL('component-captures.json', import.meta.url), 'utf8'));
const rows = captures.map((item) => {
  const name = item.title.replace('Components/', '');
  let note = item.metrics.error ? '阻塞，首屏运行错误' : '首屏可渲染，交互完整性待验收';
  if (name === 'Date Picker' || name === 'DatePicker') note = '不合格，日期浮层巨大横向溢出';
  if (name === 'Pagination') note = '需修复，页码名称为 page undefined';
  if (name === 'Input') note = '需修复，状态和字段布局见步骤 08';
  if (name === 'Menu') note = 'Basic 可渲染，Options 在步骤 09 报错';
  if (name === 'Toast') note = '首屏仅触发器，通知完整交互待验证';
  return `| ${item.step} | ${name} / ${item.name} | ${note} | [原图](./${item.file}) |`;
});
const direct = ['Accordion','Avatar','Button','Carousel','Checkbox','Collapsible','Combobox','Date Picker','Dialog','Dropdown Menu','Hover Card','Input','Input OTP','Pagination','Popover','Progress','Radio Group','Resizable','Scroll Area','Select','Slider','Switch','Tabs','Textarea','Toast','Toggle','Toggle Group','Tooltip'];
const partial = ['Calendar','Context Menu','Field','Input Group','Label'];
const absent = ['Alert','Alert Dialog','Aspect Ratio','Badge','Breadcrumb','Button Group','Card','Chart','Command','Data Table','Direction','Drawer','Empty','Item','Kbd','Menubar','Native Select','Navigation Menu','Separator','Sheet','Sidebar','Skeleton','Spinner','Table','Typography'];
const extension = ['Attachment','Bubble','Marker','Message','Message Scroller','Questionnaire'];
const aliases = {'Dropdown Menu':'Menu','Input OTP':'PinInput','Resizable':'Splitter','Textarea':'TextareaControl','Calendar':'DatePicker inline','Context Menu':'MenuContextTrigger','Field':'Input 的 Field 封装','Input Group':'Input prefix/suffix','Label':'InputLabel 等字段 Label'};
const matrix = [...direct.map((name) => ({ name, status:'已有对应入口' })), ...partial.map((name) => ({ name, status:'部分覆盖' })), ...absent.map((name) => ({ name, status:'缺少' })), ...extension.map((name) => ({ name, status:'扩展，按业务评估' }))].sort((a,b)=>a.name.localeCompare(b.name));
let report = await readFile(new URL('review.md', import.meta.url), 'utf8');
report = report.split('\n| 步骤 | 组件和状态 | 健康度 | 截图 |')[0];
report += '\n| 步骤 | 组件和状态 | 健康度 | 截图 |\n| --- | --- | --- | --- |\n' + rows.join('\n') + '\n';
for(let i=1;i<=5;i++) report += `\n![组件基线总览 ${i}](./contact-${i}.jpg)\n`;
report += '\n## shadcn 目录逐项映射\n\n入口存在不等于实现合格；本表只用于范围统计。\n\n| 官方目录项 | 对应能力 | 范围状态 |\n| --- | --- | --- |\n' + matrix.map((item)=>`| ${item.name} | ${aliases[item.name] ?? (item.status==='已有对应入口' ? item.name : '—')} | ${item.status} |`).join('\n') + '\n';
await writeFile(new URL('review.md', import.meta.url), report);
await writeFile(new URL('coverage-matrix.json', import.meta.url), JSON.stringify({direct:direct.length,partial:partial.length,absent:absent.length,extension:extension.length,items:matrix},null,2));
console.log(JSON.stringify({screenshots:captures.length+9,coverageItems:matrix.length,missing:absent.length}));
