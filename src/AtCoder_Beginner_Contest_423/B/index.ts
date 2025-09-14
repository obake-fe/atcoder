import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);
const L = lines[1].split(' ').map(Number);

const firstLockIndex = L.findIndex((key) => {
  return key === 1;
});

const lastLockIndex =
  N -
  1 -
  L.reverse().findIndex((key) => {
    return key === 1;
  });

console.log(firstLockIndex !== -1 ? lastLockIndex - firstLockIndex : 0);
