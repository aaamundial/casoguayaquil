# language: es
Característica: Inicio de sesión
  Como cliente registrado
  Quiero iniciar sesión
  Para acceder a mi cuenta bancaria

Escenario: Login exitoso
  Dado que estoy en la página de login
  Cuando ingreso credenciales válidas
  Y presiono el botón "Log In"
  Entonces debería ver el mensaje "Accounts Overview"
