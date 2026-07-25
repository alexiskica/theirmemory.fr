import type { Metadata } from 'next';
import SignUpClient from './SignUpClient';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Créez votre compte Their memory pour épingler vos contenus préférés.',
  alternates: { canonical: `${SITE_URL}/inscription` },
  robots: { index: false, follow: true },
};

export default function SignUpPage() {
  return <SignUpClient />;
}
