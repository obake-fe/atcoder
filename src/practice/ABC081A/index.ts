import { readFileSync } from "fs";

console.log((readFileSync("src/practice/ABC081A/text.txt", "utf8").match(/1/g) || []).length);