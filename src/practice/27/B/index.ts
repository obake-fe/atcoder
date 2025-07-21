import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [A, B] = lines[0].split(' ').map(Number);

/*
 * 最大公約数を求める
 * ユークリッドの互除法を使用
 */
const calculateGCM = (a: number, b: number): number => {
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
const calculateLCM = (a: number, b: number): bigint => {
  return (BigInt(a) * BigInt(b)) / BigInt(calculateGCM(a, b));
};

console.log(String(calculateLCM(A, B)));
