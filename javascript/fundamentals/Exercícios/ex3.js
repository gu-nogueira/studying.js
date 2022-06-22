function temperatureConversor(temperature) {
  const celsiusExists = temperature.toUpperCase().includes('C');
  const fahrenheitExists = temperature.toUpperCase().includes('F');

  // Fluxo de erro
  if (!celsiusExists && !fahrenheitExists) {
    throw new Error ('Erro: temperatura inválida!');
  }

  // Fluxo ideal F -> C
  let updatedTemperature = Number(temperature.toUpperCase().replace("F", "")); // replace é uma função para alterar algo dentro da variável de uma coisa para outra na ordem: .replace(uma coisa, outra coisa)
  let formula = (fahrenheit) => {return (fahrenheit - 32) * 5/9}; // Arrow function - OBSERVAÇÃO: caso for utilizar chaves '{}' na arrow function, deve haver um return, caso contrário ela retorna undefined.
  let degreeSign = 'C'; // Variável para concatenar

  // Fluxo alternativo C -> F
  if (celsiusExists) {
    updatedTemperature = Number(temperature.toUpperCase().replace("C", ""));
    formula = (celsius) => {return celsius * 9/5 + 32}; // As arrow functions, quando em expressões simples de uma linha, caso haja apenas 1 parâmetro na function não necessita de '()', e também não é necessário '{}' com return.
    degreeSign = 'F';
  }

  return formula(updatedTemperature).toFixed(1) + degreeSign;
};

try {
  console.log(temperatureConversor('67f'));
} catch (e) {
  console.log(e.message); //o .message envia somente a mensagem do throw, e não o debug inteiro.
}

