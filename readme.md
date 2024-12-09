# Reservas de salas Imaginamos

Este proyecto es una aplicación para la gestión de reservas de salas. Permite a los usuarios autenticar su sesión, visualizar las salas disponibles, realizar reservas y eliminar las salas reservadas de cada usuaario.

## Tecnologías Usadas

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express**: Framework web para Node.js, utilizado para construir la API del backend.
- **MongoDB**: Base de datos NoSQL orientada a documentos, utilizada para almacenar la información de las salas y reservas.
- **Mongoose**: Biblioteca de modelado de datos de objetos (ODM) para MongoDB y Node.js.
- **Cors**: Middleware para habilitar el intercambio de recursos de origen cruzado en la aplicación.
- **Jsonwebtoken**: Biblioteca para generar y verificar JSON Web Tokens (JWT) utilizados para la autenticación.
- **Bcrypt**: Biblioteca para encriptar contraseñas y datos sensibles.
- **Dotenv**: Biblioteca para cargar variables de entorno desde un archivo `.env` a `process.env`.
- **Nodemon**: Herramienta que ayuda a desarrollar aplicaciones basadas en Node.js reiniciando automáticamente la aplicación cuando se detectan cambios en

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes:

- Node.js
- npm o yarn

## Instalación

Sigue estos pasos para configurar y levantar el proyecto:

1. **Clona el repositorio**:

```bash
git clone https://github.com/usuario/nombre-del-proyecto.git
```

2. **Realiza un cd a la carpeta en donde esta el proyecto**:

```bash
cd nombre-del-proyecto
```

3. **Instalación de dependencias**:

```bash
npm install o yarn install
```

4. **Configurar las variables de entorno**:

Para esta prueba técnica no se ignoraran los archivos de variables de entorno .env

```bash
PORT= 8080
DATABASE=mongodb+srv://vargasmayoc99:WUkZ8erk8Mz5YGks@demoimaginamos.cextm.mongodb.net/
JWT_SECRET='tu_clave_secreta'
```

5. **Inicia el servidor de desarrollo**:

```bash
npm run dev
```
