'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, Car, AlertCircle, CheckCircle, DollarSign, Calendar, Clock, Printer, CreditCard } from 'lucide-react'

type DeudaInfo = {
  patente: string
  tieneDeuda: boolean
  montoDeuda: number
  fechaEntrada: Date
  diasRegistrados: number
}

const patenteRegex = /^[A-Z]{2}-[A-Z]{2}-\d{2}$|^[A-Z]{2}-\d{2}-\d{2}$/

const BusquedaDeuda = () => {
  const [patente, setPatente] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [deudaInfo, setDeudaInfo] = useState<DeudaInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      setIsLoading(true)
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      const fechaEntrada = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      const diasRegistrados = Math.floor((Date.now() - fechaEntrada.getTime()) / (24 * 60 * 60 * 1000))
      setDeudaInfo({
        patente: patente,
        tieneDeuda: Math.random() > 0.5,
        montoDeuda: Math.floor(Math.random() * 100000),
        fechaEntrada: fechaEntrada,
        diasRegistrados: diasRegistrados
      })
      setIsLoading(false)
      setShowModal(true)
    }
  }

  const handlePrint = () => {
    console.log('Imprimiendo ticket...')
    // Aquí iría la lógica de impresión
  }

  const handlePayment = () => {
    console.log('Procesando pago...')
    // Aquí iría la lógica de pago
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-600 p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-teal-900">Búsqueda de Deuda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={patente}
                onChange={handlePatenteChange}
                placeholder="Ingrese la patente"
                className="pl-10 pr-10 text-lg uppercase tracking-widest border-2 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                maxLength={8}
              />
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
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
              className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center space-x-2 py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Search size={24} />
                </motion.div>
              ) : (
                <>
                  <Search size={24} />
                  <span>Buscar Deuda</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm text-gray-600 mt-6">
          <p className="font-semibold">ParkSmart - Gestión Inteligente de Estacionamientos</p>
          <p className="mt-1">Desarrollado por Spectrum Code Software</p>
        </CardFooter>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-teal-50 to-emerald-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-900">Detalles de Deuda</DialogTitle>
          </DialogHeader>
          <AnimatePresence>
            {deudaInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 bg-teal-200 p-3 rounded-lg">
                  <Car className="text-teal-700" size={24} />
                  <span className="font-semibold text-lg text-teal-900">{deudaInfo.patente}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center bg-emerald-100 p-3 rounded-lg">
                    <Clock className="text-emerald-600 mb-1" size={20} />
                    <span className="text-sm font-medium">Entrada</span>
                    <span className="font-bold">{deudaInfo.fechaEntrada.toLocaleTimeString('es-CL')}</span>
                  </div>
                  <div className="flex flex-col items-center bg-blue-100 p-3 rounded-lg">
                    <Calendar className="text-blue-600 mb-1" size={20} />
                    <span className="text-sm font-medium">Días Registrados</span>
                    <span className="font-bold">{deudaInfo.diasRegistrados}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-yellow-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="text-yellow-600" size={20} />
                    <span className="font-medium">Estado de Deuda</span>
                  </div>
                  <span className={`font-bold ${deudaInfo.tieneDeuda ? 'text-red-500' : 'text-green-500'}`}>
                    {deudaInfo.tieneDeuda ? 'Pendiente' : 'Al día'}
                  </span>
                </div>
                {deudaInfo.tieneDeuda && (
                  <div className="flex items-center justify-between bg-red-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-red-600" size={20} />
                      <span className="font-medium">Monto Adeudado</span>
                    </div>
                    <span className="font-bold text-lg">${deudaInfo.montoDeuda.toLocaleString()}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
            <Button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Printer className="mr-2" size={18} />
              Imprimir Ticket
            </Button>
            {deudaInfo?.tieneDeuda && (
              <Button onClick={handlePayment} className="bg-green-500 hover:bg-green-600 text-white">
                <CreditCard className="mr-2" size={18} />
                Pagar Deuda
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BusquedaDeuda