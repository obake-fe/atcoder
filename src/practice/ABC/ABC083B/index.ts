import { readFileSync } from "fs";
import path from "path";

const [n, a, b] = readFileSync(`src/practice/${path.basename(__dirname)}/text.txt`, "utf8").split(
  /\s/,
);

let result = 0;

for (let i = 1; i <= +n; i++) {
  const numberArray = [...String(i)].map((item) => +item);
  const sum = numberArray.reduce((tmpSum, currentValue) => tmpSum + currentValue, 0);
  if (+a <= sum && sum <= +b) {
    result += i;
  }
}

console.log(result);
