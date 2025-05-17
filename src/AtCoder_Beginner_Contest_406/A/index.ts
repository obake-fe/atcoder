import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [A, B, C, D] = lines[0].split(' ').map((str) => str.padStart(2, '0'));
const deadline = Number(A + B);
const submission = Number(C + D);

const isInTime = deadline >= submission;

console.log(isInTime ? 'Yes' : 'No');
