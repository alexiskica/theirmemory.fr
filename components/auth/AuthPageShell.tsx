type AuthPageShellProps = {
  children: React.ReactNode;
};

export default function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="auth-page-background relative w-full min-h-screen bg-page font-['Open_Sans',sans-serif] flex items-center justify-center p-[24px] pt-[120px] max-[900px]:pt-[100px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[18%] -left-[8%] h-[42%] w-[42%] rounded-full bg-[#FFCC00]/[0.06] blur-[90px]" />
        <div className="absolute -bottom-[12%] -right-[8%] h-[38%] w-[38%] rounded-full bg-white/[0.03] blur-[90px]" />
      </div>

      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </main>
  );
}
