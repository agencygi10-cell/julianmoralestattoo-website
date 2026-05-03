export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-lg sm:text-xl font-semibold tracking-widest text-gold-gradient">
        JULIÁN MORALES
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-brand-muted">
        Tattoo Artist
      </span>
    </div>
  );
}
