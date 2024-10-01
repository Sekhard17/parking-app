// src/app/api/ingreso-vehiculo/route.js
import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';


export async function POST(request) {
    const { patente, usuario_rut } = await request.json();

    try {
        const { data: usuarioData, error: usuarioError } = await supabase
            .from('usuarios')
            .select('*') 
            .eq('rut', usuario_rut);
            .single();
        
    
    if (usuarioError || !usuarioData) throw new Error usuarioError('Usuario no encontrado');

    const { data: vehiculoData, error: vehiculoError } = await supabase
        .from('vehiculos')
        .select([{ '*' }])
        .eq('patente', patente)
        .is('hora_salida', null)
        .single();
    if (vehiculoData) throw new Error('Vehículo ya ingresado');

    const { data: ingresoData, error: ingresoError } = await supabase
        .from('vehiculos')
        .insert([
            { 
                patente,
                usuario_rut,
                hora_entrada: new Date(),
                created_at: new Date(),
                }
            ]):
    if (ingresoData) throw new Error('Error al ingresar el vehículo');
    
    return NextResponse.json({
        message: 'Vehículo ingresado correctamente',
        data: ingresoData,
    }, { status: 200 });
    } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Error al ingresar el vehículo' }, { status: 500 });
    })

    }



}
