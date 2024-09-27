"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { User, Lock, UserPlus, Car, Briefcase } from "lucide-react"
import Image from 'next/image'

export default function RegistroComponent() {
  const [rut, setRut] = useState('')
  const [formattedRut, setFormattedRut] = useState('')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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

  const formatNombre = (value: string) => {
    return value.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRut(value)
    setFormattedRut(formatRut(value))
  }

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNombre(formatNombre(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
        rut: formattedRut,
        nombre,
        password,
        confirmPassword, 
        rol: 'Operador',
    };

    console.log('Datos a enviar:', userData); // Agregado para depuración

    try {
        const response = await fetch('http://localhost:5000/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido');
        }

        const data = await response.json();
        console.log('Registro exitoso:', data);
    } catch (error) {
        console.error('Error en el registro:', error);
    }
};


  useEffect(() => {
    setFormattedRut(formatRut(rut))
  }, [rut])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
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
          Registro de Nuevo Operador
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
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    value={nombre}
                    onChange={handleNombreChange}
                    className="pl-10 w-full"
                    required
                  />
                </div>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme su contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Rol</Label>
                <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
                  <Briefcase className="text-gray-400" size={18} />
                  <span className="text-gray-700">Operador</span>
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
                  <UserPlus className="mr-2 h-4 w-4" /> Registrar Usuario
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <a href="/login" className="text-sm text-blue-600 hover:underline">¿Ya tienes una cuenta? Inicia sesión</a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}