import { readFileSync } from "fs";
import path from "path";

const [N, Y] = readFileSync(`src/practice/${path.basename(__dirname)}/text.txt`, "utf8").split(
  /\s/,
);

const array = [];

for (let x = 0; x <= +N; x++) {
  for (let y = 0; y <= +N - x; y++) {
    const z = +N - x - y;
    if (x * 10000 + y * 5000 + z * 1000 === +Y) {
      array.push([x, y, z]);
    }
  }
}

console.log(array.length !== 0 ? `${array[0][0]} ${array[0][1]} ${array[0][2]}` : "-1 -1 -1");
