'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Car, LogOut, DollarSign, Search, FileText, User, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/utils/supabaseClient' // Importar supabase

type MenuItem = {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
  darkColor: string
}

const PanelControlOperador: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false) // Para el diálogo

  // Obtener la información de la sesión del usuario autenticado
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: userData } = await supabase
            .from('usuarios')
            .select('nombre, rol')
            .eq('id', user.id)
            .single()

          if (userData) {
            setUserName(userData.nombre)
            setUserRole(userData.rol)
          }
        }
      }
    }

    getSession()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItems: MenuItem[] = [
    {
      title: 'Ingreso de Vehículo',
      description: 'Registre la entrada de nuevos vehículos al estacionamiento.',
      icon: <Car />,
      href: '/ingreso-vehiculo',
      color: 'bg-blue-500',
      darkColor: 'bg-blue-700',
    },
    {
      title: 'Salida de Vehículo',
      description: 'Procese la salida de vehículos y genere tickets de pago.',
      icon: <LogOut />,
      href: '/salida-vehiculo',
      color: 'bg-purple-500',
      darkColor: 'bg-purple-700',
    },
    {
      title: 'Búsqueda de Deuda',
      description: 'Verifique deudas pendientes por patente de vehículo.',
      icon: <Search />,
      href: '/busqueda-deuda',
      color: 'bg-teal-500',
      darkColor: 'bg-teal-700',
    },
    {
      title: 'Reportes',
      description: 'Acceda a informes detallados y estadísticas del estacionamiento.',
      icon: <FileText />,
      href: '/reportes',
      color: 'bg-orange-500',
      darkColor: 'bg-orange-700',
    },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Redirigir al usuario después del logout si es necesario
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt={userName ?? 'Operador'} />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {userName ?? 'Juan Pérez'}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {userRole ?? 'Operador de Turno'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {currentTime.toLocaleTimeString('es-CL', { hour12: false })}
                </p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentTime.toLocaleDateString('es-CL')}
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={(checked) => setIsDarkMode(checked)}
                className="ml-4"
              />
              <Button variant="ghost" onClick={() => setShowDialog(true)}>
                <User className="text-gray-500 dark:text-gray-300" />
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Card
                  onClick={() => setSelectedItem(item)}
                  className={`cursor-pointer ${isDarkMode ? item.darkColor : item.color} transition-transform transform hover:scale-105`}
                >
                  <CardContent className="flex items-center space-x-4 p-4">
                    {item.icon}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dialog para mostrar información adicional */}
      <AnimatePresence>
        {showDialog && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Perfil del Operador</DialogTitle>
                <DialogDescription>
                  {userName ? (
                    <>
                      <p>Nombre: {userName}</p>
                      <p>Rol: {userRole}</p>
                    </>
                  ) : (
                    <p>Cargando información del operador...</p>
                  )}
                </DialogDescription>
              </DialogHeader>
              <Button variant="ghost" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PanelControlOperador
