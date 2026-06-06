import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative">
      {/* Background decoration for mobile */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5 md:hidden" />
      
      {/* Form section */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 z-10 relative bg-white/60 md:bg-white backdrop-blur-md">
        <div className="w-full max-w-sm mx-auto">
          {children}
        </div>
      </div>

      {/* Visual section (hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
        
        {/* Background Image of Bilwi */}
        <Image 
          src="/images/bilwi-auth-bg.png" 
          alt="Cultura de Bilwi"
          fill
          className="object-cover opacity-80"
          priority
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur flex items-center justify-center mb-6">
            <div className="w-6 h-6 border-2 border-white rounded-full" />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-md">
            Bienvenido a Yapti Learn
          </h2>
          <p className="text-xl text-slate-200 font-light max-w-md drop-shadow">
            La educación llega a cada comunidad. Conectando saberes ancestrales con el futuro digital.
          </p>
        </div>
      </div>
    </div>
  );
}
