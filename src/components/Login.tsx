"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { User, Lock, LogIn, Car } from "lucide-react"
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'; // Importar desde next/navigation
import { supabase } from '@/utils/supabaseClient';

export default function LoginComponent() {
  const [rut, setRut] = useState('');
  const [formattedRut, setFormattedRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // Para manejar el rol del usuario
  const router = useRouter(); // Inicialización del enrutador

  const formatRut = (value: string) => {
    const cleanedValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
    let result = '';

    for (let i = 0; i < cleanedValue.length; i++) {
      if (i === cleanedValue.length - 1) {
        result += '-' + cleanedValue[i];
      } else {
        if ((cleanedValue.length - i) % 3 === 1 && i !== 0) {
          result += '.';
        }
        result += cleanedValue[i];
      }
    }

    return result;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRut(value);
    setFormattedRut(formatRut(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intento de inicio de sesión con RUT:', rut);

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('rut', rut)
        .single();

      if (error || !data) throw new Error('Usuario no encontrado');

      // Validar la contraseña
      if (data.contrasena !== password) {
        throw new Error('Contraseña incorrecta');
      }

      setUserRole(data.rol); // Guarda el rol del usuario
      toast.success('Inicio de sesión exitoso');

    } catch (error) {
      console.error('Error al validar el RUT:', error);
      setError('Se produjo un error al validar el RUT. Inténtalo de nuevo.');
      toast.error('Se produjo un error al validar el RUT. Inténtalo de nuevo.');
    }
  };

  // Efecto para redirigir según el rol del usuario
  useEffect(() => {
    if (userRole === 'Administrador') {
      router.push('/dashboard-admin');
    } else if (userRole === 'Operador') {
      router.push('/menu-operador');
    }
  }, [userRole, router]); // Añade `router` a las dependencias

  useEffect(() => {
    setFormattedRut(formatRut(rut));
  }, [rut]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <ToastContainer /> {/* Agrega el contenedor de Toastify */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-2"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          Parking <Car className="inline-block ml-2" />
        </motion.h1>
        <motion.p
          className="text-xl text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Control de Estacionamientos
        </motion.p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="pb-0">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center mb-6"
            >
              <Image
                src="/images/sur.png"
                alt="Sur Innova Logo"
                width={200}
                height={100}
                className="h-20 w-auto"
              />
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rut" className="text-sm font-medium text-gray-700">RUT</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="rut"
                    type="text"
                    placeholder="Ingrese su RUT"
                    value={formattedRut}
                    onChange={handleRutChange}
                    className={`pl-10 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
          </CardFooter>
          <CardFooter className="flex justify-center">
            <a href="/registro" className="text-sm text-blue-600 hover:underline">Registrate</a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
