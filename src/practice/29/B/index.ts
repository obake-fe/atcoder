import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const [a, b] = input.split(' ').map(BigInt);
const MOD = 1000000007n;

// 繰り返し二乗法による a^b の計算
function modPow(a: bigint, b: bigint, mod: bigint): bigint {
  let result = 1n;
  // 足し算、引き算、掛け算では、計算の任意のタイミングで余りを取っても結果は同じ
  a = a % mod;

  while (b > 0n) {
    // b の 現在の最下位ビットが 1（奇数） であるなら、result に今の a をかける。
    // これは「2進数のこの桁が 1 なら a^1 をかける」という意味です。
    if (b % 2n === 1n) {
      result = (result * a) % mod;
    }

    // a を2乗します（次のビットは1つ上の桁なので、a^2, a^4, a^8...を準備するため）。
    // 毎回 % mod してオーバーフロー防止。
    a = (a * a) % mod;

    // b を半分にして、次のビットに進みます。
    // 2進数で言えば **右シフト（>> 1）**と同じです。（number型なら b >> 1 で良い）
    b = b / 2n;
  }

  return result;
}

console.log(modPow(a, b, MOD).toString());
