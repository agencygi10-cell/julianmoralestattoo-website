export default function Logo({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-lg sm:text-xl font-semibold tracking-widest text-gold-gradient">
        JULIÁN MORALES
      </span>
      <span
        className={`mt-1 text-[10px] uppercase tracking-[0.35em] ${
          dark ? "text-brand-black/50" : "text-white/50"
        }`}
      >
        Tattoo Artist
      </span>
    </div>
  );
}
