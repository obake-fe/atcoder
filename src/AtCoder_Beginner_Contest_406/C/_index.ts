import { readFileSync } from 'fs';
import * as path from 'path';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim()
  : readFileSync('/dev/stdin', 'utf8').trim();

const lines = input.split('\n');
const N = Number(lines[0]);
const P = lines[1].split(' ').map(Number);

// 1. S を構築（大小関係を文字列に）
const S: string[] = [];
for (let i = 0; i < N - 1; i++) {
  S.push(P[i] < P[i + 1] ? '<' : '>');
}

// 2. ランレングス圧縮（記号と回数のペアに）
type RLEntry = [string, number];
const runLengthEncode = (arr: string[]): RLEntry[] => {
  const result: RLEntry[] = [];
  let prev = arr[0];
  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === prev) {
      count++;
    } else {
      result.push([prev, count]);
      prev = arr[i];
      count = 1;
    }
  }
  result.push([prev, count]);
  return result;
};

const rle = runLengthEncode(S);

// 3. 真ん中の '>' を固定して a*b を計算
let result = 0;

for (let i = 1; i < rle.length - 1; i++) {
  const [midChar, midLen] = rle[i];
  if (midChar !== '>') continue;

  const [leftChar, leftLen] = rle[i - 1];
  const [rightChar, rightLen] = rle[i + 1];

  if (leftChar === '<' && rightChar === '<') {
    result += leftLen * rightLen;
  }
}

console.log(result);
