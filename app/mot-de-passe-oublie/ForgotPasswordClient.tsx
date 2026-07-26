'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import { createOrgClient } from '@/utils/supabase/org-client';

const inputClass =
  'w-full h-[48px] bg-[#111] border border-white/15 rounded-[8px] px-[16px] text-[15px] text-white placeholder:text-[#404040] focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50';

export default function ForgotPasswordClient() {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    setInfo(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const supabase = createOrgClient();

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/compte')}`,
    });

    if (resetError) {
      setError(resetError.message || "Impossible d'envoyer l'e-mail de réinitialisation.");
      setPending(false);
      return;
    }

    setInfo(
      "Si un compte existe pour cette adresse, un e-mail de réinitialisation vient d'être envoyé."
    );
    setPending(false);
  };

  return (
    <AuthPageShell>
      <div className="w-full max-w-[480px] bg-[#141414] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.45)] border border-white/10 p-[40px] max-[900px]:p-[32px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#FFCC00]" />

        <h1 className="text-[28px] font-bold text-white mb-[8px]">Mot de passe oublié</h1>
        <p className="text-[#7F7F7F] text-[15px] mb-[32px]">
          Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.
        </p>

        {error && (
          <div className="mb-[20px] rounded-[8px] border border-red-500/30 bg-red-500/10 px-[16px] py-[12px] text-[14px] text-red-300">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-[20px] rounded-[8px] border border-[#FFCC00]/30 bg-[#FFCC00]/10 px-[16px] py-[12px] text-[14px] text-[#FFCC00]">
            {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="email" className="text-[14px] font-bold text-white">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={pending}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full h-[52px] bg-[#FFCC00] text-black font-semibold text-[16px] rounded-[8px] hover:bg-[#FFD633] transition-colors disabled:opacity-60"
          >
            {pending ? 'Envoi…' : 'Envoyer le lien'}
          </button>
        </form>

        <p className="mt-[24px] text-center text-[14px] text-[#7F7F7F]">
          <Link href="/login" className="font-semibold text-white hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
