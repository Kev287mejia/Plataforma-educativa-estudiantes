"use client";

import Link from "next/link";
import { BookOpen, PlayCircle, SignalHigh, WifiOff } from "lucide-react";

export default function CoursesCatalogPage() {
  const courses = [
    {
      id: "historia-miskitu",
      title: "Historia y Cultura Miskitu",
      desc: "Conoce los orígenes, los tratados y la formación de la autonomía en la Costa Caribe.",
      modules: 8,
      progress: 65,
      color: "bg-blue-50 text-blue-700",
      iconColor: "text-blue-500",
      offline: true,
    },
    {
      id: "idioma-basico",
      title: "Idioma Miskitu Básico",
      desc: "Aprende saludos, cortesía y vocabulario vital para comunicarte en Bilwi.",
      modules: 12,
      progress: 30,
      color: "bg-emerald-50 text-emerald-700",
      iconColor: "text-emerald-500",
      offline: true,
    },
    {
      id: "geografia",
      title: "Geografía de la Mosquitia",
      desc: "Estudio de los ríos, comunidades y asentamientos principales.",
      modules: 5,
      progress: 0,
      color: "bg-amber-50 text-amber-700",
      iconColor: "text-amber-500",
      offline: false,
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mis Cursos</h1>
        <p className="text-slate-500 mt-2">
          Todo tu contenido educativo optimizado para escuchar sin internet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-xl ${course.color} flex items-center justify-center`}>
                <BookOpen className="w-7 h-7" />
              </div>
              {course.offline ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <WifiOff className="w-3 h-3" /> Offline Ready
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  <SignalHigh className="w-3 h-3" /> Online Only
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{course.title}</h2>
            <p className="text-sm text-slate-500 mb-6 flex-1">{course.desc}</p>
            
            <div className="mt-auto space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{course.modules} Módulos</span>
                  <span className="font-bold text-primary">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              
              <Link 
                href={`/courses/${course.id}`}
                className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Entrar al Aula
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
