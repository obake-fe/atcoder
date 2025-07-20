/*
 * フィボナッチ数列のN番目までの値を出力する
 */
export const generateFibonacci = (n: number): number[] => {
  const fib = [1, 1];
  while (fib.length < n) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
};

/*
 * 最大公約数を求める
 * ユークリッドの互除法を使用
 */
export const calculateGCM = (a: number, b: number): number => {
  if (a === 0) return b;
  if (b === 0) return a;

  if (a < b) {
    return calculateGCM(a, b % a);
  } else {
    return calculateGCM(b, a % b);
  }
};

/*
 * 最小公倍数を求める
 * 最小公倍数は、2つの数の積を最大公約数で割ったもの
 */
export const calculateLCM = (a: number, b: number): bigint => {
  return (BigInt(a) * BigInt(b)) / BigInt(calculateGCM(a, b));
};

/*
 * 繰り返し二乗法による a^b の計算
 */
export const power = (base: bigint, exponent: bigint): bigint => {
  let result = 1n;
  let x = base;
  let e = exponent;

  while (e > 0n) {
    if (e % 2n === 1n) result *= x;
    x *= x;
    e /= 2n;
  }

  return result;
};

/*
 * 繰り返し二乗法による a^b の計算（mod付き）
 */
export const modPow = (a: bigint, b: bigint, mod: bigint): bigint => {
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
};
