// src/app/api/login/route.js
import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { rut, contrasena } = await request.json(); // Lee el cuerpo de la solicitud

  try {
    // Verificamos si el usuario existe con el RUT y la contraseña
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('rut', rut)
      .single(); // Obtener un solo registro

    if (error || !data) throw new Error('Usuario no encontrado');

    // Aquí puedes validar la contraseña de forma manual
    if (data.contrasena !== contrasena) {
      throw new Error('Contraseña incorrecta');
    }

    return NextResponse.json({ user: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 401 });
  }
}
