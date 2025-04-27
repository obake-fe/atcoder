import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_403/C/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M, Q] = lines[0].split(' ').map(Number);

// ユーザーごとの権限セット
const permissions = Array.from({ length: N + 1 }, () => new Set<number>());
const allAccess = Array(N + 1).fill(false);

const results: string[] = [];

for (let i = 1; i <= Q; i++) {
  const [type, X, Y] = lines[i].split(' ').map(Number);

  if (type === 1) {
    permissions[X].add(Y);
  } else if (type === 2) {
    // for (let page = 1; page <= M; page++) {
    //   permissions[X].add(page);
    // }

    allAccess[X] = true;
  } else if (type === 3) {
    results.push(permissions[X].has(Y) || allAccess[X] ? 'Yes' : 'No');
  }
}

console.log(results.join('\n'));
