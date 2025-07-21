import { readFileSync } from "fs";

const [a, b, c, x] = readFileSync("src/practice/ABC087B/text.txt", "utf8")
  .split(/\n/)
  .map((item) => +item);

// 枚数の組み合わせパターンを挿入する配列を用意する
const patterns = [];

let i = 0;
while (i <= a && x >= i * 500) {
  const A = x - i * 500;
  i++;

  let j = 0;
  while (j <= b && A >= j * 100) {
    const B = A - j * 100;
    j++;

    for (let k = 0; k < c + 1; k++) {
      if (B === k * 50) {
        patterns.push([i, j, k]);
      }
    }
  }
}

console.log(patterns.length);
