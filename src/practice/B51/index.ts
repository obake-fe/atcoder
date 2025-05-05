import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/practice/B51/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const stack: number[] = [];
const ans: number[][] = [];

for (let i = 0; i < input.length; i++) {
  if (input[i] === '(') {
    stack.push(i);
  } else {
    ans.push([stack[stack.length - 1] + 1, i + 1]);

    stack.pop();
  }
}

console.log(...ans);
