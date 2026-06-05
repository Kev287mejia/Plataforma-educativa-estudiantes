"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { 
  PlayCircle, 
  BookOpen, 
  Award, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  TrendingUp,
  BookMarked
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Estudiante");
  const [greeting, setGreeting] = useState("Buenos días");
  const supabase = createClient();

  useEffect(() => {
    // Set intelligent greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Buenos días");
    else if (hour < 18) setGreeting("Buenas tardes");
    else setGreeting("Buenas noches");

    // Get user name
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name.split(' ')[0]);
      }
    });
  }, [supabase.auth]);
  
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      
      {/* HERO / GREETING SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {greeting}, {userName}
          </h1>
          <p className="text-slate-500 text-lg mt-2 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-primary" />
            Continúa aprendiendo desde donde quedaste.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN COLUMN (Cursos y Lecciones) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CURSOS INSCRITOS */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Cursos Inscritos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Curso 1 */}
              <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">En curso</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">Historia y Cultura Miskitu</h3>
                <p className="text-sm text-slate-500 mb-6">Módulo 2: Asentamientos principales</p>
                
                <div className="mt-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">Progreso</span>
                    <span className="font-bold text-primary">65%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[65%]" />
                  </div>
                  <button className="w-full mt-4 py-2 bg-slate-50 text-primary font-medium rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm">
                    <PlayCircle className="w-4 h-4" /> Continuar
                  </button>
                </div>
              </motion.div>

              {/* Curso 2 */}
              <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">En curso</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">Idioma Miskitu Básico</h3>
                <p className="text-sm text-slate-500 mb-6">Módulo 1: Saludos y cortesía</p>
                
                <div className="mt-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">Progreso</span>
                    <span className="font-bold text-emerald-600">30%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[30%]" />
                  </div>
                  <button className="w-full mt-4 py-2 bg-slate-50 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm">
                    <PlayCircle className="w-4 h-4" /> Continuar
                  </button>
                </div>
              </motion.div>

            </div>
          </section>

          {/* LECCIONES RECIENTES */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Lecciones Recientes</h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">1. Orígenes de la Costa Caribe</h4>
                    <p className="text-sm text-slate-500">Historia y Cultura Miskitu • Video de 15 min</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer bg-blue-50/50">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                    <PlayCircle className="w-5 h-5 ml-0.5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary">2. El Tratado Zeledón-Wyke</h4>
                    <p className="text-sm text-slate-500">Historia y Cultura Miskitu • Video de 20 min</p>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-white px-2 py-1 rounded-md border border-blue-100">Viendo</span>
                </div>

                <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shrink-0 border border-slate-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-400">3. La Reserva Mosquitia</h4>
                    <p className="text-sm text-slate-400">Historia y Cultura Miskitu • Lectura</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* SIDEBAR COLUMN (Estadísticas, Materiales, Actividad) */}
        <div className="space-y-8">
          
          {/* PROGRESO ACADÉMICO */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Progreso Académico
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900">8.5</p>
                  <p className="text-sm text-slate-500">Promedio General</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Tareas entregadas</span>
                    <span className="font-medium">12/15</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-800 rounded-full w-[80%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Cuestionarios</span>
                    <span className="font-medium">4/4</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MATERIAL DESCARGABLE */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-slate-600" />
              Material Descargable
            </h2>
            <div className="space-y-3">
              <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Sílabo Historia Miskitu</p>
                    <p className="text-xs text-slate-500">PDF • 2.4 MB</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>

              <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Guía de Vocabulario</p>
                    <p className="text-xs text-slate-500">Excel • 1.1 MB</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </section>

          {/* ACTIVIDAD RECIENTE */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-600" />
              Actividad Reciente
            </h2>
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
              
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary" />
                <p className="text-sm font-semibold text-slate-900">Cuestionario #1 Aprobado</p>
                <p className="text-xs text-slate-500 mt-1">Calificación: 95/100</p>
                <p className="text-[10px] text-slate-400 mt-1">Hace 2 horas</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300" />
                <p className="text-sm font-semibold text-slate-900">Lección Completada</p>
                <p className="text-xs text-slate-500 mt-1">Orígenes de la Costa Caribe</p>
                <p className="text-[10px] text-slate-400 mt-1">Ayer a las 14:30</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300" />
                <p className="text-sm font-semibold text-slate-900">Inicio de Sesión</p>
                <p className="text-xs text-slate-500 mt-1">Nuevo dispositivo detectado</p>
                <p className="text-[10px] text-slate-400 mt-1">Hace 2 días</p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
