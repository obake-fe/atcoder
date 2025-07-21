import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n') // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n'); // 本番用

/*
 * 石取りゲーム必勝法
 */
const [N, K] = input[0].split(' ').map(Number);
const aArray = input[1].split(' ').map(Number);

// index が残り残り石の数。自分の番が来たときに勝利が確定しているか
const dp: boolean[] = new Array(N + 1).fill(false);

for (let i = 0; i <= N; i++) {
  aArray.forEach((A) => {
    if (i >= A && !dp[i - A]) {
      dp[i] = true;
    }
  });
}

console.log(dp[N] ? 'First' : 'Second');
