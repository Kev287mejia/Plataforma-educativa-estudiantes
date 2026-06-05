"use client";

import { motion } from "framer-motion";
import { Leaf, Info } from "lucide-react";

interface HerbariumCardProps {
  nameMiskitu: string;
  nameSpanish: string;
  scientificName: string;
  uses: string;
  bgGradient: string;
  iconColor: string;
}

export function HerbariumCard({ nameMiskitu, nameSpanish, scientificName, uses, bgGradient, iconColor }: HerbariumCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-3xl p-6 border border-slate-100 shadow-sm cursor-pointer group bg-gradient-to-br ${bgGradient}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Leaf className={`w-24 h-24 ${iconColor} transform rotate-12`} />
      </div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/40 backdrop-blur-sm border border-white/50 text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-4">
          <Leaf className="w-3 h-3" /> Planta Medicinal
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 leading-none mb-1">{nameMiskitu}</h3>
        <p className="text-sm font-medium text-slate-700 mb-4">{nameSpanish}</p>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
          <p className="text-xs font-mono text-slate-500 mb-2 italic border-b border-slate-200/50 pb-2">
            {scientificName}
          </p>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-800 leading-relaxed">
              {uses}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
