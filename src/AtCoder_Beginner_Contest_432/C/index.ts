import { readFileSync } from 'fs';
import * as path from 'path';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n')
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n');

const [N, X, Y] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

// const myMap = new Map<number, any>();
//
// for (const a of A) {
//   for (let i = 0; i <= a; i++) {
//     const num = i * X + (a - i) * Y;
//     const numValue = myMap.get(num);
//
//     myMap.set(
//       num,
//       numValue === undefined
//         ? { count: 1, yCount: a - i }
//         : { count: numValue.count + 1, yCount: numValue.yCount + (a - i) },
//     );
//   }
// }
//
// const answerArray = [];
//
// for (const [key, value] of myMap) {
//   if (value.count === N) {
//     answerArray.push({ key, yCount: value.yCount });
//   }
// }
//
// const sortedAnswerArray = answerArray.sort((a, b) => b.yCount - a.yCount);
//
// console.log(sortedAnswerArray.length > 0 ? sortedAnswerArray[0].yCount : -1);

// mina を求める
let mina = A[0];
for (let i = 1; i < N; i++) if (A[i] < mina) mina = A[i];

// 演算に BigInt を使う
const bigY = BigInt(Y);
const diff = BigInt(Y - X); // Y-X > 0 guaranteed by constraints

let totalBig = 0n; // 合計の大きい飴（BigInt）
for (let i = 0; i < N; i++) {
  const ai = BigInt(A[i]);
  const ai_minus_mina = ai - BigInt(mina); // >= 0
  const numerator = ai_minus_mina * bigY; // (A[i]-mina) * Y  → BigInt

  // 整数割り算できるかチェック
  if (numerator % diff !== 0n) {
    console.log(-1);
    process.exit(0);
  }

  const si = numerator / diff; // 小さい飴の個数 s_i

  // s_i が範囲内かチェック
  if (si < 0n || si > ai) {
    console.log(-1);
    process.exit(0);
  }

  const ti = ai - si; // 大きい飴の個数 t_i
  totalBig += ti;
}

// 出力（BigInt を文字列化）
console.log(totalBig.toString());
