// src/app/api/vehiculos/ingreso/route.js
import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

//Función para registrar la entrada de un vehículo
export async function POST(request) {
  const { patente, usuario_rut } = await request.json();

  try {
    // Verificar si el usuario existe
    // const { data: usuarioData, error: usuarioError } = await supabase
    //   .from('usuarios')
    //   .select('*')
    //   .eq('rut', usuario_rut)
    //   .single();

    // if (usuarioError || !usuarioData) throw new Error('Usuario no encontrado');

    // Verificar si el vehículo ya está estacionado
    const { data: vehiculoData, error: vehiculoError } = await supabase
      .from('vehiculos')
      .select('*')
      .eq('patente', patente)
      .is('hora_salida', null)
      .single();

    if (vehiculoData) throw new Error('El vehículo ya está registrado en el estacionamiento');

    // Registrar la entrada del vehículo
    const { data: ingresoData, error: ingresoError } = await supabase
      .from('vehiculos')
      .insert([
        {
          patente,
          usuario_rut,
          hora_entrada: new Date(),
          created_at: new Date(),
        }
      ]);

    if (ingresoError) throw new Error('Error al registrar la entrada del vehículo');

    return NextResponse.json({
      message: 'Vehículo registrado exitosamente',
      data: ingresoData,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Error al registrar el vehículo' }, { status: 400 });
  }
}
