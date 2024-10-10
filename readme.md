# Este repositorio esta en desarrollo, se acrualizara hasta el 21/10.


# API Proyecto final Backend 2

Este proyecto es una API para una tienda de vinos, desarrollada con Node.js, Express, y MongoDB. La API permite la gestión de productos, utilizando Mongoose para la interacción con la base de datos. El frontend está desarrollado con Handlebars y soporta paginación para mejorar la experiencia del usuario y el rendimiento de la pagina.

## Características

- **Gestión de productos**: CRUD (Crear, Leer, Actualizar, Eliminar) de productos.
- **Paginación**: Implementación de paginación en las listas de productos.
- **Filtrado**: Filtros de búsqueda de productos por categoría, precio, y otros criterios.
- **Manejo de plantillas**: Uso de Handlebars para renderizar las vistas en el frontend.
- **Base de datos**: Almacenamiento de datos en MongoDB, con Mongoose como ODM.
- **Carrito de compras**: Añadir y gestionar productos en un carrito de compras.
- **Imagen de productos**: Soporte para agregar URLs de imágenes a los productos.

## Tecnologías

- **Node.js**: Entorno de ejecución para el desarrollo del backend.
- **Express.js**: Framework para la creación de la API.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los datos.
- **Mongoose**: ODM (Object-Document Mapper) para MongoDB.
- **Handlebars**: Motor de plantillas para la generación del frontend.
- **mongoose-paginate-v2**: Integración de características de paginación para la gestión de grandes cantidades de productos.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/Martin-Domenech/ProyectoFinal-Backend
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd ProyectoFinal-Backend
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración

1. Ejecuta la aplicación:
    ```bash
    npm start
    ```
2. La aplicacion esta alojada en http://localhost:8080/


