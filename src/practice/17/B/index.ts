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

const answer: number[] = [N];
let place = N - 1;

// 動的計画法の復元
while (place > 0) {
  // 最後の石からどの石に戻るかを決定
  if (dp[place] === dp[place - 1] + Math.abs(cost[place - 1] - cost[place])) {
    answer.push(place - 1 + 1);
    place -= 1; // 一つ前の石へ
  } else {
    answer.push(place - 2 + 1);
    place -= 2; // 二つ前の石へ
  }
}

console.log(answer.length); // 石の数を出力
console.log(answer.reverse().join(' ')); // 最後の石までの最小コストを出力
