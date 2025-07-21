import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N] = lines[0].split(' ').map(Number);
const countMap = new Map<number, number>();
let ans = 0;

for (let i = 1; i <= N; i++) {
  const A = Number(lines[i]);
  countMap.set(A, (countMap.get(A) || 0) + 1);
}

for (const count of countMap.values()) {
  ans += (count * (count - 1)) / 2;
}

console.log(ans);
