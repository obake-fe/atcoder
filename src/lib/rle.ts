type RLEntry<T> = [T, number];

export const runLengthEncodeArray = <T>(arr: T[]): RLEntry<T>[] => {
  if (arr.length === 0) return [];

  const result: RLEntry<T>[] = [];
  let prev = arr[0];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (Object.is(arr[i], prev)) {
      count++;
    } else {
      result.push([prev, count]);
      prev = arr[i];
      count = 1;
    }
  }

  result.push([prev, count]);
  return result;
};

export const runLengthDecodeArray = <T>(rle: RLEntry<T>[]): T[] => {
  const result: T[] = [];

  for (const [value, count] of rle) {
    for (let i = 0; i < count; i++) {
      result.push(value);
    }
  }

  return result;
};
