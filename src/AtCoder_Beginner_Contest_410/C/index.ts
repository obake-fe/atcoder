import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, Q] = lines[0].split(' ').map(Number);
const A = [...Array(N + 1)].map((_, i) => i + 1);
const answer: number[] = [];
let offset = 0;

for (let i = 1; i <= Q; i++) {
  const [n, ...args] = lines[i].split(' ').map(Number);

  if (n === 1) {
    const p = args[0];
    const x = args[1];
    const realIndex = (offset - 1 + p) % N;
    A[realIndex] = x;
  } else if (n === 2) {
    const p = args[0];
    const realIndex = (offset - 1 + p) % N;
    answer.push(A[realIndex]);
  } else if (n === 3) {
    const k = args[0];
    if (k === 0 || k === N) {
      continue;
    }
    // const shiftNum = k > N ? k % N : k;
    // const shiftedArray = A.slice(0, shiftNum);
    // A.splice(0, shiftNum);
    // A.push(...shiftedArray);

    offset = (offset + k) % N;
  }
}

console.log(answer.join('\n'));
