// /src/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import vehiculoRoutes from './routes/vehiculoRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import maquinaRoutes from './routes/maquinaRoutes.js'
import recaudacionRoutes from './routes/recaudacionRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/vehiculos', vehiculoRoutes)
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/maquinas', maquinaRoutes)
app.use('/api/recaudaciones', recaudacionRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Estacionamiento funcionando con Express y Supabase')
})

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
