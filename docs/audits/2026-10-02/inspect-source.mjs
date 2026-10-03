import { readFile, writeFile, readdir } from 'node:fs/promises';
import { baseTokens } from '../../../packages/tokens/dist/index.js';
import { registry } from '../../../packages/primitives/dist/index.js';

const getToken = (path) => path.split('.').reduce((value, key) => value?.[key], baseTokens);
const missing = registry.flatMap((primitive) => primitive.contract.tokens
  .filter((path) => getToken(path) === undefined)
  .map((path) => ({ component: primitive.contract.name, path })));
const luminance = (hex) => {
  const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => parseInt(part, 16) / 255);
  return rgb.map((v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
    .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
};
const contrast = (a, b) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Number(((values[0] + .05) / (values[1] + .05)).toFixed(2));
};
const sourceDeclarations = (await readdir(new URL('../../../packages/svelte/src/components/', import.meta.url)))
  .filter((file) => file.endsWith('.d.ts'));
const distDeclarations = (await readdir(new URL('../../../packages/svelte/dist/components/', import.meta.url)))
  .filter((file) => file.endsWith('.d.ts'));
const captures = JSON.parse(await readFile(new URL('component-captures.json', import.meta.url), 'utf8'));
const sweep = JSON.parse(await readFile(new URL('story-sweep.json', import.meta.url), 'utf8'));
const allStories = [...captures.map((capture) => ({ ...capture, ...capture.metrics })), ...sweep];
const errors = allStories.filter((story) => story.error);
const result = {
  primitiveCount: registry.length,
  tokenReferenceCount: registry.reduce((sum, primitive) => sum + primitive.contract.tokens.length, 0),
  missingReferenceCount: missing.length,
  missingPaths: [...new Set(missing.map((item) => item.path))],
  missing,
  contrast: { placeholderOnSurface: contrast('#B3B4BD', '#F5F6FA'), borderOnSurface: contrast('#E5E6EB', '#F5F6FA') },
  svelteDeclarations: {
    source: sourceDeclarations.length,
    dist: distDeclarations.length,
    missingSourceDeclarations: sourceDeclarations.filter((name) => !distDeclarations.includes(name)).length,
  },
  storyCount: allStories.length,
  storyErrorCount: errors.length,
  errors: errors.map(({ id, title, name, error }) => ({ id, title, name, error })),
};
await writeFile(new URL('source-checks.json', import.meta.url), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ ...result, missing: undefined, errors: undefined }, null, 2));
