import { readFileSync } from 'fs';
import path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, X] = lines[0].split(' ').map(Number);
const balls = lines[1].split('');

const queue: number[] = [X - 1]; // 位置Xを index に変換
balls[X - 1] = '@';

while (queue.length > 0) {
  const pos = queue.shift()!;

  // 左チェック
  if (pos > 0 && balls[pos - 1] === '.') {
    balls[pos - 1] = '@';
    queue.push(pos - 1);
  }

  // 右チェック
  if (pos < N - 1 && balls[pos + 1] === '.') {
    balls[pos + 1] = '@';
    queue.push(pos + 1);
  }
}

console.log(balls.join(''));
