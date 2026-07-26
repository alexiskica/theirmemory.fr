'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import GoogleWorkspaceAuthButton from '@/components/auth/GoogleWorkspaceAuthButton';
import PasswordInput from '@/components/auth/PasswordInput';
import { ensureAccountProfile, safeNextPath } from '@/lib/account-profile';
import { GOOGLE_WORKSPACE_DOMAIN } from '@/lib/volunteer-workspace';
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
    <AuthPageShell>
      <div className="w-full max-w-[480px] bg-[#141414] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.45)] border border-white/10 p-[40px] max-[900px]:p-[32px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#FFCC00]" />

        <h1 className="text-[28px] font-bold text-white mb-[8px]">Connexion</h1>
        <p className="text-[#7F7F7F] text-[15px] mb-[32px]">
          Accédez à votre espace personnel Their memory avec votre e-mail et votre mot de passe.
        </p>

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
              required
              autoComplete="email"
              disabled={pending}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between gap-[12px]">
              <label htmlFor="password" className="text-[14px] font-bold text-white">
                Mot de passe
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-[13px] font-semibold text-[#FFCC00] hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              required
              autoComplete="current-password"
              disabled={pending}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full h-[52px] bg-[#FFCC00] text-black font-semibold text-[16px] rounded-[8px] hover:bg-[#FFD633] transition-colors disabled:opacity-60"
          >
            {pending ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-[32px] pt-[28px] border-t border-white/10">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#FFCC00] mb-[8px]">
            Bénévoles
          </p>
          <p className="text-[14px] text-[#A3A3A3] leading-[1.6] mb-[16px]">
            Si vous disposez d&apos;un compte Google Workspace{' '}
            <span className="font-semibold text-white">@{GOOGLE_WORKSPACE_DOMAIN}</span>, vous pouvez
            vous connecter plus rapidement.
          </p>
          <GoogleWorkspaceAuthButton next={next} />
        </div>

        <p className="mt-[24px] text-center text-[14px] text-[#7F7F7F]">
          Pas encore de compte ?{' '}
          <Link
            href={`/inscription?next=${encodeURIComponent(next)}`}
            className="font-semibold text-white hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}

export default function LoginClient() {
  return (
    <Suspense
      fallback={
        <AuthPageShell>
          <div className="w-full max-w-[480px] bg-[#141414] rounded-[16px] border border-white/10 p-[40px]">
            <p className="text-[#7F7F7F]">Chargement…</p>
          </div>
        </AuthPageShell>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
