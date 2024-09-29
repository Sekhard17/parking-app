// /src/routes/usuarioRoutes.js
import express from 'express'
import { registrarUsuario, obtenerUsuarios, loginUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

// Ruta para registrar un nuevo usuario
router.post('/', registrarUsuario)

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios)

// Ruta para iniciar sesión
router.post('/login', loginUsuario)

export default router
