# language: es
Característica: Retiro de fondos
  Como cliente autenticado
  Quiero retirar dinero de mi cuenta
  Para disponer de mis fondos

Escenario: Retiro exitoso
  Dado que estoy logueado con usuario válido
  Y deposito $2500 en la cuenta actual
  Y tengo al menos $100 en la cuenta actual
  Cuando retiro $100 de la cuenta actual
  Entonces el saldo de la cuenta actual disminuye en $100