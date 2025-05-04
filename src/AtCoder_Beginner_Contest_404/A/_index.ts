import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_404/A/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const letters = new Set<string>(input.split(''));

for (let i = 0; i < 26; i++) {
  const ch = String.fromCharCode(97 + i); // 'a' ～ 'z'
  if (!letters.has(ch)) {
    console.log(ch);
    break;
  }
}
