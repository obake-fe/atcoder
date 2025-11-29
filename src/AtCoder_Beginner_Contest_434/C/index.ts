import { readFileSync } from 'fs';
import * as path from 'path';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync(path.join(__dirname, 'text.txt'), 'utf8').trim().split('\n')
  : readFileSync('/dev/stdin', 'utf8').trim().split('\n');

const T = +input[0];
let tempCount = 0;

for (let i = 1; i <= T; i++) {
  let result: boolean = true;
  const [N, H] = input[i + tempCount].split(' ').map(Number);

  let minH: number = H;
  let maxH: number = H;
  let prevT = 0;

  for (let j = 1; j <= N; j++) {
    const [t, l, u] = input[j + tempCount + i].split(' ').map(Number);
    const dt = t - prevT;
    prevT = t;

    const min = minH - dt;
    const max = maxH + dt;

    if (!(max >= l && u >= min)) {
      result = false;
      break;
    }
    minH = Math.max(l, min) > 1 ? Math.max(l, min) : 1;
    maxH = Math.min(u, max);
  }
  tempCount += +N;
  console.log(result ? 'Yes' : 'No');
}
