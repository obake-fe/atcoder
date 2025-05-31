import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);

// 包除原理を使って算出
const divBy3 = Math.floor(N / 3);
const divBy5 = Math.floor(N / 5);
const divBy7 = Math.floor(N / 7);

const divBy3_5 = Math.floor(N / (3 * 5));
const divBy3_7 = Math.floor(N / (3 * 7));
const divBy5_7 = Math.floor(N / (5 * 7));

const divBy3_5_7 = Math.floor(N / (3 * 5 * 7));

const result = divBy3 + divBy5 + divBy7 - divBy3_5 - divBy3_7 - divBy5_7 + divBy3_5_7;

console.log(result);
