function noteCalculator(score) {
  let finalScore;
    if (score >= 90 && score <= 100) {
      finalScore = 'A';
    } else  if (score >= 80 && score <= 89) {
      finalScore = 'B';
    } else  if (score >= 70 && score <= 79) {
      finalScore = 'C';
    } else  if (score >= 60 && score <= 69) {
      finalScore = 'D';
    } else  if (score >= 0 && score < 60) {
      finalScore = 'F';
    } else { 
      throw ("Valor inválido");
  }
  return finalScore;
}

try {
  console.log(noteCalculator(100));
} catch (e) {
  console.log(e);
}