interface QuoteBlockProps {
  quote: string;
  attribution: string;
  variant?: "default" | "light";
}

const QuoteMark = ({ color = "rgba(138,80,216,0.10)" }: { color?: string }) => (
  <svg width="44" height="36" viewBox="0 0 32 28" fill={color} aria-hidden>
    <path d="M0 28V17.333C0 9.867 4.267 4.4 12.8 1L14.933 4.933C11.2 6.533 8.933 9.333 8.267 13.333H14.4V28H0ZM17.6 28V17.333C17.6 9.867 21.867 4.4 30.4 1L32 4.933C28.267 6.533 26 9.333 25.333 13.333H32V28H17.6Z" />
  </svg>
);

export function QuoteBlock({ quote, attribution, variant = "default" }: QuoteBlockProps) {
  return (
    <div
      className="relative rounded-2xl p-6 mt-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(138,80,216,0.05) 0%, rgba(25,159,215,0.04) 50%, rgba(238,80,145,0.04) 100%)",
        border: "1px solid rgba(138,80,216,0.14)",
      }}
    >
      {/* Big decorative quote mark */}
      <div className="absolute top-3 right-5 opacity-70">
        <QuoteMark color="rgba(138,80,216,0.12)" />
      </div>

      {/* Left gradient bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
        style={{ background: "linear-gradient(180deg, #199FD7, #8A50D8, #EE5091)" }}
      />

      <div className="pl-4">
        <p className="text-slate-700 italic text-base leading-relaxed font-light mb-3">
          &ldquo;{quote}&rdquo;
        </p>
        <p
          className="text-[0.6875rem] font-bold uppercase tracking-widest"
          style={{ color: "#8A50D8" }}
        >
          &mdash; {attribution}
        </p>
      </div>
    </div>
  );
}
