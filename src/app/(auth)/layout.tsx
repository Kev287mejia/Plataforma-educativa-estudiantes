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
        {/* Abstract cultural illustration using CSS shapes/gradients */}
        <div className="absolute inset-0 opacity-20 yapti-pattern" />
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-secondary blur-[120px]" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur flex items-center justify-center mb-6">
            <div className="w-6 h-6 border-2 border-white rounded-full" />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Bienvenido a Yapti Learn
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-md">
            La educación llega a cada comunidad. Conectando saberes ancestrales con el futuro digital.
          </p>
        </div>
      </div>
    </div>
  );
}
