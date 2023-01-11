// throw

function sayMyName(name = '') {
  if (name === '') {
    // throw new Error("Nome é necessário"); // Esse é o padrão do uso do throw, mas pode ser usado em outras situações
    throw 'Erro: Nome é obrigatório';
  }
  console.log(name);
}

// sayMyName();


// try...catch - maneira de capturar erros

try {
  sayMyName('Gustavo');
} catch (e) {
  console.log(e);
}

console.log('após a função de erro');
