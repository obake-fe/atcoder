import { readFileSync } from 'fs';
import * as path from 'path';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n')
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);

const counter = new Map<number, number>(); // key: i + A[i]
let ans = 0;

for (let i = 0; i < N; i++) {
  const a = A[i];
  const left = i - a;
  const right = i + a;

  // left < i なので、これ以降のループで現在の left に一致する right は存在しない
  // よって、すでに存在する「i + A[i]」と一致する「j - A[j]」だけを見ればいい
  if (counter.has(left)) {
    ans += counter.get(left)!; // ! は nullでないことの明示
  }

  // 今回の i + A[i] を記録
  counter.set(right, (counter.get(right) ?? 0) + 1);
}

console.log(ans);
