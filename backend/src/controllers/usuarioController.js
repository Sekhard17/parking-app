// /src/controllers/usuarioController.js
import { supabase } from '../utils/supabaseClient'

export const registrarUsuario = async (req, res) => {
  const { rut, nombre, contrasena, rol } = req.body
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ rut, nombre, contrasena, rol }])

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}

export const obtenerUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuarios').select('*')
    if (error) throw error
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}
