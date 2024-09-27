'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { DollarSign, Car, TrendingUp, Clock } from 'lucide-react'
import { es } from 'date-fns/locale'

type DailyStats = {
  fecha: Date
  ganancias: number
  vehiculosIngresados: number
  tiempoPromedioEstadia: number
}

const ReportesOperador = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [stats, setStats] = useState<DailyStats>({
    fecha: new Date(),
    ganancias: 125000,
    vehiculosIngresados: 45,
    tiempoPromedioEstadia: 3.5
  })

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    // Aquí simularemos la obtención de datos para la fecha seleccionada
    // En una implementación real, esto sería una llamada a una API
    setStats({
      fecha: date || new Date(),
      ganancias: Math.floor(Math.random() * 200000) + 50000,
      vehiculosIngresados: Math.floor(Math.random() * 60) + 20,
      tiempoPromedioEstadia: Math.random() * 5 + 1
    })
  }

  const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
    <Card className={`bg-${color}-100`}>
      <CardContent className="flex items-center p-6">
        <div className={`mr-4 rounded-full p-3 bg-${color}-200`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Reportes del Operador</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecciona una fecha</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                locale={es}
                className="rounded-md border shadow"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas del día</h2>
              <motion.div
                key={stats.fecha.toISOString()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <StatCard
                  icon={<DollarSign className="h-6 w-6 text-green-600" />}
                  title="Ganancias Totales"
                  value={`$${stats.ganancias.toLocaleString()}`}
                  color="green"
                />
              </motion.div>
              <motion.div
                key={`vehicles-${stats.fecha.toISOString()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <StatCard
                  icon={<Car className="h-6 w-6 text-blue-600" />}
                  title="Vehículos Ingresados"
                  value={stats.vehiculosIngresados.toString()}
                  color="blue"
                />
              </motion.div>
              <motion.div
                key={`time-${stats.fecha.toISOString()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <StatCard
                  icon={<Clock className="h-6 w-6 text-purple-600" />}
                  title="Tiempo Promedio de Estadía"
                  value={`${stats.tiempoPromedioEstadia.toFixed(1)} horas`}
                  color="purple"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen de Rendimiento</h2>
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Rendimiento del Mes</p>
                <p className="text-lg font-bold text-gray-800">Excelente</p>
              </div>
            </div>
            <Button className="bg-green-500 hover:bg-green-600">Ver Detalles</Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ReportesOperador