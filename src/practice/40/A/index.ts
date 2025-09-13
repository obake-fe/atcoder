import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = parseInt(lines[0]);
const A = lines[1].split(' ').map(Number);

const sticks = new Map<number, number>();

for (const a of A) {
  if (sticks.has(a)) {
    sticks.set(a, sticks.get(a)! + 1);
  } else {
    sticks.set(a, 1);
  }
}

let ans = 0;

const combination = (n: number, k: number) => {
  const _n = BigInt(n);
  let _k = BigInt(k);
  if (_k > _n) return 0n;
  if (_k > _n - _k) _k = _n - _k; // 対称性を利用して高速化
  let numerator = 1n;
  let denominator = 1n;
  for (let i = 1n; i <= _k; i++) {
    numerator *= _n - i + 1n;
    denominator *= i;
  }
  return numerator / denominator;
};

for (const [key, value] of sticks) {
  if (value >= 3) {
    ans += Number(combination(value, 3));
  }
}

console.log(ans);
