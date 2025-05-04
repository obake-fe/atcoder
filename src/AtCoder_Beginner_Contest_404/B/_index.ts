import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_404/B/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);

const S = lines.slice(1, -N).map((line) => line.split(''));
const T = lines.slice(-N).map((line) => line.split(''));

const getMismatchCount = (rot: number): number => {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let si = i,
        sj = j;
      if (rot === 1) {
        si = N - 1 - j;
        sj = i;
      } else if (rot === 2) {
        si = N - 1 - i;
        sj = N - 1 - j;
      } else if (rot === 3) {
        si = j;
        sj = N - 1 - i;
      }
      if (S[si][sj] !== T[i][j]) count++;
    }
  }
  return count + rot; // rot 回転したので +rot
};

const results = [
  getMismatchCount(0),
  getMismatchCount(1),
  getMismatchCount(2),
  getMismatchCount(3),
];

console.log(Math.min(...results));
