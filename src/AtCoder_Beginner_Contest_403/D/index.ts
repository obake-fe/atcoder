import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_403/D/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, D] = lines[0].split(' ').map(Number);
const A = lines[1].split(' ').map(Number);

const oddA = A.filter((a) => a % 2 === 1);
const evenA = A.filter((a) => a % 2 === 0);

let count = 0;

if (D % 2 === 0) {
  oddA.forEach((a) => {
    oddA.forEach((b) => {
      if (Math.abs(a + b) === D || Math.abs(a - b) === D) {
        count++;
      }
    });
  });

  evenA.forEach((a) => {
    evenA.forEach((b) => {
      if (Math.abs(a + b) === D || Math.abs(a - b) === D) {
        count++;
      }
    });
  });
} else {
  oddA.forEach((a) => {
    return evenA.forEach((b) => {
      if (Math.abs(a + b) === D || Math.abs(a - b) === D) {
        count++;
      }
    });
  });
}

console.log(count / 2);
