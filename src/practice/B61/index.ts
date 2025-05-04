import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/practice/B61/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M] = lines[0].split(' ').map(Number);
const friendCount = new Map<number, number>();

// 友達の数をカウントする
for (let i = 1; i <= M; i++) {
  const [a, b] = lines[i].split(' ').map(Number);
  friendCount.set(a, (friendCount.get(a) || 0) + 1);
  friendCount.set(b, (friendCount.get(b) || 0) + 1);
}

const maxEntry = Array.from(friendCount.entries()).reduce((max, curr) =>
  curr[1] > max[1] ? curr : max,
);

console.log('最大の value を持つ key:', maxEntry[0]);
