export const checkAlphabet = () => {
  for (let i = 0; i < 26; i++) {
    const ch = String.fromCharCode(97 + i); // 'a' ～ 'z'
  }
};

export const alphabets = [...Array(26)].map((_, b) => (10 + b).toString(36));
