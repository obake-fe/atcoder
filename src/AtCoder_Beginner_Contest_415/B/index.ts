import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const S = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const answerArray: number[] = [];

S.split('').forEach((c, i) => {
  if (c === '#') {
    answerArray.push(i + 1);
  }
});

const result = [];

for (let i = 0; i < answerArray.length; i += 2) {
  result.push(`${answerArray[i]},${answerArray[i + 1]}`);
}

console.log(result.join('\n'));
