import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

const T = Number(lines[0]);
const N = Number(lines[1]);

const B: number[] = [...Array(T + 1)].fill(0);

for (let i = 2; i < 2 + N; i++) {
  const [L, R] = lines[i].split(' ').map(Number);
  B[L] += 1;
  B[R] -= 1;
}

const ans: number[] = [];

B.reduce((acc, cur) => {
  ans.push(acc + cur);
  return acc + cur;
}, 0);

ans.pop();

console.log(ans.join('\n'));

// const ans = B.slice(0, T).reduce<{ acc: number; res: number[] }>(
//   ({ acc, res }, cur) => {
//     return {
//       acc: acc + cur,
//       res: [...res, acc + cur],
//     };
//   },
//   { acc: 0, res: [] },
// ).res;

console.log(ans.join('\n'));
