import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('/Users/baker/Desktop/에이전트 테스트1/scripts/icon-paths.json', 'utf-8'));
const keys = Object.keys(data);

const half = Math.ceil(keys.length / 2);
const batch1 = {};
const batch2 = {};
for (let i = 0; i < keys.length; i++) {
  (i < half ? batch1 : batch2)[keys[i]] = data[keys[i]];
}

writeFileSync('/Users/baker/Desktop/에이전트 테스트1/scripts/icon-batch1.json', JSON.stringify(batch1));
writeFileSync('/Users/baker/Desktop/에이전트 테스트1/scripts/icon-batch2.json', JSON.stringify(batch2));
console.log(`Batch1: ${Object.keys(batch1).length}, Batch2: ${Object.keys(batch2).length}`);
