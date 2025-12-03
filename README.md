# Proyecto Final API REST
# Backend para tienda - Talentotech
## Sobre el proyecto
Este es un backend simple hecho como proyecto final para Talentotech.
El objetivo es manejar productos de una tienda con un CRUD basico y autenticacion con JWT.
Permite listar productos, crear nuevos, editarlos y borrarlos.

Las rutas GET son publicas y las demas requieren validacion con token.

## Technologies & Tools Used
- ![Node.js Logo](https://img.icons8.com/color/25/000000/nodejs.png)**Node.js**
- ![JavaScript Logo](https://img.icons8.com/color/25/000000/javascript--v1.png) **JavaScript (ES6+)**
- ![Terminal Logo](https://img.icons8.com/ios-filled/25/000000/command-line.png) **Command-line interface (CLI)** for terminal interaction
- ![git-logo](https://img.icons8.com/color/25/000000/git.png) Git for version control
- ![react-logo](https://img.icons8.com/ios/25/000000/react-native.png) React

## Installation
1. Clonar el repo:
git clone https://github.com/fedetempone/talentotech-backend-finalProject.git
2. Instalar dependencias:
npm install
3. Crear archivo .env con las variables:
PORT=5000
JWT_SECRET=changeme
4. Ejecutar servidor:
5. npm start

## Endpoints

### Publics
- GET /api/products
- GET /api/products/:id

### Protects (token required)
- POST /api/products/create
- PUT /api/products/:id
- DELETE /api/products/:id

## Autentication"
Para obtener un token hacer un POST a /api/auth/login con este body:
{
 username: admin,"
 password: password123"
}

Si las credenciales son validas, devuelve un token para usar en los endpoints protegidos.
Ejemplo uso en header:
Authorization: Bearer token_aqui

## Notes
- Si falta token o es invalido devuelve 401
- Los productos se guardan en firebase
- El proyecto se hizo como entrega final

## Deploy
Se puede ejecutar en local o subir a cualquier servicio de node.

## Contact and Support

**Ante cualquier inquietud siéntase en la libertad de consultar.**  
**_¡Si se puede imaginar, se puede programar!_**
**_Saludos cordiales!_**  ![saludos](https://img.icons8.com/ios/20/star-trek-gesture.png)
