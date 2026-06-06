import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8">
      
      {/* 1. Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/bilwi-auth-bg.png" 
          alt="Cultura de Bilwi"
          fill
          className="object-cover"
          priority
        />
        {/* Soft elegant overlay to ensure the floating card pops and text is readable */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
      </div>

      {/* 2. Floating Content Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        {/* Left Side: Cultural Text / Branding */}
        <div className="hidden md:flex flex-col flex-1 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-8 border border-white/30 shadow-xl">
            <div className="w-8 h-8 border-4 border-white rounded-full" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg leading-tight">
            Bienvenido a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              Yapti Learn
            </span>
          </h1>
          <p className="text-xl text-slate-100 font-light max-w-md drop-shadow-md leading-relaxed">
            La educación llega a cada comunidad. Conectando nuestros saberes ancestrales con el futuro digital.
          </p>
        </div>

        {/* Right Side: The Glassmorphic Form Card */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 p-8 sm:p-10 transform transition-all hover:scale-[1.01]">
          {children}
        </div>

      </div>
    </div>
  );
}
