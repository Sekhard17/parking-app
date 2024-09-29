// /src/routes/vehiculoRoutes.js
import express from 'express'
import { registrarEntrada, registrarSalida } from '../controllers/vehiculoController'

const router = express.Router()

router.post('/entrada', registrarEntrada)
router.post('/salida', registrarSalida)

export default router
