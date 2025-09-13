import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
let [x, y] = lines[0].split(' ').map(Number);
const processArray = x !== y ? [[x, y]] : [];

while (x > 1 || y > 1) {
  if (x > y) {
    x = x - y;
  } else {
    y = y - x;
  }

  if (x !== y) {
    processArray.push([x, y]);
  }
}

console.log(
  x === 1 && y === 1
    ? processArray.length +
        '\n' +
        processArray
          .map((num) => num.join(' '))
          .reverse()
          .join('\n')
    : 0,
);
