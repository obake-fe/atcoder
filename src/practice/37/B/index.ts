import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = lines[0];
const serialNumber = [...Array(9)].map((_, index) => index + 1);
let digitSum = BigInt(0);

for (const [index, ch] of [...N].entries()) {
  const num = parseInt(ch, 10);

  const parent = parseInt(N.slice(0, index), 10) || 0;
  const child = parseInt(N.slice(index + 1), 10) || 0;
  const digit = 10 ** (N.length - (index + 1));

  for (const serial of serialNumber) {
    if (serial < num) {
      digitSum += BigInt((parent + 1) * digit * serial);
    } else if (serial === num) {
      digitSum += BigInt(parent * digit * serial) + BigInt((child + 1) * serial);
    } else {
      digitSum += BigInt(parent * digit * serial);
    }
  }
}

console.log(String(digitSum));
