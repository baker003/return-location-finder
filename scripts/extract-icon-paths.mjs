import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ICONS_DIR = '/Users/baker/Desktop/에이전트 테스트1/src/components/Icons';
const files = readdirSync(ICONS_DIR).filter(f => f.endsWith('.tsx') && f !== 'IconBase.tsx');

const result = {};

for (const file of files) {
  const name = file.replace('.tsx', '');
  const content = readFileSync(join(ICONS_DIR, file), 'utf-8');
  // 첫 번째 path: 'xxx' 매칭
  const match = content.match(/path:\s*'([^']+)'/);
  if (match) {
    result[name] = match[1];
  }
}

writeFileSync('/Users/baker/Desktop/에이전트 테스트1/scripts/icon-paths.json', JSON.stringify(result, null, 2));
console.log(`Extracted ${Object.keys(result).length} icons`);
