# language: es

Característica: Registro de nuevo usuario
  Como cliente nuevo de ParaBank
  Quiero registrarme en el sistema
  Para acceder a mis servicios bancarios

Escenario: Registro exitoso
  Dado que estoy en la página de registro
  Cuando completo el formulario con datos válidos
  Y presiono el botón "Register"
  Entonces debería ver el mensaje "Your account was created successfully."
