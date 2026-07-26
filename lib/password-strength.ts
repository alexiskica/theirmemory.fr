export type PasswordRule = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'length',
    label: 'Au moins 8 caractères',
    test: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Une lettre majuscule',
    test: (password) => /[A-ZÀ-ÖØ-Þ]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'Une lettre minuscule',
    test: (password) => /[a-zà-öø-ÿ]/.test(password),
  },
  {
    id: 'digit',
    label: 'Un chiffre',
    test: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'Un caractère spécial (!@#$…)',
    test: (password) => /[^A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(password),
  },
];

export type PasswordStrengthResult = {
  checks: Array<PasswordRule & { met: boolean }>;
  metCount: number;
  total: number;
  score: number;
  isValid: boolean;
  label: string;
  barColor: string;
};

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const checks = PASSWORD_RULES.map((rule) => ({
    ...rule,
    met: rule.test(password),
  }));
  const metCount = checks.filter((check) => check.met).length;
  const total = PASSWORD_RULES.length;
  const score = total === 0 ? 0 : Math.round((metCount / total) * 100);

  let label = 'Faible';
  let barColor = '#E53935';

  if (metCount === total) {
    label = 'Sécurisé';
    barColor = '#59B644';
  } else if (metCount >= 4) {
    label = 'Presque prêt';
    barColor = '#FFCC00';
  } else if (metCount >= 3) {
    label = 'Moyen';
    barColor = '#FF9800';
  }

  return {
    checks,
    metCount,
    total,
    score,
    isValid: metCount === total,
    label,
    barColor,
  };
}

export function getPasswordValidationError(password: string): string | null {
  const strength = evaluatePasswordStrength(password);
  if (strength.isValid) return null;

  const missing = strength.checks.filter((check) => !check.met).map((check) => check.label);
  return `Mot de passe incomplet : ${missing.join(', ').toLowerCase()}.`;
}
