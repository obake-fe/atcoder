import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/practice/B06/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

const [N, Q] = lines[0].split(' ').map(Number);
const results = lines[1].split(' ').map(Number);
let temp = 0;

const totalSumArray = results.map((result) => {
  temp += result;
  return temp;
});

for (let i = 2; i < Q + 2; i++) {
  const [L, R] = lines[i].split(' ').map(Number);
  const totalSum = totalSumArray[R - 1] - totalSumArray[L];
  const average = (R - L) / 2;
  console.log(totalSum > average ? 'あたり' : totalSum === average ? '同じ' : 'はずれ');
}
