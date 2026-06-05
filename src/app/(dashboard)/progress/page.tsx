"use client";

import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Clock, Award, Star, Target, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProgressPage() {
  const [userName, setUserName] = useState("Estudiante");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }
    });
  }, [supabase.auth]);

  const progressData = [
    { title: "Historia y Cultura Miskitu", percent: 100, status: "Completado" },
    { title: "Idioma Miskitu Básico", percent: 70, status: "En curso" },
    { title: "Medicina Ancestral", percent: 45, status: "En curso" },
    { title: "Geografía de la Mosquitia", percent: 0, status: "No iniciado" }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      {/* HEADER TIPO EXPEDIENTE */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Target className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            <TrendingUp className="w-4 h-4" /> Expediente Oficial
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Seguimiento Académico
          </h1>
          <p className="text-slate-500 text-lg">
            Alumno: <span className="font-semibold text-slate-700">{userName}</span>
          </p>
        </div>
      </div>

      {/* MÉTRICAS GLOBALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">1</p>
            <p className="text-sm font-medium text-slate-500">Cursos Terminados</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">14h</p>
            <p className="text-sm font-medium text-slate-500">Horas Estudiadas</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">85%</p>
            <p className="text-sm font-medium text-slate-500">Promedio Global</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* BARRAS DE PROGRESO */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <BookOpen className="w-5 h-5 text-slate-400" /> Detalle por Curso
          </h2>
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {progressData.map((course, idx) => (
                <div key={idx} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{course.title}</h3>
                      <p className={`text-sm font-medium ${course.percent === 100 ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {course.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900">{course.percent}%</span>
                    </div>
                  </div>
                  
                  {/* Visual Progress Bar (The requested ███████░░░ style but modernized) */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.percent}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${course.percent === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INSIGNIAS SIMPLES */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Star className="w-5 h-5 text-slate-400" /> Insignias Obtenidas
          </h2>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Insignia 1 */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Primer Curso</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">Completado</p>
            </div>

            {/* Insignia 2 */}
            <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 mx-auto bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Lector</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">10 Horas</p>
            </div>

            {/* Insignia 3 */}
            <div className="bg-white rounded-2xl p-4 border border-blue-100 text-center shadow-sm hover:-translate-y-1 transition-transform opacity-50 grayscale">
              <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Bilingüe</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">Bloqueado</p>
            </div>

            {/* Insignia 4 */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 text-center shadow-sm hover:-translate-y-1 transition-transform opacity-50 grayscale">
              <div className="w-12 h-12 mx-auto bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-3">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Experto</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">Bloqueado</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
