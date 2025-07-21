import { readFileSync } from "fs";
import path from "path";

let input = readFileSync(`src/practice/${path.basename(__dirname)}/text.txt`, "utf8").trim();
const DREAM = "dream";
const DREAMER = "dreamer";
const ERASE = "erase";
const ERASER = "eraser";

while (input.length >= 5) {
  if (input.endsWith(DREAM)) {
    input = input.slice(0, -5);
  } else if (input.endsWith(ERASE)) {
    input = input.slice(0, -5);
  } else if (input.endsWith(ERASER)) {
    input = input.slice(0, -6);
  } else if (input.endsWith(DREAMER)) {
    input = input.slice(0, -7);
  } else {
    input = "a";
  }
}

console.log(input.length === 0 ? "YES" : "NO");
