class Searchers {
  constructor(initialArr, searchValue) {
    this.arr = initialArr || [];
    this.searchValue = searchValue;
  }

  linearSearch() {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i] === this.searchValue) {
        return i;
      }
    }
    return -1;
  }

  binarySearch() {
    let start = 0;
    let end = this.arr.length - 1;
    let middle = Math.floor((start + end) / 2);

    while (this.arr[middle] !== this.searchValue && start <= end) {
      if (this.searchValue < this.arr[middle]) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      middle = Math.floor((start + end) / 2);
    }

    return this.arr[middle] === this.searchValue ? middle : -1;
  }

  naiveStringSearch(long, short) {
    let count = 0;
    for (let i = 0; i < long.length; i++) {
      for (let j = 0; j < short.length; j++) {
        if (short[j] !== long[i + j]) break;
        if (j === short.length - 1) count++;
      }
    }
    return count;
  }

  kmpSearch(long, short) {
    if (short.length > long.length) return -1;
    const table = this.buildTable(short);
    let i = 0;
    let j = 0;
    while (i < long.length) {
      if (long[i] === short[j]) {
        if (j === short.length - 1) return i - j;
        i++;
        j++;
      } else if (j > 0) {
        j = table[j - 1];
      } else {
        i++;
      }
    }
    return -1;
  }
}

const searchers = new Searchers([1, 2, 3, 4, 5, 6], 4);

console.time('linearSearch');
searchers.linearSearch();
console.log(searchers.arr);
console.timeEnd('linearSearch');
