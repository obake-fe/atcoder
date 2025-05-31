import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);

const ans = [1, 1];
for (let i = 0; i < N - 2; i++) {
  const next = (ans[i] % 1000000007) + (ans[i + 1] % 1000000007); // 1000000007で割った余りを計算

  ans.push(next % 1000000007); // 次のフィボナッチ数を追加
}

console.log(ans[N - 1]);
