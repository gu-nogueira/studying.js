//if...else

let temperature = 36.9;
let highTemperature = temperature >= 37.5;
let mediumTemperature = temperature < 37.5 && temperature >= 37; // Podemos transformar as condições do if em variáveis

console.log(highTemperature); // Gera um boolean

if(highTemperature) {
  console.log('Febre alta');
} else if (mediumTemperature) {
  console.log('Febre moderada');
} else {
  console.log('Saudável');
}