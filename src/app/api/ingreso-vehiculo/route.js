// src/app/api/ingreso-vehiculo/route.js
import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';


export async function POST(request) {
    
