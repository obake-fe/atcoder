import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const [N, A, K] = input.split('\n');
const AArray = A.split(' ').map(Number);

const ans = AArray.filter((a) => {
  return a >= Number(K);
});

console.log(ans.length);
