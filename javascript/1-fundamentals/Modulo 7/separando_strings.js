let phrase = "Sasha a xuxa fez xixi no chão";
let myArray = phrase.split(" "); // A função split separa os espaços do array de acordo com aquilo que for passado de argumento
console.log(myArray);
let phraseWithUnderscore = myArray.join("_"); // O método join insere aquilo que for passado de argumento entre os espaços do array
console.log(phraseWithUnderscore.toUpperCase());