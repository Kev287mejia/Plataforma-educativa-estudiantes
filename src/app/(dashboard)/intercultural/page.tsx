"use client";

import { motion } from "framer-motion";
import { Compass, Leaf, Music, BookOpen, Quote, ChevronRight } from "lucide-react";
import { AudioPlayer } from "@/components/intercultural/AudioPlayer";
import { HerbariumCard } from "@/components/intercultural/HerbariumCard";

export default function InterculturalLibraryPage() {
  return (
    <div className="space-y-12 pb-16 max-w-7xl mx-auto">
      
      {/* MUSEUM HERO SECTION */}
      <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 yapti-pattern mix-blend-overlay" />
        <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[150%] bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[150%] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 shadow-sm">
            <Compass className="w-4 h-4 text-amber-400" />
            Patrimonio Vivo
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Nuestra Identidad,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
              Nuestra Fuerza.
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-2xl">
            Explora el museo digital de Bilwi. Un repositorio sagrado que preserva la medicina ancestral, la oralidad comunitaria y la riqueza de la lengua Miskitu.
          </p>
        </div>
      </section>

      {/* HISTORIAS Y ORALIDAD (MASONRY LAYOUT) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="text-purple-600 w-6 h-6" />
              Historias Comunitarias
            </h2>
            <p className="text-slate-500 mt-1">La oralidad que construye nuestra memoria.</p>
          </div>
          <button className="hidden sm:flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
            Ver todas <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer shadow-md">
            <Quote className="absolute right-6 top-6 w-20 h-20 text-white/5 rotate-12 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider w-max mb-8 border border-white/10">Leyenda</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">El Rey Mosco y el Tratado</h3>
                <p className="text-slate-300 line-clamp-2">Una mirada profunda a cómo las comunidades originarias mantuvieron su autonomía durante la época colonial en la Mosquitia.</p>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-purple-50 rounded-3xl p-8 border border-purple-100 relative group cursor-pointer shadow-sm">
            <span className="inline-block px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider w-max mb-6">Testimonio</span>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">La Fundación de Bilwi</h3>
            <p className="text-slate-600 text-sm">Relato de los ancianos sobre los primeros asentamientos pesqueros.</p>
          </motion.div>
        </div>
      </section>

      {/* MEDICINA ANCESTRAL (HERBARIO) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Leaf className="text-emerald-500 w-6 h-6" />
              Medicina Ancestral
            </h2>
            <p className="text-slate-500 mt-1">Sabiduría de la tierra y herbario digital comunitario.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HerbariumCard 
            nameMiskitu="Kruku"
            nameSpanish="Hombre Grande"
            scientificName="Quassia amara"
            uses="Se hierve la corteza y se toma como infusión amarga para tratar problemas estomacales severos, parásitos y fiebres intensas."
            bgGradient="from-emerald-50 to-teal-50"
            iconColor="text-emerald-500"
          />
          <HerbariumCard 
            nameMiskitu="Susu"
            nameSpanish="Alcotán"
            scientificName="Cissampelos pareira"
            uses="Las hojas se machacan y se aplican como cataplasma para aliviar mordeduras de serpientes, infecciones cutáneas y calambres."
            bgGradient="from-lime-50 to-green-50"
            iconColor="text-lime-600"
          />
          <HerbariumCard 
            nameMiskitu="Tual"
            nameSpanish="Guarumo"
            scientificName="Cecropia peltata"
            uses="Tradicionalmente, las hojas secas se preparan en té para regular la presión arterial alta y tratar problemas respiratorios como el asma."
            bgGradient="from-teal-50 to-emerald-100"
            iconColor="text-teal-600"
          />
        </div>
      </section>

      {/* MÚSICA INDÍGENA E IDIOMA */}
      <section className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Music className="w-4 h-4" /> Fonoteca Virtual
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Sonidos de la Costa
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              La música Miskitu es el latido de la comunidad. Escucha instrumentos autóctonos como la guitarra de coco, la caparazón de tortuga (Kuswa) y los cantos tradicionales del King Pulanka.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider text-center">Frase Miskitu del Día</h4>
              <div className="text-center">
                <p className="text-2xl font-black text-primary mb-2">Naksa, nahki sma?</p>
                <p className="text-slate-500 italic">"Hola, ¿cómo estás?"</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AudioPlayer 
              title="Danza King Pulanka"
              artist="Músicos Tradicionales de Bilwi"
              duration="3:45"
            />
            <AudioPlayer 
              title="Canto Luluk"
              artist="Coro de Ancianas Miskitu"
              duration="2:10"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
