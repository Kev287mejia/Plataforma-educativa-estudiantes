"use client";

import { useState } from "react";
import { 
  UploadCloud, FileText, Headphones, BookOpen, 
  CheckCircle2, Users, Search, Target, Plus, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherPanelPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [quizQuestion, setQuizQuestion] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate network delay for thesis presentation
    setTimeout(() => {
      setIsUploading(false);
      setShowSuccess(true);
      // Reset form
      setTitle("");
      setContent("");
      setPdfFile(null);
      setAudioFile(null);
      setQuizQuestion("");
      
      // Hide success message after 4s
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1500);
  };

  const [students, setStudents] = useState([
    { id: 1, name: "María González", email: "maria.g@email.com", progress: 85, role: "estudiante" },
    { id: 2, name: "Juan Pérez", email: "juan.p@email.com", progress: 40, role: "estudiante" },
    { id: 3, name: "Prof. Ana Martínez", email: "ana.m@email.com", progress: 100, role: "docente" },
    { id: 4, name: "Carlos Ruiz", email: "carlos.r@email.com", progress: 15, role: "estudiante" },
    { id: 5, name: "Luisa Fernández", email: "luisa.f@email.com", progress: 60, role: "estudiante" },
  ]);

  const handleRoleChange = (id: number, newRole: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, role: newRole } : s));
  };

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-lg relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Shield className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-500/30">
            <Shield className="w-4 h-4" /> Panel Docente
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Gestión Educativa
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Sube contenido nuevo a tus cursos y supervisa el progreso de tus alumnos de forma directa y sencilla.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUMNA IZQUIERDA: GESTOR DE CONTENIDO */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <BookOpen className="w-5 h-5 text-primary" /> Subir Nueva Clase
          </h2>

          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 mb-6"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <p className="font-medium text-sm">¡Clase publicada exitosamente en la plataforma!</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Título de la Lección</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Módulo 1: Introducción a la historia"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Contenido Principal (Texto)</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe el texto de lectura de la clase..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SUBIR PDF */}
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className={`p-4 rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-2 text-center h-full
                  ${pdfFile ? 'border-primary bg-blue-50 text-primary' : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300'}`}>
                  <FileText className={`w-8 h-8 ${pdfFile ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="text-sm font-medium">{pdfFile ? pdfFile.name : 'Subir Documento (PDF)'}</span>
                </div>
              </div>

              {/* SUBIR AUDIO */}
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  accept="audio/mp3,audio/wav"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className={`p-4 rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-2 text-center h-full
                  ${audioFile ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300'}`}>
                  <Headphones className={`w-8 h-8 ${audioFile ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="text-sm font-medium">{audioFile ? audioFile.name : 'Subir Audio (MP3)'}</span>
                </div>
              </div>
            </div>

            {/* CREAR QUIZ */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-500" /> Crear Quiz (Opcional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  placeholder="Ej: ¿Qué significa Yapti?"
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <button type="button" className="px-4 py-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors font-medium">
                  + Opción
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading || (!title || !content)}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><UploadCloud className="w-5 h-5" /> Publicar Clase en la Plataforma</>
              )}
            </button>
          </form>
        </section>

        {/* COLUMNA DERECHA: ESTUDIANTES INSCRITOS */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-600" /> Estudiantes Inscritos
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar alumno..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-300 w-48"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto pr-2">
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${student.role === 'docente' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-600'}`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {student.name}
                        {student.role === 'docente' && <Shield className="w-3 h-3 text-purple-500" />}
                      </p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:ml-auto">
                    {/* Role Selector */}
                    <select 
                      value={student.role}
                      onChange={(e) => handleRoleChange(student.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-md border focus:outline-none transition-colors ${
                        student.role === 'docente' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <option value="estudiante">Estudiante</option>
                      <option value="docente">Docente</option>
                    </select>

                    {/* Progress */}
                    <div className="text-right flex flex-col items-end gap-1 w-20">
                      <span className={`text-sm font-bold ${student.progress === 100 ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {student.progress}%
                      </span>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                          style={{ width: `${student.progress}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 text-sm flex items-center justify-center gap-2">
            Descargar Reporte (Excel) <DownloadIcon />
          </button>
        </section>

      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  );
}
