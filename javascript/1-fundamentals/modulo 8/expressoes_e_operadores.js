/* Expressões e operadores

-Expressions
Explicação: Qualquer linha de código que justifica uma operação.

-exemplo:
*/
let number = 1;

// exemplo de situação onde o ponte e vírgula seria necessário no javascript

(function() {console.log('alo')})() // esta é uma expressão de uma função auto-executável
/*
-Operators
  Binary
*/
console.log(number + 1);
/*
  Unary
*/
console.log(++number);
/*
  Ternary
*/
console.log(false ? 'verdadeiro' : 'falso');

// Condição ? se sim : se não