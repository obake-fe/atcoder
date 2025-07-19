import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n') // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n'); // 本番用

const t = Number(input[0]);
let line = 1;

const results: string[] = [];

for (let i = 0; i < t; i++) {
  const n = Number(input[line++]);
  const s = '0' + input[line++]; // 状態0を明示的に安全とする

  const size = 1 << n; // 2^n
  const canReach = new Array(size).fill(false);
  canReach[0] = true; // 状態0からスタート

  for (let state = 0; state < size; state++) {
    if (!canReach[state]) continue;

    for (let k = 0; k < n; k++) {
      // ① state >> k
      // 「state を k ビット右にずらす」＝ 薬品 k が 0 ビット目に来るようにする
      //
      // ② & 1
      // 「最下位ビット（0ビット目）が 1 かどうか調べる」
      // つまり 薬品 k が入っているかを調べる
      if ((state >> k) & 1) continue; // 既に薬品kが入っていればスキップ

      // 1 << k で「k番目のビットが1の数」を作る
      // state | (1 << k) で「state に k 番目のビットを追加した状態」を作る
      // → ビット演算の |（OR）を使っているので、「そのビットが元々 1 でも 0 でも、結果は 1 になる」
      const next = state | (1 << k);
      // k を注いだ状態が安全か
      if (s[next] === '0') {
        canReach[next] = true;
      }
    }
  }

  results.push(canReach[size - 1] ? 'Yes' : 'No');
}

console.log(results.join('\n'));
