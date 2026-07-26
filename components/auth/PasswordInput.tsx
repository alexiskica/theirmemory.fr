'use client';

import { useState, type ComponentPropsWithoutRef } from 'react';

export const passwordInputClass =
  'w-full h-[48px] bg-[#111] border border-white/15 rounded-[8px] pl-[16px] pr-[48px] text-[15px] text-white placeholder:text-[#404040] focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50';

type PasswordInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

function EyeOpenIcon() {
  return (
    <svg
      className="w-[20px] h-[20px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg
      className="w-[20px] h-[20px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export default function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className={className ?? passwordInputClass}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-[12px] top-1/2 -translate-y-1/2 p-[4px] text-[#7F7F7F] hover:text-white transition-colors"
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      >
        {visible ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
}
