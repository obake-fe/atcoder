import { readFileSync } from "fs";

// inputに入力データ全体が入る
function Main(input: string) {
  // 1行目がinput[0], 2行目がinput[1], …に入る
  const removeLine = input.split("\n");
  const tmp = removeLine[1].split(" ");
  //文字列から10進数に変換するときはparseIntを使います
  const a = parseInt(removeLine[0], 10);
  const b = parseInt(tmp[0], 10);
  const c = parseInt(tmp[1], 10);
  const s = removeLine[2];
  //出力
  console.log("%d %s", a + b + c, s);
}
//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
Main(readFileSync("./src/practice/PracticeA/text.txt", "utf8"));
