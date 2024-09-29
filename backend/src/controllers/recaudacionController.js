// /src/controllers/recaudacionController.js
import { supabase } from '../utils/supabaseClient'

export const registrarRecaudacion = async (req, res) => {
  const { maquina_id, monto_total, tarifa_id, usuario_rut } = req.body
  try {
    const { data, error } = await supabase
      .from('recaudaciones')
      .insert([{ maquina_id, monto_total, tarifa_id, usuario_rut, fecha: new Date() }])

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar la recaudación' })
  }
}

export const obtenerRecaudaciones = async (req, res) => {
  try {
    const { data, error } = await supabase.from('recaudaciones').select('*')
    if (error) throw error
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener las recaudaciones' })
  }
}
