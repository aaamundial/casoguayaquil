# language: es
Característica: Transferencia de fondos
  Como cliente autenticado
  Quiero transferir dinero entre mis cuentas
  Para mover mis fondos

Escenario: Transferencia exitosa
  Dado que estoy logueado con usuario válido
  Y deposito $200 en la cuenta actual
  Y tengo al menos $50 en la cuenta actual
  Cuando transfiero $50 de la cuenta actual a otra cuenta
  Entonces el saldo de la cuenta actual disminuye en $50
  Y el saldo de la otra cuenta aumenta en $50