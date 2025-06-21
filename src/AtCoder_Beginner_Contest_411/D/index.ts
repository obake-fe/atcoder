import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, Q] = lines[0].split(' ').map(Number);
const pcs = [...Array(N)].fill('');
let server = '';

for (let i = 0; i < Q; i++) {
  const query = lines[i + 1];
  const [no, ...q] = query.split(' ');

  if (no === '1') {
    const [p, c] = q;
    pcs[Number(p) - 1] = server;
  } else if (no === '2') {
    const [p, c] = q;
    pcs[Number(p) - 1] += c;
  } else if (no === '3') {
    const [p, c] = q;
    server = pcs[Number(p) - 1];
  }
}

console.log(server);
