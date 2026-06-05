import Link from "next/link";
import { ArrowLeft, PlayCircle, Clock } from "lucide-react";

export default async function InterculturalContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Convert slug to a readable title
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link href="/intercultural" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a la Biblioteca
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="relative z-10">
          <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg mb-4 inline-block">
            Módulo Cultural
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-slate-500 text-sm mb-8">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 15 min de lectura</span>
            <span>•</span>
            <span>Autores Comunitarios</span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Esta sección está dedicada a preservar y compartir el conocimiento ancestral de nuestras comunidades.
              El contenido detallado sobre <strong>{title}</strong> se cargará aquí desde la base de datos principal de Supabase.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 my-8 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Lección en Audio</h3>
                <p className="text-sm text-slate-500">Escucha la narración tradicional en idioma original.</p>
              </div>
              <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                <PlayCircle className="w-6 h-6" />
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
