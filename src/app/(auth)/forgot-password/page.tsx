"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError("Error de configuración: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Recuperar Contraseña</h1>
        <p className="text-slate-500 mt-2">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
        </p>
      </div>

      {success ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center text-center space-y-4"
        >
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-emerald-800 font-bold text-lg">Correo enviado</h3>
            <p className="text-emerald-600 text-sm mt-1">
              Revisa tu bandeja de entrada o la carpeta de spam para encontrar el enlace de recuperación.
            </p>
          </div>
          <Link 
            href="/login"
            className="mt-4 py-2 px-6 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            Volver a inicio de sesión
          </Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Enviar enlace
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-600">
            ¿Recordaste tu contraseña?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      )}
    </motion.div>
  );
}
