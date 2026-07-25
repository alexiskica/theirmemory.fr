import type { Metadata } from 'next';
import SettingsHub from '@/components/account/SettingsHub';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Paramètres | Mon espace compte',
  alternates: { canonical: `${SITE_URL}/compte/parametres` },
  robots: { index: false, follow: true },
};

export default function ParametresPage() {
  return (
    <div>
      <p className="text-[15px] text-[#7F7F7F] mb-[20px] leading-[1.6]">
        Gérez vos préférences de communication sur le site média Their memory.
      </p>
      <SettingsHub />
    </div>
  );
}
