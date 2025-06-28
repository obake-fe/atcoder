import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = +lines[0];
let answer = 0;

for (let i = 1; i <= N; i++) {
  const [A, B] = lines[i].split(' ').map(Number);
  if (A < B) {
    answer++;
  }
}

console.log(answer);
