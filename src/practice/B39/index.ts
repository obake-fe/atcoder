import { readFileSync } from 'fs';
import * as path from 'path';
import { MaxHeap } from '../../lib/priorityQueue';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, D] = lines[0].split(' ').map(Number);
const priorityQueue = new MaxHeap();
let totalEarnedMoney = 0;

// 各日付に対応する仕事の報酬リスト
const tasks: Record<number, number[]> = {};
for (let i = 1; i <= N; i++) {
  const [a, b] = lines[i].split(' ').map(Number);
  if (!tasks[a]) tasks[a] = [];
  tasks[a].push(b);
}

for (let i = 1; i <= D; i++) {
  if (tasks[i]) {
    for (const reward of tasks[i]) {
      priorityQueue.push(reward);
    }
  }

  const maxSalary = priorityQueue.pop() || 0; // 報酬がない場合は0を返す

  totalEarnedMoney += maxSalary;
}

console.log(totalEarnedMoney);
