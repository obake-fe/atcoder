import { readFileSync } from 'fs';
import * as path from 'path';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, Q] = lines[0].split(' ').map(Number);
const A = lines[1].split(' ').map(Number);
// const list = [...Array(N)].fill(true);
const answers: number[] = [];
//
// type RLEntry<T> = [T, number];
// export const runLengthEncodeArray = <T>(arr: T[]): RLEntry<T>[] => {
//   if (arr.length === 0) return [];
//
//   const result: RLEntry<T>[] = [];
//   let prev = arr[0];
//   let count = 1;
//
//   for (let i = 1; i < arr.length; i++) {
//     if (Object.is(arr[i], prev)) {
//       count++;
//     } else {
//       result.push([prev, count]);
//       prev = arr[i];
//       count = 1;
//     }
//   }
//
//   result.push([prev, count]);
//   return result;
// };
//
// for (const value of A) {
//   list[value - 1] = !list[value - 1];
//   const _runLengthEncodeArray = runLengthEncodeArray(list);
//   const count = _runLengthEncodeArray.filter(([value]) => !value).length;
//
//   answers.push(count);
// }
//
// console.log(answers.join('\n'));

const mySet = new Set<number>();
let count = 0;

for (const value of A) {
  if (!mySet.has(value)) {
    mySet.add(value);

    if (!mySet.has(value - 1) && !mySet.has(value + 1)) {
      count++;
    }

    if (mySet.has(value - 1) && mySet.has(value + 1)) {
      count--;
    }
  } else {
    mySet.delete(value);

    if (mySet.has(value - 1) && mySet.has(value + 1)) {
      count++;
    }

    if (!mySet.has(value - 1) && !mySet.has(value + 1)) {
      count--;
    }
  }

  answers.push(count);
}
console.log(answers.join('\n'));
