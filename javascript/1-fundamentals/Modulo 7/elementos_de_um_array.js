//Manipulando arrays

console.log(["a", "b", "c"]);
console.log([
  "a",
  { type: "array" },
  () => {
    // é possível até mesmo uma função dentro de um array, pois também é um tipo de dado!!!
    return "alô!";
  }
][2]()); //Nessa linha, nós fechamos a declaração do array no primeiro ']', depois declaramos qual posição do arrayqueremos com '[2]' e por fim executamos  a função que está neste array com '()'