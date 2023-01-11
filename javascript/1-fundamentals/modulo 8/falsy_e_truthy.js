/*
  FALSY = Quando um valor é considerado FALSO em contextos onde um booleano é obrigatório (condicionais e loops)

  false
  0
  -0
  ""
  null
  undefined
  NaN
*/

console.log( 0 ? 'verdadeiro' : 'falso' );

/*
  TRUTHY = Quando um valor é considerado VERDADEIRO em contextos onde um booleano é obrigatório (condicionais e loops)

  true
  {}
  []
  1
  3.23
  "0"
  "false"
  -1
  Infinity
  -Infinity
*/

console.log ( "false" ? 'verdadeiro' : 'falso' );
