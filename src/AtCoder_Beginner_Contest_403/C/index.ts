import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_403/C/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M] = lines[0].split(' ').map(Number);
const _mArray = [...Array(M)].map((_, i) => [i + 1, false]);
const mStatusObj = Object.fromEntries(_mArray);

const _NArray = [...Array(N)].map((_, i) => [i + 1, { ...mStatusObj }]);
const permission = Object.fromEntries(_NArray);

lines.forEach((line, index) => {
  if (index === 0) {
    return;
  }

  const [type, X, Y] = line.split(' ').map(Number);

  if (type === 1) {
    permission[X][Y] = true;
  } else if (type === 2) {
    [...Array(M)].forEach((_, i) => {
      permission[X][i + 1] = true;
    });
  } else if (type === 3) {
    console.log(permission[X][Y] ? 'Yes' : 'No');
  }
});
