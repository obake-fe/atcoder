import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = parseInt(lines[0]);
const S = lines[1].split('');

const isThreeInRow = S.some((color, index, row) => {
  return index <= N - 3 && color === S[index + 1] && color === S[index + 2];
});

console.log(isThreeInRow ? 'Yes' : 'No');
