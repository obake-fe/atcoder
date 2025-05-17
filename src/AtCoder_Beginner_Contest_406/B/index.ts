import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, K] = lines[0].split(' ').map(Number);
const positiveIntegerArray = lines[1].split(' ').map(BigInt);

const result = positiveIntegerArray.reduce((acc, cur) => {
  const _result = acc * cur;

  if (String(_result).length > K) {
    return BigInt(1);
  } else {
    return _result;
  }
});

console.log(String(result));

// let acc = 1;
//
// for (let i = 0; i < N; i++) {
//   const _result = acc * positiveIntegerArray[i];
//
//   if (String(_result).length > K) {
//     acc = 1;
//   } else {
//     acc = _result;
//   }
// }
//
// console.log(acc);
