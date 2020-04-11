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

export function swap(arr: number[], index1: number, index2: number) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

// best case: n
// worst case: n^2
// pros: easy to understand/implementt, performs well when array is almost sorted
// cons: very expensive during worst and average case, more swaps compared to selection sort
export function bubbleSort(arr: number[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let swapped = false;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
      }
    }

    if (!swapped) return arr;
  }

  return arr;
}

// best case: n^2
// worst case: n^2
// pros: less swap compared to bubble sort
// cons: expensive
export function selectionSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (i !== minIndex) swap(arr, i, minIndex);
  }

  return arr;
}
