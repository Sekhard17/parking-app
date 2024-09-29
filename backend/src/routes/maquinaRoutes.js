// /src/routes/maquinaRoutes.js
import express from 'express'
import { registrarMaquina, obtenerMaquinas } from '../controllers/maquinaController'

const router = express.Router()

router.post('/', registrarMaquina) // Ruta para registrar una nueva máquina
router.get('/', obtenerMaquinas) // Ruta para obtener todas las máquinas

export default router
