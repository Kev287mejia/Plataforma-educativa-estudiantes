"use client";

import { useEffect, useState, useRef } from "react";
import { Award, Download, Printer, Medal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CertificatesPage() {
  const [userName, setUserName] = useState("Estudiante");
  const supabase = createClient();
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }
    });
  }, [supabase.auth]);

  const handlePrint = () => {
    window.print();
  };

  // Current Date formatting
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('es-NI', dateOptions);

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      
      {/* Control Panel (Hidden during print via css class below) */}
      <div className="print:hidden bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" /> Mis Certificados
          </h1>
          <p className="text-slate-500 mt-2">
            Has completado 1 curso con excelencia. Tu certificado oficial está listo para descargarse.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Printer className="w-5 h-5" /> Imprimir / PDF
          </button>
        </div>
      </div>

      {/* CERTIFICATE VIEWER / PRINTABLE AREA */}
      <div className="flex justify-center p-4 md:p-8 overflow-x-auto">
        
        <div 
          ref={printRef}
          className="print-container bg-white w-[1056px] h-[816px] flex-shrink-0 relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage: "radial-gradient(circle at center, #ffffff 0%, #fcfdfd 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          {/* Certificate Borders */}
          <div className="absolute inset-4 border-2 border-slate-200" />
          <div className="absolute inset-5 border-[12px] border-double border-primary/20" />
          <div className="absolute inset-8 border border-primary/10" />

          {/* Corner Ornaments */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-primary/40 rounded-tl-3xl" />
          <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-primary/40 rounded-tr-3xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-primary/40 rounded-bl-3xl" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-primary/40 rounded-br-3xl" />

          {/* Content Area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-20 z-10">
            
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg mb-6">
                <Medal className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-[0.2em] text-slate-400 uppercase">Yapti Learn</h2>
            </div>

            <h1 className="text-5xl md:text-7xl text-slate-800 mb-6" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              Certificado de Excelencia
            </h1>

            <p className="text-lg text-slate-500 tracking-widest uppercase mb-12">
              Se otorga el presente certificado a:
            </p>

            {/* Dynamic Name */}
            <div className="w-full max-w-3xl border-b-2 border-slate-300 pb-2 mb-10">
              <p className="text-5xl text-primary font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                {userName}
              </p>
            </div>

            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-16" style={{ fontFamily: 'Georgia, serif' }}>
              Por haber completado satisfactoriamente todas las evaluaciones y requisitos académicos correspondientes al programa de estudio:
              <br/><br/>
              <span className="text-3xl font-bold text-slate-800">Historia y Cultura Miskitu</span>
            </p>

            {/* Signatures & Dates */}
            <div className="w-full max-w-4xl flex justify-between items-end px-12 mt-auto">
              
              <div className="text-center w-64">
                <p className="text-lg text-slate-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>{formattedDate}</p>
                <div className="w-full border-t border-slate-400 pt-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Fecha de Emisión</p>
                </div>
              </div>

              {/* Gold Seal Simulator */}
              <div className="w-32 h-32 rounded-full border-4 border-amber-400 bg-amber-50 flex items-center justify-center relative shadow-xl transform rotate-3">
                <div className="absolute inset-1 rounded-full border border-amber-300 border-dashed" />
                <span className="text-amber-500 font-bold text-center text-[10px] uppercase tracking-widest leading-tight">Sello<br/>Oficial<br/>Aprobado</span>
              </div>

              <div className="text-center w-64">
                <div className="h-10 mb-2 flex items-end justify-center">
                  <span className="text-3xl text-slate-400" style={{ fontFamily: 'Brush Script MT, cursive', opacity: 0.7 }}>Dirección Académica</span>
                </div>
                <div className="w-full border-t border-slate-400 pt-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dirección Académica</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            width: 100%;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: landscape;
            margin: 0;
          }
        }
      `}} />

    </div>
  );
}
