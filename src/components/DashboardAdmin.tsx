'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, Car, ChevronDown, CreditCard, DollarSign, Download, Home, LogOut, Menu, 
  Moon, PieChart, Settings, Sun, Users, Clock, TrendingUp, Calendar, Hash, 
  ArrowRight, ArrowUpRight, Percent, CloudRain
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const revenueData = [
  { name: 'Lun', value: 400000 },
  { name: 'Mar', value: 300000 },
  { name: 'Mié', value: 200000 },
  { name: 'Jue', value: 500000 },
  { name: 'Vie', value: 800000 },
  { name: 'Sáb', value: 600000 },
  { name: 'Dom', value: 400000 },
]

const occupancyData = [
  { name: '00:00', value: 30 },
  { name: '04:00', value: 20 },
  { name: '08:00', value: 60 },
  { name: '12:00', value: 90 },
  { name: '16:00', value: 80 },
  { name: '20:00', value: 70 },
]

export default function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState('all')
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setCurrentDate(now.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }))
    }
    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const sidebarItems = [
    { category: "General", items: [
      { icon: Home, label: 'Inicio' },
      { icon: PieChart, label: 'Estadísticas' },
    ]},
    { category: "Gestión", items: [
      { icon: Users, label: 'Operadores' },
      { icon: Car, label: 'Vehículos' },
      { icon: CreditCard, label: 'Pagos' },
      { icon: Percent, label: 'Tarifas' },
    ]},
    { category: "Sistema", items: [
      { icon: Settings, label: 'Configuración' },
    ]},
  ]

  return (
    <div className={`flex h-screen bg-gray-100 font-sans transition-colors duration-200 ease-in-out ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.div 
        className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out overflow-hidden shadow-lg`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="p-4 flex items-center justify-between">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                className="flex items-center justify-between w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img src="/placeholder.svg?height=32&width=32" alt="ParkSmart Logo" className="h-8 w-auto flex-grow" />
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {!isSidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
        <nav className="mt-8">
          {sidebarItems.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.h2 
                    className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {category.category}
                  </motion.h2>
                )}
              </AnimatePresence>
              {category.items.map((item, itemIndex) => (
                <motion.a
                  key={itemIndex}
                  href="#"
                  className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2 my-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-6 w-6" />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span 
                        className="ml-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              {!isSidebarOpen && (
                <img src="/placeholder.svg?height=32&width=32" alt="ParkSmart Logo" className="h-8 w-auto mr-4" />
              )}
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                ¡Hola, Administrador!
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-600 dark:text-gray-300">
                <Clock className="inline-block mr-2 h-5 w-5" />
                <span>{currentTime}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                <Calendar className="inline-block mr-2 h-5 w-5" />
                <span>{currentDate}</span>
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Administrador</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Seleccionar Operador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Operadores</SelectItem>
                  <SelectItem value="op1">Operador 1</SelectItem>
                  <SelectItem value="op2">Operador 2</SelectItem>
                  <SelectItem value="op3">Operador 3</SelectItem>
                </SelectContent>
              </Select>
              <Button className="mt-4 sm:mt-0" onClick={() => console.log(`Descargando reporte para ${selectedOperator}`)}>
                <Download className="mr-2 h-4 w-4" /> Descargar Reporte
              </Button>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Ganancias Totales', amount: '$ 93.438.778', icon: DollarSign, color: 'from-emerald-500 to-teal-600', trend: '+5.25%' },
                { title: 'Vehículos Hoy', amount: '342', icon: Car, color: 'from-blue-500 to-indigo-600', trend: '+2.5%' },
                { title: 'Tiempo Promedio', amount: '2h 15m', icon: Clock, color: 'from-amber-500 to-orange-600', trend: '-1.5%' },
                { title: 'Operadores Activos', amount: '8', icon: Users, color: 'from-purple-500 to-pink-600', trend: '0%' },
              ].map((item, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="dark:bg-gray-800 overflow-hidden border-none shadow-lg rounded-xl">
                    <CardHeader className={`flex flex-row items-center justify-between py-2 bg-gradient-to-r ${item.color} text-white rounded-t-xl`}>
                      <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                      <div className="rounded-full p-1.5 bg-white bg-opacity-20">
                        <item.icon className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-gray-700 dark:text-white">{item.amount}</div>
                      <p className={`text-sm mt-1 ${item.trend.startsWith('+') ? 'text-green-500' : item.trend.startsWith('-') ? 'text-red-500' : 'text-gray-500'} flex items-center`}>
                        {item.trend.startsWith('+') ? <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                         item.trend.startsWith('-') ? <ArrowRight className="mr-1 h-3 w-3" /> : 
                         null}
                        {item.trend}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <Card className="dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-xl py-3">
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Ingresos Semanales
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl py-3">
                  <CardTitle className="flex items-center text-lg">
                    <Car className="mr-2 h-5 w-5" />
                    Ocupación del Estacionamiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-xl py-3">
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="mr-2 h-5 w-5" />
                    Hora Pico
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-gray-700 dark:text-white">12:00 - 14:00</div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Mayor afluencia de vehículos</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl py-3">
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Tasa de Ocupación
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-gray-700 dark:text-white">78%</div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Promedio diario</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-xl py-3">
                  <CardTitle className="flex items-center text-lg">
                    <CloudRain className="mr-2 h-5 w-5" />
                    Clima en Río Bueno
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-gray-700 dark:text-white">18°C</div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Lluvia ligera</p>
                </CardContent>
              </Card>
            </div>

            <Card className="dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl py-3">
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Últimos Cobros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] bg-gray-100 dark:bg-gray-700"><Hash className="mr-2 h-4 w-4 inline" />ID Ticket</TableHead>
                        <TableHead className="bg-gray-100 dark:bg-gray-700"><Car className="mr-2 h-4 w-4 inline" />Vehículo</TableHead>
                        <TableHead className="bg-gray-100 dark:bg-gray-700"><ArrowRight className="mr-2 h-4 w-4 inline" />Entrada</TableHead>
                        <TableHead className="bg-gray-100 dark:bg-gray-700"><ArrowUpRight className="mr-2 h-4 w-4 inline" />Salida</TableHead>
                        <TableHead className="bg-gray-100 dark:bg-gray-700"><DollarSign className="mr-2 h-4 w-4 inline" />Monto</TableHead>
                        <TableHead className="bg-gray-100 dark:bg-gray-700"><Users className="mr-2 h-4 w-4 inline" />Operador</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: '001', vehicle: 'ABC-123', entry: '10:30', exit: '14:45', amount: '$ 15.000', operator: 'Juan Pérez' },
                        { id: '002', vehicle: 'XYZ-789', entry: '11:15', exit: '15:20', amount: '$ 20.000', operator: 'María González' },
                        { id: '003', vehicle: 'DEF-456', entry: '12:00', exit: '16:30', amount: '$ 22.500', operator: 'Carlos Rodríguez' },
                      ].map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.vehicle}</TableCell>
                          <TableCell>{item.entry}</TableCell>
                          <TableCell>{item.exit}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>{item.operator}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}