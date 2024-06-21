import { readFileSync } from "fs";

// 正規表現 \s は改行もマッチする
const input = readFileSync("src/practice/ABC081B/text.txt", "utf8").split(/\s/);
const naturalNumbersArray: number[] = input.slice(1).map(num => +num);


const eachTimesArray = naturalNumbersArray.map((num) => {
    let i = 0;
    while(num % 2 === 0) {
        i++;
        num = num / 2;
    }
    return i;
})

console.log(Math.min(...eachTimesArray));