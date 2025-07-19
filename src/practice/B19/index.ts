import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

// 動的計画法
const [N, W] = lines[0].split(' ').map(Number);
const items = lines.map((line) => line.split(' ').map(Number));

// ✅ 問題点：W ≤ 10^9 に対して dp[i][j] を W + 1 回ループしている
// あなたの実装は「重さベースの DP（dp[i][j] = 重さ j のときの最大価値）」ですが、
// W が最大 10^9 なので、配列 dp[N + 1][W + 1] を作ろうとすると、メモリも時間も足りません。
//
// ✅ 解決策：価値ベースの DP に切り替える
// 発想の転換：
//
// W が大きいときは 重さではなく「価値」を軸にして DP を構築する方が効率的です。
//
// 各価値の最小重さを記録するようにします。

// const dp: number[][] = Array.from({ length: N + 1 }, () => Array(W + 1).fill(-1e11));
// dp[0][0] = 0; // 初期化

// for (let i = 1; i <= N; i++) {
//   for (let j = 0; j <= W; j++) {
//     const [w, v] = items[i];
//
//     if (j < w) {
//       dp[i][j] = dp[i - 1][j];
//     } else {
//       dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
//     }
//   }
// }

// console.log(Math.max(...dp[N]));

// 最大の価値の合計は N * 最大価値（1000）= 100_000
const maxValue = N * 1000;
const INF = 1e18;

// dp[v] := 価値vを得るための最小重量
const dp = Array(maxValue + 1).fill(INF);
dp[0] = 0; // 価値0のために必要な重さは0

for (const [w, v] of items) {
  for (let val = maxValue; val >= v; val--) {
    dp[val] = Math.min(dp[val], dp[val - v] + w);
  }
}

// W 以下の重さで得られる最大の価値を探す
let result = 0;
for (let v = 0; v <= maxValue; v++) {
  if (dp[v] <= W) result = v;
}

console.log(result);
