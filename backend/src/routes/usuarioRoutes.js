// /src/routes/usuarioRoutes.js
import express from 'express'
import { registrarUsuario, obtenerUsuarios } from '../controllers/usuarioController'

const router = express.Router()

router.post('/', registrarUsuario) // Ruta para registrar un nuevo usuario
router.get('/', obtenerUsuarios) // Ruta para obtener todos los usuarios

export default router
