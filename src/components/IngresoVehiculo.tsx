'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Car, Calendar, Clock, Ticket } from 'lucide-react'
import { supabase } from '@/utils/supabaseClient';
import { set } from 'date-fns'

const patenteRegex = /^[A-Z]{2}-[A-Z]{2}-\d{2}$|^[A-Z]{2}-\d{2}-\d{2}$/

const IngresoVehiculo = () => {
  const [patente, setPatente] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [usuarioRut, setUsuarioRut] = useState('12345678-9')

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatPatente = (value: string) => {
    const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase()
    let formatted = ''
    for (let i = 0; i < cleaned.length && i < 6; i++) {
      if (i === 2 || i === 4) formatted += '-'
      if (i < 4) {
        // Solo letras en las primeras 4 posiciones
        formatted += cleaned[i].replace(/[^A-Z]/g, '')
      } else {
        // Solo números en las últimas 2 posiciones
        formatted += cleaned[i].replace(/[^0-9]/g, '')
      }
    }
    return formatted
  }

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPatente(e.target.value);
    setPatente(formatted);
    setIsValid(patenteRegex.test(formatted));
  };

  const registrarVehiculo = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
  
      // Obtener el usuario RUT del contexto o autenticación
      const usuarioRut = '12345678-9'; 
  
      // Asegúrate de que el formato de usuarioRut es correcto
      console.log("RUT del usuario:", usuarioRut);
  
      // Verificar si el usuario existe
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('rut', usuarioRut)
        .single();
  
      if (usuarioError) {
        console.error('Error al obtener el usuario:', usuarioError);
        throw new Error('Usuario no encontrado o error de consulta');
      }
  
      if (!usuarioData) throw new Error('Usuario no encontrado');
  
      // Verificar si el vehículo ya está registrado
      const { data: vehiculoData, error: vehiculoError } = await supabase
        .from('vehiculos')
        .select('*')
        .eq('patente', patente)
        .is('hora_salida', null)
        .single();
  
      if (vehiculoError) {
        console.error('Error al verificar el vehículo:', vehiculoError);
        throw new Error('Error al verificar el vehículo');
      }
  
      if (vehiculoData) throw new Error('El vehículo ya está registrado en el estacionamiento');
  
      // Registrar la entrada del vehículo
      const { error: ingresoError } = await supabase
        .from('vehiculos')
        .insert([
          {
            patente,
            usuario_rut: usuarioRut,
            hora_entrada: new Date(),
            created_at: new Date(),
          },
        ]);
  
      if (ingresoError) throw new Error('Error al registrar la entrada del vehículo');
  
      setSuccess('Vehículo registrado exitosamente');
      setPatente('');
      setIsValid(false);
    } catch (error: any) {
      setError(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      registrarVehiculo();
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-900">Ingreso de Vehículo</CardTitle>
          <p className="text-center text-sm text-gray-600">Ingrese la patente del vehículo</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={patente}
                onChange={handlePatenteChange}
                placeholder="AA-AA-11 o AA-11-11"
                className="pl-10 pr-10 text-lg uppercase tracking-widest"
                maxLength={8}
              />
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
              <AnimatePresence>
                {patente && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isValid ? 'bg-green-500' : 'bg-red-500'}`}>
                      <span className="text-white text-xs font-bold">
                        {isValid ? '✓' : '✗'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Calendar size={16} className="text-blue-500" />
              <span>
                {currentDateTime.toLocaleDateString('es-CL', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Clock size={24} className="text-blue-500" />
              <span>{currentDateTime.toLocaleTimeString('es-CL', { hour12: false })}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={!isValid}
              >
                <Ticket size={24} />
                <span>Ingresar Vehículo</span>
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm text-gray-600">
          <p className="font-semibold">ParkSmart - Gestión Inteligente de Estacionamientos</p>
          <p className="mt-1">Desarrollado por Spectrum Code Software</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default IngresoVehiculo