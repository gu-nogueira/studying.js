class Sorts {
  constructor(initialArr) {
    this.arr = initialArr || [];
  }

  bubbleSort() {
    const length = this.arr.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1; j++) {
        if (this.arr[j] > this.arr[j + 1]) {
          const temp = this.arr[j];
          this.arr[j] = this.arr[j + 1];
          this.arr[j + 1] = temp;
        }
      }
    }
  }

  selectionSort() {
    const length = this.arr.length;
    for (let i = 0; i < length; i++) {
      let min = i;
      for (let j = i + 1; j < length; j++) {
        if (this.arr[min] > this.arr[j]) {
          min = j;
        }
      }
      if (min !== i) {
        const temp = this.arr[i];
        this.arr[i] = this.arr[min];
        this.arr[min] = temp;
      }
    }
  }

  insertionSort() {
    const length = this.arr.length;
    for (let i = 1; i < length; i++) {
      let temp = this.arr[i];
      let j = i - 1;
      while (j >= 0 && this.arr[j] > temp) {
        this.arr[j + 1] = this.arr[j];
        j--;
      }
      this.arr[j + 1] = temp;
    }
  }

  mergeSort() {
    const merge = (left, right) => {
      const result = [];
      let indexLeft = 0;
      let indexRight = 0;

      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
          result.push(left[indexLeft]);
          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
        }
      }

      return result
        .concat(left.slice(indexLeft))
        .concat(right.slice(indexRight));
    };

    const mergeSortRec = (array) => {
      const length = array.length;
      if (length === 1) {
        return array;
      }

      const mid = Math.floor(length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid, length);

      return merge(mergeSortRec(left), mergeSortRec(right));
    };

    this.arr = this.mergeSortRec(this.arr);
  }
}

const sorts = new Sorts([5, 4, 3, 2, 1]);

console.time('bubbleSort');
sorts.bubbleSort();
console.log(sorts.arr);
console.timeEnd('bubbleSort');

// console.time('selectionSort');
// sorts.selectionSort();
// console.log(sorts.arr);
// console.timeEnd('selectionSort');
