import { readFileSync } from "fs";

const input = readFileSync("src/practice/ABC081B/text.txt", "utf8").split(/\n/);
const [times, naturalNumbers] = input;
const naturalNumbersArray: number[] = naturalNumbers.split(/\s/).map(num => +num);


const eachTimesArray = naturalNumbersArray.map((num) => {
    let i = 0;
    while(num % 2 === 0) {
        i++;
        num = num / 2;
    }
    return i;
})

console.log(Math.min(...eachTimesArray));