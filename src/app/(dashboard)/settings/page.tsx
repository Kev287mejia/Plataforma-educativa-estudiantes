"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Save, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [userProfile, setUserProfile] = useState<{
    id: string;
    full_name: string;
    role: string;
    email: string;
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setUserProfile({
        id: user.id,
        email: user.email || "",
        full_name: profile?.full_name || user.user_metadata?.full_name || "",
        role: profile?.role || "estudiante",
      });
      setIsLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    setIsSaving(true);
    setSuccess(false);

    try {
      // 1. Update auth.users metadata
      await supabase.auth.updateUser({
        data: { full_name: userProfile.full_name }
      });

      // 2. Update public.profiles
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: userProfile.full_name })
        .eq("id", userProfile.id);

      if (!error) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Configuración</h1>
        <p className="text-slate-500 mt-2">
          Gestiona tu información personal y los detalles de tu cuenta.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white">
              {userProfile?.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{userProfile?.full_name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Shield className={`w-4 h-4 ${userProfile?.role === 'admin' ? 'text-red-500' : 'text-primary'}`} />
                <span className={`text-sm font-medium capitalize ${userProfile?.role === 'admin' ? 'text-red-500' : 'text-primary'}`}>
                  Rol: {userProfile?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Detalles Personales</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={userProfile?.full_name || ""}
                  onChange={(e) => setUserProfile(prev => prev ? {...prev, full_name: e.target.value} : null)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Correo Electrónico (No editable)
              </label>
              <div className="relative opacity-60">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={userProfile?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {success ? (
              <span className="flex items-center text-emerald-600 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Cambios guardados con éxito
              </span>
            ) : (
              <span />
            )}
            
            <button
              type="submit"
              disabled={isSaving}
              className="py-3 px-6 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 flex items-center disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
