import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, K] = lines[0].split(' ');
const S = lines[1];

const initialOnCount = [...S].filter((ch) => ch === '1').length;
const onCountDiff = Math.abs(Number(K) - initialOnCount);

const judge = onCountDiff % 2 === 0 ? 'Yes' : 'No';

console.log(judge);
