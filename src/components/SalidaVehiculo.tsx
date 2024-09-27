'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Car, Calendar, Clock, DollarSign, Hourglass, Printer, CreditCard } from 'lucide-react'

type VehicleDetails = {
  patente: string
  horaEntrada: string
  horaSalida: string
  tiempoEstacionamiento: string
  costo: number
  ubicacion: string
}

const patenteRegex = /^[A-Z]{2}-[A-Z]{2}-\d{2}$|^[A-Z]{2}-\d{2}-\d{2}$/

const SalidaVehiculo = () => {
  const [patente, setPatente] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(null)

  const formatPatente = (value: string) => {
    const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase()
    let formatted = ''
    for (let i = 0; i < cleaned.length && i < 6; i++) {
      if (i === 2 || i === 4) formatted += '-'
      if (i < 4) {
        formatted += cleaned[i].replace(/[^A-Z]/g, '')
      } else {
        formatted += cleaned[i].replace(/[^0-9]/g, '')
      }
    }
    return formatted
  }

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPatente(e.target.value)
    setPatente(formatted)
    setIsValid(patenteRegex.test(formatted))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      const details: VehicleDetails = {
        patente: patente,
        horaEntrada: '10:30',
        horaSalida: '14:45',
        tiempoEstacionamiento: '4h 15m',
        costo: 5600,
        ubicacion: 'Nivel 2, Zona A'
      }
      setVehicleDetails(details)
      setShowModal(true)
    }
  }

  const handlePrint = () => {
    console.log('Imprimiendo ticket de salida...')
    // Aquí iría la lógica de impresión
  }

  const handlePayment = () => {
    console.log('Procesando pago...')
    // Aquí iría la lógica de pago
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-purple-900">Salida de Vehículo</CardTitle>
          <p className="text-center text-sm text-gray-600">Ingrese la patente del vehículo que sale</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={patente}
                onChange={handlePatenteChange}
                placeholder="AA-AA-11 o AA-11-11"
                className="pl-10 pr-10 text-lg uppercase tracking-widest border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                maxLength={8}
              />
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
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
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center space-x-2 py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={!isValid}
            >
              <Car size={24} />
              <span>Registrar Salida</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm text-gray-600">
          <p className="font-semibold">ParkSmart - Gestión Inteligente de Estacionamientos</p>
          <p className="mt-1">Desarrollado por Spectrum Code Software</p>
        </CardFooter>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white to-purple-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-900">Detalles de Salida</DialogTitle>
          </DialogHeader>
          <AnimatePresence>
            {vehicleDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 bg-purple-200 p-3 rounded-lg">
                  <Car className="text-purple-700" size={24} />
                  <span className="font-semibold text-lg text-purple-900">{vehicleDetails.patente}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center bg-blue-100 p-3 rounded-lg">
                    <Clock className="text-blue-600 mb-1" size={20} />
                    <span className="text-sm font-medium">Entrada</span>
                    <span className="font-bold">{vehicleDetails.horaEntrada}</span>
                  </div>
                  <div className="flex flex-col items-center bg-green-100 p-3 rounded-lg">
                    <Clock className="text-green-600 mb-1" size={20} />
                    <span className="text-sm font-medium">Salida</span>
                    <span className="font-bold">{vehicleDetails.horaSalida}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-yellow-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Hourglass className="text-yellow-600" size={20} />
                    <span className="font-medium">Tiempo Total</span>
                  </div>
                  <span className="font-bold">{vehicleDetails.tiempoEstacionamiento}</span>
                </div>
                <div className="flex items-center justify-between bg-red-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-red-600" size={20} />
                    <span className="font-medium">Costo Total</span>
                  </div>
                  <span className="font-bold text-lg">${vehicleDetails.costo}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg">
                  <Calendar className="text-gray-600" size={20} />
                  <span className="font-medium">Ubicación: {vehicleDetails.ubicacion}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
            <Button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Printer className="mr-2" size={18} />
              Imprimir Ticket
            </Button>
            <Button onClick={handlePayment} className="bg-green-500 hover:bg-green-600 text-white">
              <CreditCard className="mr-2" size={18} />
              Procesar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SalidaVehiculo