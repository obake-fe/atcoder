import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_404/A/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const targetArray = input.split('');

const alphabets = [...Array(26)].map((_, b) => (10 + b).toString(36));

for (const char of alphabets) {
  if (!targetArray.includes(char)) {
    console.log(char);
    break;
  }
}
