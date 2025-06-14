import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, Q] = lines[0].split(' ').map(Number);
const balls = lines[1].split(' ').map(Number);
const boxes: number[] = [...Array(N)].fill(0);

const result = balls.map((num) => {
  if (num >= 1) {
    boxes[num - 1] += 1;
    return num;
  }

  const targetIndex = [...Array(N)].fill(0).reduce((acc, cur, index) => {
    return boxes[acc] > boxes[index] ? index : acc;
  }, 0);

  boxes[targetIndex] += 1;
  return targetIndex + 1;
});

console.log(result.join(' '));
