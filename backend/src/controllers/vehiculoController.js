// /src/controllers/vehiculoController.js
import * as vehiculoModel from '../models/vehiculoModel'

export const registrarVehiculo = async (req, res) => {
  const { patente, usuarioRut } = req.body
  const nuevoVehiculo = await vehiculoModel.crearVehiculo(patente, usuarioRut)
  
  if (nuevoVehiculo) {
    return res.status(201).json(nuevoVehiculo)
  }
  return res.status(400).json({ error: 'Error al registrar el vehículo' })
}
