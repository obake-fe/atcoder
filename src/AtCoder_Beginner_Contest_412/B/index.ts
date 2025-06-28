import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const [S, T] = input.split('\n');
//正規表現で 文字列が大文字かどうか
const isUpperCase = (str: string) => {
  return /^[A-Z]+$/g.test(str);
};

const targetCharArray: string[] = [];

for (let i = 1; i < S.length; i++) {
  if (isUpperCase(S[i])) {
    targetCharArray.push(S[i - 1]);
  }
}

const isFilled = targetCharArray.every((char) => {
  return T.includes(char);
});

console.log(isFilled ? 'Yes' : 'No');
