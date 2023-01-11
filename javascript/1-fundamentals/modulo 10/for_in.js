// For...in
// Cria um LOOP em cima de um OBJETO, pegando as PROPRIEDADES dele.

let person = {
  name: 'Gustavo',
  age: 20,
  sex: 'male',
  weight: 61.5
}

for (let property in person) {
  console.log(property);
  console.log(person[property]) // Esta é uma forma de acessar a propriedade, não com ponto (.)
}                               // Exemplo: person["name"] --> Acessaria a propriedade NAME