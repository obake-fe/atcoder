/**
 * @description グラフの隣接リストを生成する関数
 * @param N
 * @param edges
 */
export const generateAdjacencyList = (
  N: number,
  edges: [number, number][],
): Map<number, number[]> => {
  const graph: Map<number, number[]> = new Map();
  for (let i = 1; i <= N; i++) {
    graph.set(i, []);
  }

  for (const [a, b] of edges) {
    graph.get(a)?.push(b);
    graph.get(b)?.push(a); // 無向グラフ
  }

  return graph;
};

/**
 * @description グラフが連結かどうかを判定する関数
 * @param N
 * @param adjacencyList
 */
export const isConnectedGraph = (N: number, adjacencyList: Map<number, number[]>): boolean => {
  // DFS 実行（Depth First Search: 深さ優先探索）
  const visited = new Set<number>();
  const dfs = (node: number) => {
    visited.add(node);
    for (const neighbor of adjacencyList.get(node)!) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  };

  dfs(1); // 頂点 1 から開始

  return visited.size === N;
};
