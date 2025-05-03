import { readFileSync } from 'fs';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync('src/AtCoder_Beginner_Contest_403/E/text.txt', 'utf8').trim()
  : readFileSync('/dev/stdin', 'utf8').trim();

const lines = input.split('\n');
const Q = Number(lines[0]);

class YTrieNode {
  children = new Map<string, YTrieNode>();
  wordCount = 0; // このノードで終わる文字列の数
}

class YTrie {
  root = new YTrieNode();
  totalWords = 0;

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new YTrieNode());
      }
      node = node.children.get(char)!;
    }
    node.wordCount++;
    this.totalWords++;
  }

  // DFSで、prefix から始まる全ての末端 wordCount を合計して削除
  deleteWordsWithPrefix(prefix: string) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return; // 該当なし
      node = node.children.get(char)!;
    }
    const removed = this._dfsDelete(node);
    this.totalWords -= removed;
  }

  private _dfsDelete(node: YTrieNode): number {
    let removed = node.wordCount;
    node.wordCount = 0;

    for (const child of node.children.values()) {
      removed += this._dfsDelete(child);
    }
    return removed;
  }
}

const xSet = new Set<string>(); // 重複登録防止
const yTrie = new YTrie();
const output: number[] = [];

for (let i = 1; i <= Q; i++) {
  const [T, S] = lines[i].split(' ');
  const type = Number(T);

  if (type === 1) {
    if (!xSet.has(S)) {
      xSet.add(S);
      yTrie.deleteWordsWithPrefix(S);
    }
  } else {
    // T = 2
    // 今の X のどれかが prefix なら追加しない（時間節約のため先にチェック）
    let hasPrefix = false;
    for (const x of xSet) {
      if (S.startsWith(x)) {
        hasPrefix = true;
        break;
      }
    }
    if (!hasPrefix) {
      yTrie.insert(S);
    }
  }

  output.push(yTrie.totalWords);
}

console.log(output.join('\n'));
