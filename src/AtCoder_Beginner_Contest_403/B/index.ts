import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_403/B/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [original, target] = lines;

const originalLength = original.length;
const targetLength = target.length;

const isFilled = [...Array(originalLength - targetLength + 1)].some((_, i) => {
  return original
    .slice(i, i + targetLength)
    .split('')
    .every((char, j) => {
      return char === target[j] || char === '?';
    });
});

console.log(isFilled ? 'Yes' : 'No');
