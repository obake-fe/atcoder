import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M] = lines[0].split(' ').map(Number);

const map = new Map<number, number[]>();

lines.slice(1, N + 1).forEach((line) => {
  const [A, B] = line.split(' ').map(Number);
  if (!map.has(A)) {
    map.set(A, [B]);
  } else {
    map.get(A)!.push(B);
  }
});

for (let i = 1; i <= M; i++) {
  const arr = map.get(i) || [];

  const average = arr.reduce((sum, current) => sum + current, 0) / arr.length;

  console.log(average);
}
