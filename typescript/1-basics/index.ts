import * as _ from 'lodash';

async function main() {
  let number: number;
  number = '123';
  number = 123;
}

main();

function Types() {
  // * Strongly typed
  type Style = 'bold' | 'italic' | 'norma';
  let font: Style;
  font = 'something';

  // * Typing with interfaces

  interface Person {
    first: string;
    last: string;
    [key: string]: any; // [key: string] is an index signature
  }

  const person1: Person = {
    first: 'John',
    last: 'Doe',
  };

  const person2: Person = {
    first: 'John',
    last: 'Doe',
    random: true,
  };

  // * Typing with functions

  function pow(
    x: number,
    y: number
  ): string /* Forces typed return. Avoid side-effects */ {
    return Math.pow(x, y).toString();
  }

  // * :void is used when a function doesn't return anything

  pow(2, 3);

  // * Arrays

  const arr: number[] = [];
  // const arr: Person[] = []; ---> Nice array of objects intellesense

  arr.push(1);
  arr.push('2');
  arr.push(true);

  // * Typing with tuples
  type MyList = [number?, string?, boolean?]; // ? means optiona

  const arr2: MyList = [];

  arr2.push(1);
  arr2.push('2');
  arr2.push(true);

  // * Generics

  class Observable<T> {
    constructor(public value: T) {}
  }

  let x: Observable<number>; // * Allows to define the type of the value
  let y: Observable<Person>;
  let z = new Observable(23);
}
