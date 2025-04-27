import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_403/A/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const numArray = input.split('\n')[1].split(/\s+/).map(Number);

const oddSum = numArray.reduce((acc, current, index) => {
  return index % 2 === 0 ? acc + current : acc;
}, 0);

console.log(oddSum);
