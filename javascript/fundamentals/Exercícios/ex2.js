let family = {
  incomes: [2500, 3200, 250.15, 360.45],
  expenses: [320.34, 250.12, 1000, 1450.00]
}

function recipeCalculator(incomes, expenses) {
  let balance = 0;
  for (let value of incomes) {
    balance += value;
  }
  for (let value of expenses) {
    balance -= value;
  }
  verifyBalance(balance);
  return 'R$ '+ balance.toFixed(2); // Deixa o número com 2 casas depois da vírgula;
};

function verifyBalance(balance) {
  if (balance >= 0) {
    console.log('Saldo positivo.')
  } else {
    console.log('Saldo negativo.');
  }
}

const { incomes, expenses } = family;
console.log(recipeCalculator(incomes, expenses))