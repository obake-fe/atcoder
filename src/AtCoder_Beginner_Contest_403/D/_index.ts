import { readFileSync } from 'fs';

// 入力読み込み
const input = readFileSync('/dev/stdin', 'utf8').trim().split('\n');
const [N, D] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

// NOTE: 貪欲法に基づいた考え方
if (D === 0) {
  // D = 0 のときは「重複をすべて削除する」
  const unique = new Set(A);
  const result = A.length - unique.size;
  console.log(result);
} else {
  // 要素を数えてソート
  const countMap = new Map<number, number>();
  for (const num of A) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  const sortedKeys = [...countMap.keys()].sort((a, b) => a - b);
  const visited = new Set<number>();
  let result = 0;

  for (const x of sortedKeys) {
    if (visited.has(x)) {
      // この数は使えないので全部削除
      result += countMap.get(x) ?? 0;
    } else {
      // 1個だけ使って、他は削除
      const count = countMap.get(x) ?? 0;
      result += count - 1;
      visited.add(x + D);
      visited.add(x - D);
    }
  }

  console.log(result);
}
