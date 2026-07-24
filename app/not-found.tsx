import Link from 'next/link';
import type { Metadata } from 'next';
import { INSTITUTIONAL_SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Page introuvable | ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] pt-[120px] bg-page flex flex-col items-center justify-center text-center px-[24px] pb-[100px] max-[900px]:pb-[64px] font-['Open_Sans',sans-serif]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="mb-[32px]">
          <h1 className="text-[120px] max-[900px]:text-[80px] font-extrabold leading-none text-white opacity-10 select-none">
            404
          </h1>
        </div>

        <h2 className="text-[40px] max-[900px]:text-[32px] font-bold text-white mb-[24px] leading-tight max-w-[800px]">
          Page introuvable
        </h2>

        <p className="text-[#A3A3A3] text-[16px] leading-[1.6] mb-[48px] max-w-[600px]">
          La page que vous recherchez n&apos;existe pas, a été déplacée ou l&apos;adresse a été mal saisie. Vous pouvez retourner à l&apos;accueil pour reprendre votre navigation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-[16px]">
          <Link
            href="/"
            className="bg-white text-black px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-[#e8e8e8] shadow-sm flex items-center justify-center"
          >
            Retour à l&apos;accueil
          </Link>

          <a
            href={`${INSTITUTIONAL_SITE_URL}/contact`}
            className="bg-transparent border border-white/20 text-white px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-white/5 flex items-center justify-center"
          >
            Signaler un problème
          </a>
        </div>
      </div>
    </main>
  );
}
