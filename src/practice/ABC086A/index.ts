import { readFileSync } from "fs";

const [a, b] = readFileSync("./src/practice/ABC086A/text.txt", "utf8").split(/\s/);
console.log((+a) * (+b) % 2 === 0 ? 'Even' : 'Odd');