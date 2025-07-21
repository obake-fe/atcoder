import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/practice/B04/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');

const numArray = lines[0].split('').map(Number);
const reverseNumArray = numArray.reverse();

const ans = reverseNumArray.reduce((acc, cur, index) => {
  return acc + cur * 2 ** index;
}, 0);

console.log(ans);
