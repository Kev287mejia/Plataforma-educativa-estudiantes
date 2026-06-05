"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

// Dynamically import the 3D scene without SSR to prevent hydration errors and improve initial page load
const Scene = dynamic(() => import("@/components/canvas/Scene"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-50" />
});

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      
      {/* 3D Background */}
      <Scene />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90 pointer-events-none" />

      {/* Main Content - Absolute positioned over the 3D canvas */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
          className="text-center w-full max-w-7xl"
        >
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8 shadow-sm pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            La educación llega a Bilwi
          </div>

          {/* Brutalist/Oversized Typography */}
          <h1 className="text-7xl md:text-[9rem] lg:text-[11rem] font-black tracking-tighter text-white leading-[0.85] mb-6 drop-shadow-2xl">
            YAPTI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-teal-400 drop-shadow-lg">
              LEARN
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed mb-12 backdrop-blur-sm bg-black/20 rounded-2xl p-4 border border-white/10">
            Un espacio de aprendizaje intercultural moderno, inmersivo y diseñado especialmente para ti.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
            <Link 
              href="/login"
              className="group relative px-8 py-5 rounded-[2rem] bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden shadow-xl shadow-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Comenzar Aventura</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/intercultural"
              className="px-8 py-5 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              Explorar Cultura
              <Compass className="w-6 h-6 text-secondary" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer / Scroll hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center pointer-events-none"
      >
        <p className="text-sm font-medium tracking-widest uppercase text-slate-400">
          Desarrollado para el Caribe Norte
        </p>
      </motion.div>
    </div>
  );
}
