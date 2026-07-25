import type { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  description: 'Réinitialisez le mot de passe de votre compte Their memory.',
  alternates: { canonical: `${SITE_URL}/mot-de-passe-oublie` },
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
