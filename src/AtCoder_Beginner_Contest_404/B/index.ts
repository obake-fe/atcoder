import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_404/B/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);

const S = lines.slice(1, -N).map((line) => line.split(''));
const T = lines.slice(-N).map((line) => line.split(''));

const getUnMatchCounts = (base: string[][], target: string[][]) => {
  let counts = 0;

  base.forEach((line, lineIndex) => {
    line.forEach((char, charIndex) => {
      if (char !== target[lineIndex][charIndex]) {
        counts++;
      }
    });
  });

  return counts;
};

const rotateMatrix = (matrix: string[][]) => {
  const transposed = Array.from({ length: N }, () => Array(N).fill(0)); // 長さn、要素数nの配列を作りすべて0にする
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      transposed[i][j] = matrix[j][i]; // 0をmatrixの反転させた値で上書きする
    }
  }
  // 次に各行の要素を反転させる
  return transposed.map((row) => row.reverse());
};

const unMatchCounts = getUnMatchCounts(S, T);
const rightRotatedUnMatchCounts = getUnMatchCounts(rotateMatrix(S), T);
const halfRotatedUnMatchCounts = getUnMatchCounts(rotateMatrix(rotateMatrix(S)), T);
const leftRotatedUnMatchCounts = getUnMatchCounts(rotateMatrix(rotateMatrix(rotateMatrix(S))), T);

const minUnMatchCounts = Math.min(
  unMatchCounts,
  rightRotatedUnMatchCounts + 1,
  halfRotatedUnMatchCounts + 2,
  leftRotatedUnMatchCounts + 3,
);

console.log(minUnMatchCounts);
