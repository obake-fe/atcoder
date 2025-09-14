import { readFileSync } from 'fs';
import * as path from 'path';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n')
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n');

const [N, R] = input[0].split(' ').map(Number);
const L = input[1].split(' ').map(Number);

const leftSide = L.slice(0, R);
const rightSide = L.slice(R, N + 1);

const firstOpenIndex = L.findIndex((key) => {
  return key === 0;
});

// すべて鍵がかかっていたら0を出力
if (firstOpenIndex === -1) {
  console.log(0);
  process.exit();
}

const lastOpenIndex =
  N -
  1 -
  L.slice()
    .reverse()
    .findIndex((key) => {
      return key === 0;
    });

let count = 0;

if (leftSide.length !== 0 && firstOpenIndex < R) {
  leftSide.slice(firstOpenIndex, R).forEach((key) => {
    if (key === 1) count++;
  });

  count += R - firstOpenIndex;
}

if (rightSide.length !== 0 && lastOpenIndex >= R) {
  rightSide.slice(0, lastOpenIndex - R + 1).forEach((key) => {
    if (key === 1) count++;
  });

  count += lastOpenIndex - R + 1;
}

console.log(count);
