import type { Metadata } from 'next';
import LoginClient from './LoginClient';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte Their memory.',
  alternates: { canonical: `${SITE_URL}/login` },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginClient />;
}
