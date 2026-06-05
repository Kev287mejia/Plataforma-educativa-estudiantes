"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  BookOpen, 
  Compass, 
  Award, 
  Settings, 
  Target,
  LogOut,
  Menu,
  X,
  Bell,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  { icon: Home, label: "Inicio", href: "/dashboard" },
  { icon: BookOpen, label: "Mis Cursos", href: "/courses" },
  { icon: Target, label: "Mi Progreso", href: "/progress" },
  { icon: Compass, label: "Cultura", href: "/intercultural" },
  { icon: Award, label: "Evaluaciones", href: "/quiz" },
  { icon: Settings, label: "Configuración", href: "/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInitials, setUserInitials] = useState("US");
  const [userRole, setUserRole] = useState("estudiante");
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Obtener los datos del usuario logueado
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Get name
        if (user.user_metadata?.full_name) {
          const nameParts = user.user_metadata.full_name.split(' ');
          const initials = nameParts.length > 1 
            ? `${nameParts[0][0]}${nameParts[1][0]}` 
            : nameParts[0][0];
          setUserInitials(initials.toUpperCase());
        }

        // Get Role from public.profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        
        if (profile?.role) {
          setUserRole(profile.role);
        }
      }
    }
    loadData();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Yapti Learn
          </h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Menú Principal
          </p>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
          
          {userRole === 'admin' && (
            <Link 
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mt-4 border border-red-100 ${
                pathname === '/admin'
                  ? 'bg-red-50 text-red-600 font-medium' 
                  : 'text-red-500 hover:bg-red-50'
              }`}
            >
              <Shield className={`w-5 h-5 ${pathname === '/admin' ? 'text-red-600' : 'text-red-400'}`} />
              Panel Admin
            </Link>
          )}
        </div>

        <div className="p-4 border-t border-slate-100">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <Settings className="w-5 h-5 text-slate-400" />
            Configuración
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all text-left"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Cerrar Sesión
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
              {userInitials}
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto relative">
          <div className="absolute inset-0 z-0 yapti-pattern opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
