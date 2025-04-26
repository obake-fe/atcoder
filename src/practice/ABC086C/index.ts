import { readFileSync } from 'fs';
import path from 'path';

const input = readFileSync(`src/practice/${path.basename(__dirname)}/text.txt`, 'utf8').trim();

const array = input.split('\n');
const move = array.map((str) => {
  return str.split(/\s+/).map(Number);
});

// 初期位置を追加
move.shift();
move.unshift([0, 0, 0]);

const isReachable = move.every((value, index) => {
  if (index === 0) return true;

  const [t, x, y] = value;
  const [prevT, prevX, prevY] = move[index - 1];

  const dt = t - prevT;
  const xDistance = Math.abs(x - prevX);
  const yDistance = Math.abs(y - prevY);
  const dist = xDistance + yDistance;

  if (dt < dist) return false;

  return dt % 2 === dist % 2;
});

console.log(isReachable ? 'Yes' : 'No');
