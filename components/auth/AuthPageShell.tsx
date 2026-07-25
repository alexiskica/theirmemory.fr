import Link from 'next/link';

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthPageShell({ title, subtitle, children }: AuthPageShellProps) {
  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif] flex flex-col">
      <div className="relative flex-1 flex items-center justify-center px-[24px] py-[120px] max-[900px]:py-[96px]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#FFCC00]/[0.06] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-white/[0.03] blur-[100px]" />
        </div>

        <div className="relative w-full max-w-[480px]">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-[8px] text-[#7F7F7F] text-[14px] mb-[24px]">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white font-semibold">{title}</span>
          </nav>

          <div className="rounded-[16px] border border-white/10 bg-band p-[40px] max-[900px]:p-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="h-[4px] w-[48px] rounded-full bg-[#FFCC00] mb-[24px]" />
            <h1 className="text-white text-[28px] max-[900px]:text-[24px] font-bold mb-[8px]">{title}</h1>
            <p className="text-[#A3A3A3] text-[15px] leading-[1.6] mb-[28px]">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
