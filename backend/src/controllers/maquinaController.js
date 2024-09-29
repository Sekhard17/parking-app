// /src/controllers/maquinaController.js
import { supabase } from '../utils/supabaseClient'

export const registrarMaquina = async (req, res) => {
  const { nombre, ubicacion, usuario_rut } = req.body
  try {
    const { data, error } = await supabase
      .from('maquinas')
      .insert([{ nombre, ubicacion, usuario_rut }])

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar la máquina' })
  }
}

export const obtenerMaquinas = async (req, res) => {
  try {
    const { data, error } = await supabase.from('maquinas').select('*')
    if (error) throw error
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener las máquinas' })
  }
}
