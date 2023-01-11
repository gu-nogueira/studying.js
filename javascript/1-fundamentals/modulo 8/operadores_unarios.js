/*
  Operadores unários
  -typeof
  -delete
*/

const person = {
  name: 'Gustavo',
  age: '20',
}

delete person.age; // deleta uma propriedade dentro do objeto

console.log(person);