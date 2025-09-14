import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);
const A = lines.slice(1, N + 1).map((value) => value.split(' ').map(Number));

const Q = Number(lines[N + 1]);
const changeManagementArray = [...Array(N + 1)].map((_, index) => index);

for (let i = N + 2; i < N + 2 + Q; i++) {
  const query = lines[i].split(' ').map(Number);
  if (query[0] === 1) {
    const x = query[1] - 1;
    const y = query[2] - 1;
    const tempX = changeManagementArray[x];
    const tempY = changeManagementArray[y];

    changeManagementArray[x] = tempY;
    changeManagementArray[y] = tempX;
  } else if (query[0] === 2) {
    const x = query[1] - 1;
    const y = query[2] - 1;

    console.log(A[changeManagementArray[x]][y]);
  }
}
