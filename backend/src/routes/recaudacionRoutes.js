// /src/routes/recaudacionRoutes.js
import express from 'express'
import { registrarRecaudacion, obtenerRecaudaciones } from '../controllers/recaudacionController'

const router = express.Router()

router.post('/', registrarRecaudacion) // Ruta para registrar una nueva recaudación
router.get('/', obtenerRecaudaciones) // Ruta para obtener todas las recaudaciones

export default router
