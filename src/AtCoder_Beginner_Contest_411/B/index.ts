import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const [N, D] = input.split('\n');
const distanceList = D.split(' ').map(Number);
// distanceList.unshift(0); // 最初の位置を0に追加
const answer = [];

for (let i = 0; i < +N - 1; i++) {
  const distanceArray: number[] = [];

  distanceList.forEach((j, index) => {
    if (index < i) return;
    const distance = j + (distanceArray[index - i - 1] || 0);
    distanceArray.push(distance);
  });

  // distanceList.reduce((acc, cur) => {
  //   distanceArray.push(acc + cur);
  //   return acc + cur;
  // });

  answer.push(distanceArray);
}

const result = answer.map((arr) => arr.join(' ')).join('\n');
console.log(result);
