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
      darkColor: 'bg-blue-700'
    },
    { 
      title: 'Salida de Vehículo', 
      description: 'Procese la salida de vehículos y genere tickets de pago.',
      icon: <LogOut />, 
      href: '/salida-vehiculo', 
      color: 'bg-purple-500',
      darkColor: 'bg-purple-700'
    },
    { 
      title: 'Búsqueda de Deuda', 
      description: 'Verifique deudas pendientes por patente de vehículo.',
      icon: <Search />, 
      href: '/busqueda-deuda', 
      color: 'bg-teal-500',
      darkColor: 'bg-teal-700'
    },
    { 
      title: 'Reportes', 
      description: 'Acceda a informes detallados y estadísticas del estacionamiento.',
      icon: <FileText />, 
      href: '/reportes', 
      color: 'bg-orange-500',
      darkColor: 'bg-orange-700'
    },
  ]

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
                <AvatarImage src="/placeholder.svg" alt="Operador" />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Juan Pérez</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Operador de Turno</p>
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
                                                                                                                onCheckedChange={setIsDarkMode}
                                                                                                                className="ml-4"
                                                                                                  >
                                                                                                                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                                                                                  </Switch>
                                                                                    </div>
                                                                      </header>

                                                                      <main>
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-8 text-center`}>
              Panel de Control
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="p-0">
                      <Button
                        className={`w-full h-full p-6 ${isDarkMode ? item.darkColor : item.color} hover:opacity-90 transition-opacity duration-300 flex items-start text-left`}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-white/80">{item.description}</p>
                        </div>
                        {item.icon && (
                          <div className="ml-4">
                            {React.cloneElement(item.icon as React.ReactElement, { size: 48, className: "text-white/90" })}
                          </div>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </main>

          <footer className={`mt-12 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-lg font-semibold">Sur Innova Limitada</p>
            <p className="mt-1">ParkSmart - Gestión Inteligente de Estacionamientos</p>
            <p className="mt-1">Desarrollado por Spectrum Code Software</p>
          </footer>
        </motion.div>

        <AnimatePresence>
          {selectedItem && selectedItem.icon && (
            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
              <DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center">
                    {React.cloneElement(selectedItem.icon as React.ReactElement, { className: "mr-2" })}
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>¿Desea continuar con esta operación?</p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <Button variant="outline" onClick={() => setSelectedItem(null)}>
                      Cancelar
                    </Button>
                    <Link href={selectedItem.href} passHref>
                      <Button className={isDarkMode ? selectedItem.darkColor : selectedItem.color}>Continuar</Button>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PanelControlOperador