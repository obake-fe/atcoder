import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const N = Number(lines[0]);
const P = lines[1].split(' ').map(Number);

const comparedArray = P.map((p, index) => {
  if (index === N - 1) return false; // 最後の要素は比較しない
  return p < P[index + 1];
});
comparedArray.pop(); // 最後の要素を削除

type RLEntry<T> = [T, number];

export const runLengthEncodeArray = <T>(arr: T[]): RLEntry<T>[] => {
  if (arr.length === 0) return [];

  const result: RLEntry<T>[] = [];
  let prev = arr[0];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (Object.is(arr[i], prev)) {
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

const rle = runLengthEncodeArray(comparedArray);

let result = 0;

for (let i = 1; i < rle.length - 1; i++) {
  const [midChar, midLen] = rle[i];
  if (midChar) continue;

  const [leftChar, leftLen] = rle[i - 1];
  const [rightChar, rightLen] = rle[i + 1];

  if (leftChar && rightChar) {
    result += leftLen * rightLen;
  }
}

console.log(result);
