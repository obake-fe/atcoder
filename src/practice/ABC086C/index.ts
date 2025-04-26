import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/practice/ABC086C/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

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
