'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import { ensureAccountProfile, safeNextPath } from '@/lib/account-profile';
import { createOrgClient } from '@/utils/supabase/org-client';

const inputClass =
  'w-full h-[48px] bg-[#111] border border-white/15 rounded-[8px] px-[16px] text-[15px] text-white placeholder:text-[#404040] focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get('next'));
  const errorFromUrl = searchParams.get('error');
  const [error, setError] = useState<string | null>(
    errorFromUrl ? decodeURIComponent(errorFromUrl) : null
  );
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');

    const supabase = createOrgClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe.');
      setPending(false);
      return;
    }

    if (data.user) {
      await ensureAccountProfile(supabase, data.user);
    }

    router.push(next);
    router.refresh();
  };

  return (
    <AuthPageShell
      title="Connexion"
      subtitle="Accédez à votre espace Their memory pour retrouver vos contenus épinglés."
    >
      {error && (
        <div className="mb-[20px] rounded-[8px] border border-red-500/30 bg-red-500/10 px-[16px] py-[12px] text-[14px] text-red-300">
          {error}
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
            autoComplete="email"
            required
            disabled={pending}
            className={inputClass}
            placeholder="vous@exemple.fr"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center justify-between gap-[12px]">
            <label htmlFor="password" className="text-[14px] font-bold text-white">
              Mot de passe
            </label>
            <Link
              href="/mot-de-passe-oublie"
              className="text-[13px] text-[#7F7F7F] hover:text-white transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={pending}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-[8px] h-[48px] rounded-[8px] bg-[#FFCC00] text-black font-semibold text-[15px] hover:bg-[#FFD633] transition-colors disabled:opacity-50"
        >
          {pending ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p className="mt-[24px] text-[14px] text-[#7F7F7F] text-center">
        Pas encore de compte ?{' '}
        <Link href={`/inscription?next=${encodeURIComponent(next)}`} className="text-white font-semibold hover:text-[#FFCC00] transition-colors">
          Créer un compte
        </Link>
      </p>
    </AuthPageShell>
  );
}

export default function LoginClient() {
  return (
    <Suspense fallback={<AuthPageShell title="Connexion" subtitle="Chargement…"><p className="text-[#7F7F7F]">Chargement…</p></AuthPageShell>}>
      <LoginForm />
    </Suspense>
  );
}
