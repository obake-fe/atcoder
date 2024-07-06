import { readFileSync } from "fs";
import path from "path";

const input = readFileSync(`src/practice/${path.basename(__dirname)}/text.txt`, "utf8")
  .trim()
  .split(/\s/);
const cakes = input.slice(1);

// const array = cakes.filter((cake, index) => {
//   return cakes.indexOf(cake) === index;
// });

// console.log(array?.length);

console.log([...new Set(cakes)].length);
