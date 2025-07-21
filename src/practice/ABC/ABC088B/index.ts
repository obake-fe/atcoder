import { readFileSync } from "fs";
import path from "path";

const input = readFileSync(`src/practice/${path.basename(__dirname)}/text.txt`, "utf8");
const [n, tmpArray] = input.split(/\n/);
const array = tmpArray.split(/\s/);

let alice = 0;
let bob = 0;

for (let i = 1; i <= +n; i++) {
  const max = Math.max(...array.map((item) => +item));
  const index = array.findIndex((item) => +item === max);
  array.splice(index, 1);

  if (i % 2) {
    alice += max;
  } else {
    bob += max;
  }
}

console.log(alice - bob);
