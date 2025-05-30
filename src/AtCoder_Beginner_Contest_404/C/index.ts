import { readFileSync } from 'fs';
const isLocal = process.env.LOCAL === 'true'; // 環境変数をチェック

const input = isLocal
  ? readFileSync(`src/AtCoder_Beginner_Contest_404/C/text.txt`, 'utf8').trim() // ローカル用
  : readFileSync('/dev/stdin', 'utf8').trim(); // 本番用

const lines = input.split('\n');
const [N, M] = lines[0].split(' ').map(Number);

const edges = lines.map((line, index) => {
  if (index === 0) return []; // 最初の行はスキップ
  const [a, b] = line.split(' ').map(Number);
  return [a, b];
}) as [number, number][];

// 隣接リスト作成
const graph: Map<number, number[]> = new Map();
for (let i = 1; i <= N; i++) {
  graph.set(i, []);
}

for (const [a, b] of edges) {
  graph.get(a)?.push(b);
  graph.get(b)?.push(a); // 無向グラフ
}

// DFS 実行
const visited = new Set<number>();
function dfs(node: number) {
  visited.add(node);
  for (const neighbor of graph.get(node)!) {
    if (!visited.has(neighbor)) {
      dfs(neighbor);
    }
  }
}

dfs(1); // 頂点 1 から開始

const isConnectedGraph = visited.size === N;

const isCycleGraph = () => {
  const isClosed = Array.from(graph.entries()).every(([key, value]) => {
    return value.length === 2;
  });

  return isClosed && isConnectedGraph;
};

console.log(isCycleGraph() ? 'Yes' : 'No');
