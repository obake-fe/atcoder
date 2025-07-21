import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n') // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n'); // 本番用
