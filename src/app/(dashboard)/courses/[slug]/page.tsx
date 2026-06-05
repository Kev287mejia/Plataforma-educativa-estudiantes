"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipForward, SkipBack, 
  Download, Moon, Sun, ArrowLeft, Headphones 
} from "lucide-react";
import Link from "next/link";

export default function LessonAudioPage({ params }: { params: { slug: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [batterySaver, setBatterySaver] = useState(false);

  // Simulated Lesson Data
  const lesson = {
    title: "1. Orígenes de la Costa Caribe",
    course: "Historia y Cultura Miskitu",
    audioSize: "1.2 MB",
    duration: "14:30",
    content: `La historia de la Costa Caribe de Nicaragua está intrínsecamente ligada al Mar Caribe y a los extensos ríos que conectan el interior con la costa. A diferencia del Pacífico, la Mosquitia nunca fue conquistada militarmente por el Imperio Español de manera definitiva.

En su lugar, los miskitos forjaron alianzas comerciales y políticas estratégicas con bucaneros, comerciantes y la Corona Británica, lo que dio origen al Reino de la Mosquitia. Esta alianza permitió a las comunidades originarias mantener una profunda autonomía territorial y cultural durante siglos.

El Tratado Zeledón-Wyke en 1860, y posteriormente la Reincorporación de la Mosquitia en 1894 bajo el gobierno de José Santos Zelaya, marcaron el inicio de la anexión formal de estos territorios al Estado de Nicaragua. Sin embargo, la identidad cultural, la lengua y el derecho consuetudinario se mantienen vivos hasta nuestros días.`
  };

  return (
    <div className={`min-h-[85vh] rounded-3xl transition-colors duration-500 ${batterySaver ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-900'}`}>
      
      {/* TOP NAVIGATION */}
      <div className={`px-6 py-4 flex items-center justify-between border-b ${batterySaver ? 'border-slate-800' : 'border-slate-100'}`}>
        <Link href="/courses" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Volver a Cursos</span>
        </Link>

        <button 
          onClick={() => setBatterySaver(!batterySaver)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            batterySaver 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {batterySaver ? (
            <><Sun className="w-4 h-4" /> Modo Lectura</>
          ) : (
            <><Moon className="w-4 h-4" /> Ahorro de Batería</>
          )}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <p className={`text-sm font-bold uppercase tracking-widest mb-3 ${batterySaver ? 'text-primary' : 'text-primary'}`}>
            {lesson.course}
          </p>
          <h1 className={`text-3xl md:text-5xl font-black tracking-tight mb-6 ${batterySaver ? 'text-white' : 'text-slate-900'}`}>
            {lesson.title}
          </h1>
        </div>

        {/* PODCAST PLAYER */}
        <div className={`rounded-3xl p-6 md:p-8 mb-10 shadow-2xl transition-all ${batterySaver ? 'bg-slate-900 shadow-black/50 border border-slate-800' : 'bg-slate-900 text-white shadow-primary/10'}`}>
          <div className="flex flex-col items-center">
            
            {/* Visualizer Mock */}
            <div className="w-full flex items-end justify-center gap-1 h-12 mb-8 opacity-50">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={isPlaying ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "20%" }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 md:w-2 bg-primary rounded-t-full"
                />
              ))}
            </div>

            {/* Scrubber */}
            <div className="w-full space-y-3 mb-8">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                <div 
                  className="h-full bg-primary rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-slate-400 font-medium">
                <span>02:15</span>
                <span>{lesson.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
              <button className="text-slate-400 hover:text-white transition-colors">
                <SkipBack className="w-8 h-8 fill-current" />
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg shadow-primary/30 transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-2" />
                )}
              </button>
              
              <button className="text-slate-400 hover:text-white transition-colors">
                <SkipForward className="w-8 h-8 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}
        <button className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg mb-12 transition-all ${
          batterySaver 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' 
            : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
        }`}>
          <Download className="w-6 h-6" />
          Descargar Audio MP3 ({lesson.audioSize})
        </button>

        {/* GUIDED READING TEXT */}
        <AnimatePresence>
          {!batterySaver && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="prose prose-lg md:prose-xl max-w-none pb-12"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Headphones className="w-6 h-6 text-slate-400" />
                <h3 className="text-slate-500 font-semibold m-0">Lectura Guiada</h3>
              </div>
              
              {lesson.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {batterySaver && (
          <div className="text-center pb-12 pt-8 opacity-30">
            <Moon className="w-12 h-12 mx-auto mb-4" />
            <p>Pantalla atenuada para ahorrar batería mientras escuchas.</p>
          </div>
        )}

      </div>
    </div>
  );
}
