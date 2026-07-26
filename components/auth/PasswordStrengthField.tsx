'use client';

import { useMemo, useState } from 'react';
import PasswordInput from '@/components/auth/PasswordInput';
import { evaluatePasswordStrength } from '@/lib/password-strength';

type PasswordStrengthFieldProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  label?: string;
  disabled?: boolean;
};

function CheckIcon({ met }: { met: boolean }) {
  if (met) {
    return (
      <svg
        className="w-[16px] h-[16px] text-[#59B644] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  return (
    <span className="w-[16px] h-[16px] rounded-full border-2 border-white/25 shrink-0" />
  );
}

export default function PasswordStrengthField({
  id = 'password',
  name = 'password',
  value,
  onChange,
  autoComplete = 'new-password',
  label = 'Mot de passe',
  disabled = false,
}: PasswordStrengthFieldProps) {
  const [focused, setFocused] = useState(false);
  const strength = useMemo(() => evaluatePasswordStrength(value), [value]);
  const showHints = focused || value.length > 0;

  return (
    <div className="flex flex-col gap-[10px]">
      <label htmlFor={id} className="text-[14px] font-bold text-white">
        {label}
      </label>

      <PasswordInput
        id={id}
        name={name}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        aria-describedby={`${id}-strength`}
      />

      {showHints && (
        <div id={`${id}-strength`} className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between gap-[12px]">
            <div className="flex-1 h-[6px] rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${strength.score}%`,
                  backgroundColor: strength.barColor,
                }}
              />
            </div>
            <span
              className="text-[12px] font-semibold shrink-0"
              style={{ color: strength.barColor }}
            >
              {strength.label}
            </span>
          </div>

          <ul className="flex flex-col gap-[8px]">
            {strength.checks.map((check) => (
              <li
                key={check.id}
                className={`flex items-center gap-[10px] text-[13px] transition-colors ${
                  check.met ? 'text-[#7dcf6f]' : 'text-[#7F7F7F]'
                }`}
              >
                <CheckIcon met={check.met} />
                <span className={check.met ? 'font-medium' : undefined}>{check.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
