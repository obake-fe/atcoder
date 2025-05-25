import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [X, Y] = lines[0].split(' ').map(Number);

const isFilled1 = (a: number, b: number) => {
  return a + b >= X;
};

const isFilled2 = (a: number, b: number) => {
  return Math.abs(a - b) >= Y;
};

let count = 0;

for (let i = 1; i <= 6; i++) {
  for (let j = 1; j <= 6; j++) {
    if (isFilled1(i, j) || isFilled2(i, j)) {
      count++;
    }
  }
}

console.log(count / 36);
