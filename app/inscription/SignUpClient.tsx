'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import PasswordStrengthField from '@/components/auth/PasswordStrengthField';
import { ensureAccountProfile, safeNextPath } from '@/lib/account-profile';
import { getExistingAccountSignUpMessage } from '@/lib/auth-signup';
import { getPasswordValidationError } from '@/lib/password-strength';
import { createOrgClient } from '@/utils/supabase/org-client';

const inputClass =
  'w-full h-[48px] bg-[#111] border border-white/15 rounded-[8px] px-[16px] text-[15px] text-white placeholder:text-[#404040] focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50';

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get('next'));
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState('');

  const passwordError = password.length > 0 ? getPasswordValidationError(password) : null;
  const canSubmit = password.length > 0 && !passwordError;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    setInfo(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('first_name') ?? '').trim();
    const lastName = String(formData.get('last_name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();

    const validationError = getPasswordValidationError(password);
    if (validationError) {
      setError(validationError);
      setPending(false);
      return;
    }

    const supabase = createOrgClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName || undefined,
          last_name: lastName || undefined,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    const existingAccountMessage = getExistingAccountSignUpMessage(authError, data.user);
    if (existingAccountMessage) {
      setError(existingAccountMessage);
      setPending(false);
      return;
    }

    if (authError) {
      setError(authError.message || 'Impossible de créer le compte.');
      setPending(false);
      return;
    }

    if (data.user) {
      const profile = await ensureAccountProfile(supabase, data.user);
      if (profile && (firstName || lastName)) {
        await supabase
          .from('profiles')
          .update({
            ...(firstName ? { first_name: firstName } : {}),
            ...(lastName ? { last_name: lastName } : {}),
          })
          .eq('id', data.user.id);
      }
    }

    if (data.session) {
      router.push(next);
      router.refresh();
      return;
    }

    setInfo(
      'Compte créé. Si une confirmation e-mail est requise, consultez votre boîte mail puis connectez-vous.'
    );
    setPending(false);
  };

  return (
    <AuthPageShell>
      <div className="w-full max-w-[480px] bg-[#141414] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.45)] border border-white/10 p-[40px] max-[900px]:p-[32px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#FFCC00]" />

        <h1 className="text-[28px] font-bold text-white mb-[8px]">Créer un compte</h1>
        <p className="text-[#7F7F7F] text-[15px] mb-[32px]">
          Un seul compte Their memory pour épingler articles, vidéos et podcasts.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="first_name" className="text-[14px] font-bold text-white">
                Prénom
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                disabled={pending}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="last_name" className="text-[14px] font-bold text-white">
                Nom
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                disabled={pending}
                className={inputClass}
              />
            </div>
          </div>

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
            />
          </div>

          <PasswordStrengthField
            value={password}
            onChange={setPassword}
            disabled={pending}
          />

          <button
            type="submit"
            disabled={pending || !canSubmit}
            className="w-full h-[52px] bg-[#FFCC00] text-black font-semibold text-[16px] rounded-[8px] hover:bg-[#FFD633] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>

        <p className="mt-[24px] text-center text-[14px] text-[#7F7F7F]">
          Déjà un compte ?{' '}
          <Link
            href={`/login?next=${encodeURIComponent(next)}`}
            className="font-semibold text-white hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}

export default function SignUpClient() {
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
      <SignUpForm />
    </Suspense>
  );
}
