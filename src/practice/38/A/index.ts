import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n') // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n'); // 本番用

const [D, N] = input[0].split(' ').map(Number);
const testCases = input.slice(1).map((line) => line.split(' ').map(Number));

const limitArray = new Array(D).fill(24);

for (let i = 0; i < N; i++) {
  const [L, R, H] = testCases[i];

  for (let j = L - 1; j < R; j++) {
    limitArray[j] = Math.min(limitArray[j], H);
  }
}

console.log(limitArray.reduce((sum, limit) => sum + limit, 0));
