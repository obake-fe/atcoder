import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

const N = +lines[0];
const A = lines[1].split(' ').map(Number);
const Q = +lines[2];
const sortedA = A.slice().sort((a, b) => a - b);

// for (let i = 0; i < Q; i++) {
//   const X = +lines[3 + i];
//   const index = sortedA.findIndex((a) => a >= X);
//   if (index === -1) {
//     console.log(A.length);
//   } else {
//     console.log(index);
//   }
// }

// 2. 二分探索で各クエリに答える（O(Q log N)）
for (let i = 0; i < Q; i++) {
  const x = +lines[3 + i];
  let left = 0;
  let right = N;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedA[mid] < x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  console.log(left); // 左側にある＝x未満の要素数
}
