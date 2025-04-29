JavaScript / TypeScript の `Map` は、

> 🔑**キーと値のペア**を保持する「連想配列」のようなコレクション

です。

---

## 🎯 `Map` の特徴（普通のオブジェクトと違う点）

| 特徴 | 説明 |
|------|------|
| 任意の値をキーにできる | オブジェクト `{}` は文字列 or symbol だけがキーになるが、`Map` は **オブジェクト・配列・数値など**何でもOK |
| 順序を保持 | 挿入順を記憶する（for...of で順番通りに取り出せる） |
| サイズ取得が簡単 | `.size` プロパティで要素数がすぐわかる |
| 専用のメソッドが豊富 | `set`, `get`, `has`, `delete`, `clear`, `forEach` など直感的なAPIがある |

---

## 🧪 基本的な使い方（TypeScript）

```ts
// 作成
const map = new Map<string, number>();

// 追加
map.set('apple', 3);
map.set('banana', 5);

// 取得
console.log(map.get('apple')); // 3

// 存在確認
console.log(map.has('banana')); // true

// 削除
map.delete('apple');

// 全削除
map.clear();

// サイズ
console.log(map.size); // 0（全部消したので）
```

---

## 🔁 ループ処理

```ts
for (const [key, value] of map) {
  console.log(`${key} = ${value}`);
}
```

---

## 📦 オブジェクトとの違い（比較）

| 比較 | オブジェクト `{}` | Map |
|------|------------------|-----|
| キー | 文字列 or symbol | **任意の型OK** |
| 順序 | 保証なし | **挿入順を保持** |
| サイズ取得 | `Object.keys(obj).length` | `.size` |
| 用途 | シンプルな連想配列 | **高機能なキー付きコレクション** |

---

## 📌 典型的な用途

- 要素数のカウント（frequency map）
- キャッシュ構造
- 双方向の対応表（Map<key, value>）

---

## 🧠 よくあるケース：出現回数のカウント

```ts
const arr = [1, 2, 2, 3, 3, 3];
const countMap = new Map<number, number>();

for (const num of arr) {
  countMap.set(num, (countMap.get(num) || 0) + 1);
}
```

---

「`Map` で何ができるの？」という疑問に対しては、

> 「**キー付きの配列っぽいもの**で、より柔軟にデータ管理できるコレクション」

と覚えるとよいです！

---

Mapの応用パターン（ネスト、ソート、初期化）なども必要なら教えますよ。何か使いたい場面がありますか？