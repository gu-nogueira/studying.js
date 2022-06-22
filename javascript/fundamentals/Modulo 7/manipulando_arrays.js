// Manipulando arrays

let techs = ["Javascript", "React", "Laravel"];

// Adicionar um item no fim do array
techs.push("CSS");
// Adicionar no começo
techs.unshift("Illustrator");
// Remover do fim
techs.pop()
// Remover do começo
techs.shift()
// Pegar somente alguns elementos do array
console.log(techs.slice(0, 2))
// remover 1 ou mais itens em qualquer posição do array
techs.splice(1, 2)
// encontrar a posição de um elemento no array
let index = techs.indexOf('CSS');
techs.splice(index, 1);


console.log(techs);