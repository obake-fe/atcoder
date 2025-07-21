import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const N = +input;

let left = 0;
// let right = N;
let right = Math.cbrt(N) + 1;
const calculateResult = (x: number) => {
  return x ** 3 + x;
};

while (right - left > 0.001) {
  const mid = (left + right) / 2;
  const result = calculateResult(mid);

  if (result < N) {
    left = mid + 0.001;
  } else {
    right = mid;
  }
}

// console.log(Math.round(left * 1000) / 1000); // 小数点以下3桁まで表示
console.log(left.toFixed(3));
