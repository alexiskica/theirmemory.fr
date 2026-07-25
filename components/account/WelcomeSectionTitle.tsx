type WelcomeSectionTitleProps = {
  label: string;
  className?: string;
};

export default function WelcomeSectionTitle({ label, className = '' }: WelcomeSectionTitleProps) {
  return (
    <div className={`relative mb-[28px] ${className}`.trim()}>
      <h2 className="text-[28px] max-[900px]:text-[24px] font-bold text-white leading-tight">
        {label}
      </h2>

      <div
        className="welcome-ambient pointer-events-none absolute top-0 right-0 hidden lg:block w-[min(500px,42%)]"
        aria-hidden="true"
      >
        <svg
          className="welcome-ambient-svg"
          viewBox="0 0 400 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="welcome-orb welcome-orb-1" cx="72" cy="44" r="20" />
          <circle className="welcome-orb welcome-orb-2" cx="198" cy="38" r="14" />
          <circle className="welcome-orb welcome-orb-3" cx="318" cy="50" r="11" />

          <circle className="welcome-ring welcome-ring-1" cx="142" cy="46" r="18" />
          <circle className="welcome-ring welcome-ring-2" cx="268" cy="40" r="15" />

          <circle className="welcome-dot welcome-dot-1" cx="38" cy="28" r="2.5" />
          <circle className="welcome-dot welcome-dot-2" cx="118" cy="62" r="2" />
          <circle className="welcome-dot welcome-dot-3" cx="210" cy="22" r="2.25" />
          <circle className="welcome-dot welcome-dot-4" cx="292" cy="66" r="2" />
          <circle className="welcome-dot welcome-dot-5" cx="356" cy="30" r="2.5" />
          <circle className="welcome-dot welcome-dot-6" cx="168" cy="18" r="1.75" />
        </svg>
      </div>
    </div>
  );
}
