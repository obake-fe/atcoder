import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const S = lines[0];
let t = 0;

for (let i = 1; i <= S.length; i++) {
  const num = S[S.length - i];
  const tOnePlace = t !== 0 ? String(t)[String(t).length - 1] : 0;

  if (+tOnePlace > +num) {
    t += 10 + +num - +tOnePlace;
  } else {
    t += +num - +tOnePlace;
  }
}

t += S.length;

console.log(t);
