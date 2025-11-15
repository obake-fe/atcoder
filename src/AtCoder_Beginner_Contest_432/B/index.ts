import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const array = lines[0].split('').map(Number);

const sortedArrayWithoutZero = array.filter((num) => num !== 0).sort((a, b) => a - b);
const zeroCount = array.length - sortedArrayWithoutZero.length;
const zeros = '0'.repeat(zeroCount);

console.log(`${sortedArrayWithoutZero[0]}${zeros}${sortedArrayWithoutZero.slice(1).join('')}`);
