import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const T = +lines[0]; // テストケースの数
const answers: number[] = [];

// 貪欲法を使う
for (let test = 1; test <= T; test++) {
  const N = +lines[2 * test - 1];
  const S = lines[2 * test].split(' ').map(Number);

  const used = Array(N).fill(false);
  let ans = 1;
  let last = 0;

  while (true) {
    if (S[last] * 2 >= S[N - 1]) {
      ans++;
      break;
    }

    let nxt = -1;
    for (let i = 1; i < N; i++) {
      if (used[i]) continue;
      if (S[last] * 2 >= S[i]) {
        if (nxt === -1 || S[nxt] < S[i]) {
          nxt = i;
        }
      }
    }

    if (nxt === -1 || S[nxt] <= S[last]) {
      ans = -1;
      break;
    }

    used[nxt] = true;
    last = nxt;
    ans++;
  }

  answers.push(ans);
}

// for (let i = 1; i <= T; i++) {
//   const N = +lines[2 * i - 1];
//   const S = lines[2 * i].split(' ').map(Number);
//   const sortedS = S.slice(0, N).sort((a, b) => b - a);
//
//   let targetWeight = S[0];
//   let count = 1;
//
//   while (targetWeight < S[N - 1]) {
//     const targetFirstDominoIndex = sortedS.findIndex(
//       (weight) => weight <= targetWeight * 2 && weight <= S[N - 1],
//     );
//
//     if (targetFirstDominoIndex === -1 || targetWeight === sortedS[targetFirstDominoIndex]) {
//       count = -1;
//       targetWeight = S[N - 1];
//       break;
//     } else {
//       count++;
//       targetWeight = sortedS[targetFirstDominoIndex];
//     }
//   }
//
//   answers.push(count);
// }

console.log(answers.join('\n'));
