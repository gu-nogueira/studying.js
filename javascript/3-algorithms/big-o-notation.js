// ** Big O Notation

// ** O(1) - Constant
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// ** O(n) - Linear
function reverseString(string) {
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString;
}

// ** O(n^2) - Quadratic
function printAllPairs(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i], array[j]);
    }
  }
}

// ** O(2^n) - Exponential
function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// ** O(log(n)) - Logarithmic
function binarySearch(array, target) {
  let start = 0;
  let end = array.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (array[middle] !== target && start <= end) {
    if (target < array[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  if (array[middle] === target) {
    return middle;
  }
  return -1;
}

// ** O (n * log(n)) - Log Linear
function binarySearchLog(array, target) {
  let start = 0;
  let end = array.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (array[middle] !== target && start <= end) {
    if (target < array[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  if (array[middle] === target) {
    return middle;
  }
  return -1;
}
