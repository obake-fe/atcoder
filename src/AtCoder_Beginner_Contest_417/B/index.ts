import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M] = lines[0].split(' ').map(Number);
const A = lines[1].split(' ').map(Number);
const B = lines[2].split(' ').map(Number);

for (const b of B) {
  const index = A.findIndex((x) => x === b);
  if (index !== -1) {
    A.splice(index, 1);
  }
}

console.log(A.join(' '));
