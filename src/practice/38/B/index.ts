import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n') // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n'); // 本番用

// const N = Number(input[0]);
// const heightArray = new Array(N).fill(1);

// type RLEntry<T> = [T, number];
//
// const runLengthEncodeArray = <T>(arr: T[]): RLEntry<T>[] => {
//   if (arr.length === 0) return [];
//
//   const result: RLEntry<T>[] = [];
//   let prev = arr[0];
//   let count = 1;
//
//   for (let i = 1; i < arr.length; i++) {
//     if (Object.is(arr[i], prev)) {
//       count++;
//     } else {
//       result.push([prev, count]);
//       prev = arr[i];
//       count = 1;
//     }
//   }
//
//   result.push([prev, count]);
//   return result;
// };
//
// const rle = runLengthEncodeArray(input[1].split(''));
//
// let totalMinHeight = 0;
//
// rle.forEach(([char, count], index) => {
//   if (char === 'A') {
//     if (index === 0) {
//       for (let i = 1; i <= count; i++) {
//         totalMinHeight += i;
//       }
//     } else if (index === rle.length - 1) {
//       for (let i = 1; i <= count; i++) {
//         totalMinHeight += i + 1;
//       }
//     } else {
//       for (let i = 1; i < count; i++) {
//         totalMinHeight += i + 1;
//       }
//     }
//   } else {
//     for (let i = 1; i <= count + 1; i++) {
//       totalMinHeight += i;
//     }
//   }
// });

// console.log(totalMinHeight);

const N = Number(input[0]);
const S = input[1];

const res = new Array(N).fill(0);

// 1回目左→右 : A だけに注目
for (let i = 0; i < N - 1; i++) {
  if (S[i] === 'A') {
    res[i + 1] = Math.max(res[i + 1], res[i] + 1);
  }
}

console.log(res);

// 2回目右→左 : B だけに注目
for (let i = N - 2; i >= 0; i--) {
  if (S[i] === 'B') {
    res[i] = Math.max(res[i], res[i + 1] + 1);
  }
}

// 各要素は「0以上」なので +1 して高さ1以上にする
const result = res.reduce((sum, x) => sum + x + 1, 0);
console.log(result);
