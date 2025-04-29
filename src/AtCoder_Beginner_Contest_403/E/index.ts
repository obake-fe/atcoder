import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_403/E/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const Q = Number(lines[0]);
const X = new Set<string>();
const unMatchY = new Set<string>();

for (let i = 1; i <= Q; i++) {
  const [T, S] = lines[i].split(' ');

  if (+T === 1) {
    X.add(S);

    for (const y of unMatchY) {
      if (y.startsWith(S)) {
        unMatchY.delete(y);
      }
    }
  } else {
    const isNewYMatch = [...X.values()].some((x) => S.startsWith(x));

    if (!isNewYMatch) {
      unMatchY.add(S);
    }
  }

  console.log(unMatchY.size);
}
