/*
 * Priority Queue
 * 優先度付きキュー（最大ヒープ）の実装
 */
export class MaxHeap {
  private heap: number[] = [];

  push(val: number) {
    let i = this.heap.push(val) - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p] >= val) break;
      this.heap[i] = this.heap[p];
      i = p;
    }
    this.heap[i] = val;
  }

  pop(): number | undefined {
    const h = this.heap;
    if (!h.length) return;
    const top = h[0];
    const last = h.pop()!;
    if (!h.length) return top;

    let i = 0;
    while (i * 2 + 1 < h.length) {
      const a = i * 2 + 1,
        b = i * 2 + 2;
      const max = b < h.length && h[b] > h[a] ? b : a;
      if (h[max] <= last) break;
      h[i] = h[max];
      i = max;
    }
    h[i] = last;
    return top;
  }
}
