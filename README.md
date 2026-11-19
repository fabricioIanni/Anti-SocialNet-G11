# UnaHur Anti-Social Net

Frontend de la red social "UnaHur Anti-Social Net", hecho para el TP2 de Construcción de Interfaces de Usuario. Está hecho con React, TypeScript y React Bootstrap, y usa la API del backend que dio la cátedra.

Se puede ver las publicaciones, comentarlas, registrarse, iniciar sesión y crear publicaciones propias. El login es simulado: se busca el usuario en la API y la contraseña es siempre `123456`.

## Cómo correrlo

Primero hay que tener el backend andando:

```
git clone https://github.com/lucasfigarola/backend-api
cd backend-api
npm install
node seed.js
npm start
```

Queda corriendo en http://localhost:3001.

Después, en otra terminal, desde la carpeta de este proyecto:

```
npm install
npm run dev
```

Se abre en http://localhost:5173.

## API

Se usa la API en `http://localhost:3001` (repo: https://github.com/lucasfigarola/backend-api). Si hay que cambiar la URL, está en `src/constants/index.ts`.

## Rutas

- `/` inicio con las publicaciones
- `/login` iniciar sesión
- `/register` registrarse
- `/post/:id` detalle de una publicación
- `/profile` perfil (hay que estar logueado)
- `/new-post` crear publicación (hay que estar logueado)

## Tecnologías

React, TypeScript, Vite, React Router, React Bootstrap y Axios.
