import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { rut, nombre, contrasena, rol } = await request.json(); // Lee el cuerpo de la solicitud

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ rut, nombre, contrasena, rol }]);

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al registrar el usuario' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
  }
}
