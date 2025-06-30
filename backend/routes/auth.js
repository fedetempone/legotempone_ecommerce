import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// aca basicamente estoy escuchando que se haga un POST en alguna de estas rutas (login o register), cuando se hace el post, es decir;
// cuando toco el boton de registrar, o cuando toco el boton de ingresar, se disparan las funciones correspondientes, en este caso
// registerUser o loginUser
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
// router.get('/me', authMiddleware, getUserProfile); ← podria crear una ruta asi , para mostrar los datos del profile del usuario logeado
