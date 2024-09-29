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
    
    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    const userData = {
        rut: formattedRut,
        nombre,
        contrasena: password,
        rol: 'Operador',
    };

    console.log('Datos a enviar:', userData);

    try {
      const response = await fetch('/api/usuarios', {
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
          transition={{ duration: 0.5, type: "spring" }}
        >
          Registrar Usuario
        </motion.h1>
      </motion.div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Nuevo Usuario</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="rut" className="block text-sm font-medium text-gray-700">
                RUT
              </Label>
              <Input 
                id="rut"
                value={formattedRut}
                onChange={handleRutChange}
                placeholder="Ingrese su RUT"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </Label>
              <Input 
                id="nombre"
                value={nombre}
                onChange={handleNombreChange}
                placeholder="Ingrese su nombre"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </Label>
              <Input 
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme su contraseña"
                required
              />
            </div>
            <CardFooter className="flex justify-center">
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Registrar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
