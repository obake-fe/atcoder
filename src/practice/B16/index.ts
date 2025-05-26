import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

// 動的計画法
const N = +lines[0];
const cost = lines.slice(1).flatMap((line) => line.split(' ').map(Number));
const dp: number[] = [];

for (let i = 0; i < N; i++) {
  if (i === 0) {
    dp.push(0); // 初期化
  } else if (i === 1) {
    dp.push(Math.abs(cost[1] - cost[0]));
  } else {
    const oneStepCost = Math.abs(cost[i - 1] - cost[i]);
    const twoStepCost = Math.abs(cost[i - 2] - cost[i]);
    dp.push(Math.min(dp[i - 1] + oneStepCost, dp[i - 2] + twoStepCost));
  }
}

console.log(dp[N - 1]); // 最後の石までの最小コストを出力
