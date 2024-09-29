"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { User, Lock, LogIn, Car } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify' // Importa Toastify
import 'react-toastify/dist/ReactToastify.css' // Importa estilos de Toastify

export default function LoginComponent() {
  const [rut, setRut] = useState('')
  const [formattedRut, setFormattedRut] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  interface ValidationResponse {
    error?: string
    message?: string
  }

  const formatRut = (value: string) => {
    const cleanedValue = value.replace(/[^0-9kK]/g, '').toUpperCase()
    let result = ''
    
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i === cleanedValue.length - 1) {
        result += '-' + cleanedValue[i]
      } else {
        if ((cleanedValue.length - i) % 3 === 1 && i !== 0) {
          result += '.'
        }
        result += cleanedValue[i]
      }
    }
    
    return result
  }

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRut(value)
    setFormattedRut(formatRut(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with RUT:', rut);

    try {
      const response = await fetch('/api/login', { // Cambia la ruta a la API correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, contrasena: password }), // Envía RUT y contraseña
      });

      const data = await response.json();

      if (response.ok) {
        setError(null);
        toast.success(data.message || 'Inicio de sesión exitoso'); // Muestra la alerta de éxito
        // Manejar el inicio de sesión exitoso (por ejemplo, redirigir)
      } else {
        setError(data.error ?? null);
        toast.error(data.error || 'Se produjo un error'); // Muestra la alerta de error
      }
    } catch (error) {
      console.error('Error al validar el RUT:', error);
      setError('Se produjo un error al validar el RUT. Inténtalo de nuevo.');
      toast.error('Se produjo un error al validar el RUT. Inténtalo de nuevo.'); // Alerta de error general
    }
  }

  useEffect(() => {
    setFormattedRut(formatRut(rut))
  }, [rut])

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
              <LogIn className="h-6 w-6" />
            </motion.div>
            <h2 className="text-center text-lg font-semibold">Iniciar Sesión</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="rut" className="block mb-2">RUT</Label>
                <Input
                  type="text"
                  id="rut"
                  value={formattedRut}
                  onChange={handleRutChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password" className="block mb-2">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <CardFooter className="flex justify-center">
                <Button type="submit">Iniciar Sesión</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
