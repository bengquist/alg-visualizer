/**
 * Shuffles array in place.
 * @param {Array} arr items An array containing the items.
 */
export function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function swap(arr: unknown[], index1: number, index2: number) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}
