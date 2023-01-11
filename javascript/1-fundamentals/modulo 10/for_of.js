// for...of
// Serve tanto para STRINGS quanto para ARRAYS

let name = 'Gustavo';
let names = ['João', 'Paulo', 'Pedro'];

for (let char of name) {
  console.log(char)
}
/*
No exemplo acima, a variável char pega cada caractere da variável name e vai imprimindo.
*/
for (let name of names) {
  console.log(name)
}
console.log(names);
/*
Nesse caso, irá atribuir o nome de cada posição que há no array names.
Detalhe: o for of não estraga a variável que está sendo retirado valores.
*/

