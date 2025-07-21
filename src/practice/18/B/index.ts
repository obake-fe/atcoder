import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

// 動的計画法
const [N, S] = lines[0].split(' ').map(Number);
const A = [0, ...lines[1].split(' ').map(Number)]; // NOTE: 便宜上、0を先頭に追加
const dp: boolean[][] = Array.from({ length: N + 1 }, () => Array(S + 1).fill(false));
dp[0][0] = true; // 初期化

for (let i = 1; i <= N; i++) {
  for (let j = 0; j <= S; j++) {
    if (j < A[i]) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = dp[i - 1][j] || dp[i - 1][j - A[i]];
    }
  }
}

// 到達不可なら -1
if (!dp[N][S]) {
  console.log(-1);
  process.exit(0);
}

// 動的計画法の復元
const answer: number[] = [];
let total = S;
let num = N;

while (total > 0 && num > 0) {
  // 現在の値を選んだかどうかを確認
  if (total >= A[num] && dp[num - 1][total - A[num]]) {
    answer.push(num);
    total -= A[num]; // 選んだ値を引く
  }
  num--; // 次の値へ
}

console.log(answer.length);
console.log(answer.reverse().join(' '));
