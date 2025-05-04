/*
 * @description グラフが連結かどうかを判定する関数
 */
export const isConnectedGraph = (N: number, M: number, edges: [number, number][]): boolean => {
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

  return visited.size === N;
};
