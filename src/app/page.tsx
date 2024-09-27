'use client'

import { motion } from 'framer-motion'
import { Clock, Smartphone, CreditCard, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useState, useEffect } from 'react'

type FeatureProps = {
  icon: React.ReactNode
  title: string
  description: string
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <motion.div
    className="flex flex-col items-center text-center p-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-blue-300 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-blue-100">{title}</h3>
    <p className="text-blue-200">{description}</p>
  </motion.div>
)

type CountdownProps = {
  targetDate: Date
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, targetDate.getTime() - new Date().getTime()))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return (
    <div className="flex justify-center space-x-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-300">{days}</div>
        <div className="text-sm text-blue-200">Días</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-300">{hours}</div>
        <div className="text-sm text-blue-200">Horas</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-300">{minutes}</div>
        <div className="text-sm text-blue-200">Minutos</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-300">{seconds}</div>
        <div className="text-sm text-blue-200">Segundos</div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f5c] text-blue-100 font-sans">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <Image src="/images/sur.png" alt="Sur Innova Logo" width={150} height={50} />
          <Button variant="outline" className="text-blue-100 border-blue-300 hover:bg-blue-800">Contacto</Button>
        </nav>
      </header>

      <main>
        <section className="container mx-auto py-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-blue-100"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ParkSmart
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            La solución inteligente para el estacionamiento urbano
          </motion.p>
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-lg text-blue-300 max-w-2xl mx-auto">
              ParkSmart revoluciona la forma en que se controlarán los estacionamientos. 
              Con nuestra app, podrás tener control sobre tus ganancias y rendimiento.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Image src="/placeholder.svg" alt="App Preview" width={300} height={600} className="mx-auto rounded-lg shadow-lg" />
          </motion.div>
        </section>

        <section className="py-20 bg-[#0c1266]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">Características Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Feature
                icon={<Clock size={48} strokeWidth={1.5} />}
                title="Pago por Tiempo Real"
                description="El cliente pagará por el tiempo exacto de estacionamiento"	
              />
              <Feature
                icon={<Smartphone size={48} strokeWidth={1.5} />}
                title="Fácil de Usar"
                description="Interfaz intuitiva para una perfecta experiencia para sus operadores"
              />
              <Feature
                icon={<CreditCard size={48} strokeWidth={1.5} />}
                title="Control Preciso de Ganancias"
                description="Usted podrá tener control sobre sus ganancias y su rendimiento"
              />
              <Feature
                icon={<MapPin size={48} strokeWidth={1.5} />}
                title="Inteligente Localización"
                description="Podrás saber que operadores y ubicaciones generan más ganancias"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto py-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-100">Próximamente</h2>
          <p className="text-xl mb-8 text-blue-200">Nuestra aplicación estará disponible muy pronto</p>
          <Countdown targetDate={new Date('2024-12-31T23:59:59')} />
        </section>
      </main>

      <footer className="bg-[#080c4a] text-blue-200 py-12">
        <div className="container mx-auto text-center">
          <p className="mb-4">Desarrollado por Spectrum Code Software para Sur Innova Limitada</p>
          <p>&copy; {new Date().getFullYear()} Sur Innova Limitada. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}