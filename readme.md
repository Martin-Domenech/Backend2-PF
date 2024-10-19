# 🛒 E-Commerce Backend API

Este proyecto es una API para la gestión de un e-commerce desarrollado con **Node.js**, **Express**, **MongoDB**, **Mongoose**, **Handlebars** , **JWT** para autenticación, y **Nodemailer** para notificaciones por correo electrónico. Permite a los usuarios gestionar carritos de compra, productos, y realizar compras generando tickets.

## 📝 Notas

- **Prueba de registro de usuarios**: En el formulario de registro de usuario, esta la opcion de elegir el rol de administrador, esto si bien en la practica no tiene mucho sentido, esta pensado para quien quiera probar el proyecto, tenga acceso al rol de usuario y el de administrador.
- **Recomendacion**: Es recomendable registrarse con un email al cual tenga acceso ya que al finalizar el proceso de compra se manda un mail automaticamente con los detalles de la compra.


## 🚀 Características


- **Gestión de productos**: Los administradores podran agregar productos, editarlos o eliminarlos, segun lo deseen.
- **Gestión de carritos de compra**: Los usuarios pueden agregar y eliminar productos de sus carritos.
- **Compra y generación de tickets**: Los usuarios pueden realizar compras y recibir un ticket con los detalles de la transacción via email.
- **Autenticación con JWT**: Implementa un sistema de autenticación segura mediante **JSON Web Tokens (JWT)**.
- **Notificaciones por correo electrónico**: Los usuarios reciben un correo de confirmación tras realizar una compra utilizando **Nodemailer**.
- **Manejo de errores**: Mensajes de error claros para ayudar a depurar problemas durante las operaciones de la API.
- **Base de datos MongoDB**: Almacena información sobre usuarios, carritos y tickets.

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB** (con **Mongoose**)
- **Handlebars** 
- **Passport.js** para la autenticación (con **JWT**)
- **Nodemailer** para el envío de correos electrónicos
- **UUID** para generar códigos de ticket únicos
- **Fetch API** en el frontend para consumir los endpoints de la API

## 🏗️ Estructura del proyecto

📦src
 ┣ 📂config
 ┃ ┣ 📜config.js
 ┃ ┣ 📜database.js
 ┃ ┗ 📜passport.config.js
 ┣ 📂controllers
 ┃ ┣ 📜cartController.js
 ┃ ┣ 📜productController.js
 ┃ ┗ 📜userController.js
 ┣ 📂dao
 ┃ ┣ 📂classes
 ┃ ┃ ┣ 📜cart.dao.js
 ┃ ┃ ┣ 📜product.dao.js
 ┃ ┃ ┣ 📜ticket.dao.js
 ┃ ┃ ┗ 📜user.dao.js
 ┃ ┗ 📂models
 ┃ ┃ ┣ 📜cart.model.js
 ┃ ┃ ┣ 📜product.model.js
 ┃ ┃ ┣ 📜ticket.model.js
 ┃ ┃ ┗ 📜user.model.js
 ┣ 📂middlewares
 ┃ ┣ 📜authenticateToken.js
 ┃ ┣ 📜authorization.js
 ┃ ┗ 📜passportCall.js
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜index.css
 ┃ ┣ 📂images
 ┃ ┃ ┗ 📜logo-3.png
 ┃ ┗ 📂js
 ┃ ┃ ┣ 📜cart.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜navbar.js
 ┃ ┃ ┗ 📜updateProduct.js
 ┣ 📂routes
 ┃ ┣ 📜carts.router.js
 ┃ ┣ 📜products.router.js
 ┃ ┣ 📜sessions.router.js
 ┃ ┗ 📜views.router.js
 ┣ 📂services
 ┃ ┣ 📜cartService.js
 ┃ ┣ 📜emailService.js
 ┃ ┣ 📜productService.js
 ┃ ┗ 📜userService.js
 ┣ 📂utils
 ┃ ┗ 📜handlebars-helpers.js
 ┣ 📂views
 ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📜main.handlebars
 ┃ ┣ 📜addProduct.handlebars
 ┃ ┣ 📜cart.handlebars
 ┃ ┣ 📜editProduct.handlebars
 ┃ ┣ 📜login.handlebars
 ┃ ┣ 📜products.handlebars
 ┃ ┗ 📜register.handlebars
 ┣ 📜.DS_Store
 ┣ 📜app.js
 ┗ 📜utils.js


### Pre-requisitos
- **Node.js** (v14+)
- **MongoDB** (ya sea en local o en **MongoDB Atlas**)
- **Nodemailer** configurado con Gmail (crear una contraseña de aplicación en tu cuenta de Google)

## ✉️ Envío de correos electrónicos

Cada vez que un usuario completa una compra, se genera un ticket y se envía un correo de confirmación con los detalles del ticket:

- **Email**: Se envía a la dirección de correo proporcionada en el ticket.
- **Detalles del ticket**: Código único, fecha de compra y total pagado.

## 🚧 Desarrollo

### Scripts disponibles:

- `npm start`: Inicia el servidor en modo producción.


## 🛡️ Seguridad

- **JWT**: Todas las operaciones sensibles están protegidas con autenticación JWT.
- **Validaciones y manejo de errores**: La API devuelve errores detallados para que los desarrolladores puedan detectar y corregir problemas rápidamente.


