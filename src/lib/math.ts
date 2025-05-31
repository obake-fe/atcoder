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
