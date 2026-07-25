'use client';

import { useActionState } from 'react';
import { updateNewsletterPreferencesAction } from '@/app/compte/actions';
import type { NewsletterListPreference } from '@/lib/newsletter-preferences';

type CommunicationPreferencesFormProps = {
  initialPreferences: NewsletterListPreference[];
};

function PreferenceToggle({
  id,
  name,
  label,
  description,
  defaultChecked,
  disabled = false,
}: {
  id: string;
  name?: string;
  label: string;
  description: string;
  defaultChecked: boolean;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-[14px] p-[16px] rounded-[10px] border border-white/10 transition-colors ${
        disabled ? 'bg-white/[0.03] cursor-default opacity-70' : 'hover:border-white/25 cursor-pointer bg-surface'
      }`}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="mt-[3px] w-[18px] h-[18px] accent-[#FFCC00] shrink-0 disabled:opacity-70"
      />
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold text-white">{label}</span>
        <span className="block mt-[4px] text-[13px] text-[#7F7F7F] leading-[1.5]">{description}</span>
      </span>
    </label>
  );
}

export default function CommunicationPreferencesForm({
  initialPreferences,
}: CommunicationPreferencesFormProps) {
  const [state, formAction, pending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean; message?: string } | null,
      formData: FormData
    ) => {
      return (await updateNewsletterPreferencesAction(formData)) ?? null;
    },
    null
  );

  return (
    <div className="rounded-[14px] border border-white/10 bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.35)] p-[32px] max-[900px]:p-[24px]">
      <p className="text-[#7F7F7F] text-[15px] mb-[24px] leading-[1.6]">
        Gérez les newsletters du site média Their memory associées à l&apos;adresse e-mail de votre
        compte.
      </p>

      {state?.error && (
        <div className="mb-[20px] rounded-[10px] border border-[#FF3B3B]/30 bg-[#FF3B3B]/10 px-[16px] py-[12px] text-[14px] text-[#FF8A8A]">
          {state.error}
        </div>
      )}

      {state?.success && state.message && (
        <div className="mb-[20px] rounded-[10px] border border-[#59B644]/30 bg-[#59B644]/10 px-[16px] py-[12px] text-[14px] text-[#8FD97A]">
          {state.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-[24px] max-w-[640px]">
        <div className="flex flex-col gap-[12px]">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#7F7F7F]">
            Newsletters
          </p>

          {initialPreferences.length === 0 ? (
            <p className="text-[14px] text-[#7F7F7F] leading-[1.6] p-[16px] rounded-[10px] border border-white/10 bg-black/40">
              Aucune newsletter n&apos;est disponible pour le moment.
            </p>
          ) : (
            initialPreferences.map((list) => (
              <PreferenceToggle
                key={list.listId}
                id={`diffusion_list_${list.listId}`}
                name={list.isSystem ? undefined : `diffusion_list_${list.listId}`}
                label={list.name}
                description={
                  list.isSystem
                    ? `${list.description?.trim() || 'Liste système'} · désabonnement non disponible`
                    : list.description?.trim() ||
                      (list.subscribed
                        ? 'Vous êtes inscrit à cette newsletter.'
                        : 'Cochez pour vous abonner.')
                }
                defaultChecked={list.subscribed}
                disabled={list.isSystem}
              />
            ))
          )}
        </div>

        <button
          type="submit"
          disabled={pending || initialPreferences.length === 0}
          className="self-start h-[44px] px-[20px] rounded-[8px] bg-white text-black text-[14px] font-semibold hover:bg-[#e8e8e8] transition-colors disabled:opacity-50"
        >
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}
