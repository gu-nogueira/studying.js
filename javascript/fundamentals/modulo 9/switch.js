let expression = 'c';

switch (expression) {
  case 'a':
    console.log('A letra é a')
    break;
  case 'b':
    console.log('A letra é b')
    break;
  default:
    console.log('Default')
    break;
}

function calculate(n1, operator, n2) {
  let res;
  switch (operator) {
    case '+':
      res = n1 + n2;
      break;
    case '-':
      res = n1 - n2;
      break;
    case '*':
      res = n1 * n2;
      break;
    case '/':
      res = n1 / n2;
      break;
    default:
      console.log('Nenhuma operação válida atribuida.');
  }
  return res;
}

console.log(calculate(3, '+', 5));