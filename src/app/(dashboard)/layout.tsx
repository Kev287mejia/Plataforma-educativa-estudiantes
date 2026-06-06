"use client";

import { useState, useEffect } from "react";
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
  { icon: Award, label: "Certificados", href: "/certificates" },
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
    <div className="h-screen w-full flex overflow-hidden p-2 sm:p-4 lg:p-6 gap-2 sm:gap-4 lg:gap-6 relative bg-slate-50">
      
      {/* 🎨 Dribbble Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-400/10 blur-[100px]" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden rounded-3xl"
          />
        )}
      </AnimatePresence>

      {/* Floating Sidebar */}
      <aside 
        className="h-full w-72 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white flex-col shrink-0 overflow-hidden relative z-50 transition-all hidden md:flex"
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Yapti Learn
          </h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500">
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
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
          
          {userRole === 'admin' && (
            <Link 
              href="/admin"
              className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-medium mt-6 border border-red-100 ${
                pathname === '/admin'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 translate-x-1' 
                  : 'text-red-500 bg-red-50/50 hover:bg-red-50 hover:translate-x-1'
              }`}
            >
              <Shield className={`w-5 h-5 ${pathname === '/admin' ? 'text-white' : 'text-red-400'}`} />
              Panel Admin
            </Link>
          )}
        </div>

        <div className="p-4 bg-slate-50/50 m-4 rounded-[2rem]">
          <Link href="/settings" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all font-medium">
            <Settings className="w-5 h-5 text-slate-400" />
            Configuración
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full mt-1 flex items-center gap-4 px-5 py-3.5 rounded-2xl text-red-500 hover:bg-white transition-all text-left font-medium"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Floating Card */}
      <main className="flex-1 flex flex-col min-w-0 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white overflow-hidden relative">
        <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-xl border-b border-slate-100/50 h-20 flex items-center justify-between px-6 md:px-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <Link href="/settings" className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white hover:scale-105 transition-transform cursor-pointer">
              {userInitials}
            </Link>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto relative custom-scrollbar">
          <div className="absolute inset-0 z-0 yapti-pattern opacity-[0.03] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
