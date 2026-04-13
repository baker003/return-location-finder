import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('/Users/baker/Desktop/에이전트 테스트1/scripts/icon-paths.json', 'utf-8'));
const keys = Object.keys(data);
const perBatch = 20;
let batchNum = 1;
for (let i = 0; i < keys.length; i += perBatch) {
  const slice = keys.slice(i, i + perBatch);
  const obj = {};
  for (const k of slice) obj[k] = data[k];
  writeFileSync(`/Users/baker/Desktop/에이전트 테스트1/scripts/icon-b${batchNum}.json`, JSON.stringify(obj));
  batchNum++;
}
console.log(`Created ${batchNum - 1} batches`);
