// /src/controllers/usuarioController.js
import { supabase } from '../utils/supabaseClient'

// Controlador para registrar un nuevo usuario
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

// Controlador para obtener todos los usuarios
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

// Controlador para iniciar sesión (login)
export const loginUsuario = async (req, res) => {
  const { rut, contrasena } = req.body
  
  try {
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('rut', rut)
      .single()

    if (error || !usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    // Aquí podrías verificar la contraseña, por ejemplo, si está cifrada.
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    res.status(200).json({ message: 'Login exitoso', usuario })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}
