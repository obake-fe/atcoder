import { readFileSync } from 'fs';

const isLocal = process.env.LOCAL === 'true';
const input = isLocal
  ? readFileSync('src/AtCoder_Beginner_Contest_403/E/text.txt', 'utf8').trim()
  : readFileSync('/dev/stdin', 'utf8').trim();

function Main() {
  const _input = input.trim().split('\n');
  const Q = Number(_input[0]);
  const ans = [];

  // 現在までの Y 文字列総数（インデックス用）
  let Ytotal = 0;
  // 無効化された Y インデックスの数
  let ZinvalidCount = 0;
  // 無効化フラグ配列（1-based）
  const Zinvalid = [false];

  // Trie のノード構造
  class TNode {
    children: { [key: string]: TNode }; // 子ノード
    f: boolean; // X 側の終端
    Z: number[]; // このノードを通過した未確認の Y のインデックス一覧

    constructor() {
      this.children = {}; // next child map
      this.f = false; // X に完全一致で登録済みなら true
      this.Z = []; // このノードを通過した未確認の Y のインデックス一覧
    }
  }
  const root = new TNode();

  // クエリ1: X に追加
  function insertX(s: string) {
    let node = root;
    for (const ch of s) {
      if (!(ch in node.children)) {
        node.children[ch] = new TNode();
      }
      node = node.children[ch];
    }
    // そのノード v にたまっている Y インデックスをすべて「無効化」する
    for (const idx of node.Z) {
      if (!Zinvalid[idx]) {
        Zinvalid[idx] = true;
        ZinvalidCount++;
      }
    }
    node.Z.length = 0; // Z_v をクリア
    node.f = true; // このノードは X 側の終端
  }

  // クエリ2: Y に追加
  function insertY(s: string) {
    Ytotal++;
    Zinvalid[Ytotal] = false; // 最初は有効
    let node = root;
    for (const ch of s) {
      if (!(ch in node.children)) {
        node.children[ch] = new TNode();
      }
      node = node.children[ch];
      // この文字で通過する Ytotal 番目の文字列を登録
      node.Z.push(Ytotal);
      // もしこのノード f_v が true なら，即無効化
      if (node.f && !Zinvalid[Ytotal]) {
        Zinvalid[Ytotal] = true;
        ZinvalidCount++;
      }
    }
  }

  // 全クエリ処理
  for (let i = 1; i <= Q; i++) {
    const [t, s] = _input[i].split(' ');
    if (t === '1') {
      insertX(s);
    } else {
      insertY(s);
    }
    // 有効な Y の個数 = 総 Y 数 − 無効化された数
    ans.push(Ytotal - ZinvalidCount);
  }

  console.log(ans.join('\n'));
}

// 入力読み込み
Main();
