import type { MagazineIssue } from '@/lib/magazine-data';

type MagazineCoverProps = {
  issue: MagazineIssue;
  priority?: boolean;
  className?: string;
};

export default function MagazineCover({ issue, className = '' }: MagazineCoverProps) {
  return (
    <div
      className={`relative aspect-[210/297] rounded-[12px] overflow-hidden border border-white/10 bg-[#111] shadow-[0_16px_48px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="absolute inset-0" style={{ background: issue.coverGradient }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute top-[16px] left-[16px] right-[16px] flex items-start justify-between gap-[8px]">
        <span className="inline-flex px-[10px] py-[5px] rounded-[6px] bg-black/50 backdrop-blur-sm border border-white/15 text-white text-[11px] font-bold uppercase tracking-[0.08em]">
          N°{issue.number}
        </span>
        {issue.isLatest && (
          <span className="inline-flex px-[10px] py-[5px] rounded-[6px] bg-[#FFCC00] text-black text-[11px] font-bold uppercase tracking-[0.06em]">
            Nouveau
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-[20px]">
        <p className="text-[#FFCC00] text-[11px] font-bold uppercase tracking-[0.1em] mb-[6px]">
          {issue.season}
        </p>
        <p className="text-white text-[15px] max-[900px]:text-[14px] font-bold leading-snug line-clamp-2 mb-[4px]">
          {issue.ww2Theme}
        </p>
        <p className="text-white/70 text-[13px] leading-snug line-clamp-1">
          {issue.title}
        </p>
      </div>
    </div>
  );
}
