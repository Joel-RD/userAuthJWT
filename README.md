# 🔺Auntenticacíon con JWT Usando el Patron MVC

> ### API REST para el desarrollo de un proyecto de auntenticación con JWT
>
> - Autenticación con JsonWebTokens (JWT)
> - CookiesParser para el manejo de sessiones de usuarios
> - Encriptación de contraseñas con bcrypt
> - Uso de handlebars para el desarrollo de vistas

## ⬇️ Asegurarse de tener instalado:

- 🔗 [Node.js](https://nodejs.org/en)
- 🔗 [PostgreSQL](https://www.postgresql.org/)

#### 📝**Nota**: Mas información sobre PostgreSQL

> - 🔗 [Instalación de PostgreSQL en windows](https://www.youtube.com/watch?v=w9ax9-s2jbE&t=64s)
> - 🔗 [Añadir Postgres al path de windows](https://www.youtube.com/watch?v=2oAM4Q-9DMU)

## 🗂️ Archivos que debes crear para el correcto funcionamiento de la API:

- **.env**: Contiene las variables de entorno para la ejecucion de la API, El archivo debe estar en la raiz del proyecto.

### Variables de entorno:

> - **CLOUD_DB='tu base de datos en la nube'**: En caso de que se requiera utilizar una base de datos en la nube.
> - **SECRET_JWT_KEY='tu clave JWT'**: Clave para la encriptación de JWT.
> - **HOST_DB='tu host'**: Host de la base de datos.
> - **USER_DB='tu usuario'**: Usuario de la base de datos.
> - **PASSWORD_DB='tu password'**: Password de la base de datos.
> - **PORT_DB='tu puerto'**: Puerto de la base de datos.
> - **PORT_SERVER='tu puerto'**: Puerto de la API.

## ⭐ Agradecimientos

Quiero agradecer a [JunaidShamnad](https://github.com/JunaidShamnad/) por el increíble trabajo en el desarrollo del front-end que utilicé en este proyecto. Su diseño y esfuerzo fueron clave para la integración con mi backend de autenticación con JWT.

El front-end que utilicé proviene de su proyecto [ SignIn-SignUp-Form](https://github.com/JunaidShamnad/SignIn-SignUp-Form), y lo integré con mi sistema de autenticación para fines educativos o de aprendizaje.

## ✅ Instalación de dependencias

Para instalar todas las dependencias usa el comando:

```bash
  npm install
```

Seguido del siguiente comando para actualizar las dependencias:

```bash
  npm update
```

## 📝 Crear la base de datos

- Abra la terminal de tu sistema operativo y ejecute el siguiente comando:

```bash
  psql -U postgres
```

- Luego ingrese la contraseña de su usuario de PostgreSQL.

- Ejecute el siguiente comando para mostrar las bases de datos existentes:

```
  \l
```

- Crea la base de datos:

```sql
  CREATE DATABASE userauth;
```

- Conectarse a la base de datos:

```sql
  \c userauth;
```

- Ejecute el siguiente comando para crear la tabla de usuarios:

```sql
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
```

## 🚀 Ejecutar la API en modo desarrollador.

```bash
  npm run dev
```

## 🚀 Ejecutar la API para prodproducción.

```bash
  npm run build
```

### 🌐 Rutas de la API

- **GET /:** Muestra el panel de inicio de sección y registro de un nuevo usuario.
- **POST /login**: Inicio de sesión.
- **POST /register**: Registro de un nuevo usuario.
- **POST /protected**: Ruta protegida (Solo usarios logeados pueden acceder).
- **POST /protected/set-config**: Configuración de cuenta (nuevo usuario y nuevo password).
- **POST /logout**: Cierre de sesión.

## 🎉 ¡Gracias por utilizar la API!

