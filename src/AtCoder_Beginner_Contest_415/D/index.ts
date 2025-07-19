import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M] = lines[0].split(' ').map(BigInt);
// 解答1 TLE
// const actions = new Map();
//
// lines.slice(1).forEach((line: string) => {
//   const [A, B] = line.split(' ').map(BigInt);
//   if (actions.has(A)) {
//     const existing = actions.get(A);
//     if (existing < B) {
//       actions.set(A, B);
//     }
//   } else {
//     actions.set(A, B);
//   }
// });
//
// let sealCount = 0;
// let colaCount = N;
//
// let minCost = 0;
// let bestPerformance = Infinity;
//
// while (colaCount > 0) {
//   minCost = 0;
//   bestPerformance = Infinity;
//
//   for (const [cost, performance] of actions) {
//     if (colaCount >= cost && cost - performance < bestPerformance) {
//       bestPerformance = cost - performance;
//       minCost = cost;
//     }
//   }
//
//   if (minCost === 0) {
//     break;
//   }
//
//   const count = colaCount - minCost;
//   sealCount += count;
//   colaCount -= count * bestPerformance;
// }
//
// console.log(sealCount);

// 解答2 TLE
// const exchanges: [bigint, bigint][] = [];
//
// for (let i = 1; i <= Number(M); i++) {
//   const [A, B] = lines[i].split(' ').map(BigInt);
//   exchanges.push([A, B]);
// }
//
// // 効率の良い順（コスト減少 = A - B が小さい順）に並べ替え
// exchanges.sort((a, b) => {
//   const diffA = a[0] - a[1];
//   const diffB = b[0] - b[1];
//   return diffA < diffB ? -1 : diffA > diffB ? 1 : 0;
// });
//
// let seals = 0n;
// let empty = 0n;
// let cola = N;
//
// for (const [A, B] of exchanges) {
//   while (cola > 0n || empty >= 0n) {
//     // コーラを飲む
//     empty += cola;
//     cola = 0n;
//
//     // 交換できる回数を計算（まとめて処理）
//     const exchangeCount = empty / A;
//     if (exchangeCount === 0n) break;
//
//     // シール加算
//     seals += exchangeCount;
//
//     // 新しいコーラをゲットし、空き瓶を消費
//     cola += exchangeCount * B;
//     empty -= exchangeCount * A;
//   }
// }
//
// console.log(seals.toString());

// 解答3 貪欲法
type Exchange = [bigint, bigint];

const exchanges: Exchange[] = [];

// 入力処理は省略（`N` と `M` と `lines[]` は与えられている前提）

for (let i = 1; i <= Number(M); i++) {
  const [A, B] = lines[i].split(' ').map(BigInt);
  exchanges.push([A, B]);
}

// D_i = A - B の小さい順に並び替え
exchanges.sort((a, b) => {
  const dA = a[0] - a[1];
  const dB = b[0] - b[1];
  return dA < dB ? -1 : dA > dB ? 1 : 0;
});

let seals = 0n;
let curr = N;

for (const [A, B] of exchanges) {
  const D = A - B;

  // Aより小さいと交換不可
  if (curr < A) continue;

  if (D === 0n) {
    // 何回でもできるが、無限ループにならないよう適当に制限
    // ただしこの問題では D=0 のパターンはたぶん存在しない
    // 無視しても問題なし
    continue;
  }

  // x = max(0, floor((N - A) / D) + 1)
  const x = (curr - A) / D + 1n;

  // 実際に交換してみる
  curr -= D * x;
  seals += x;
}

console.log(seals.toString());
