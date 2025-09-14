import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, Q] = lines[0].split(' ').map(Number);
const A = [...Array(N)].map((_, index) => index + 1); // 1からNまでの配列を作成

let reverseFlag = false;

for (let i = 1; i <= Q; i++) {
  const query = lines[i].split(' ').map(Number);
  if (query[0] === 1) {
    const x = query[1];
    const y = query[2];

    if (reverseFlag) {
      A[N - x] = y;
    } else {
      A[x - 1] = y;
    }
  } else if (query[0] === 2) {
    reverseFlag = !reverseFlag;
  } else if (query[0] === 3) {
    const x = query[1];

    if (reverseFlag) {
      console.log(A[N - x]);
    } else {
      console.log(A[x - 1]);
    }
  }
}
