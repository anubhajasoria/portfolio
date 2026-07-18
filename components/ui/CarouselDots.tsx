"use client";

type Props = {
  count: number;
  active: number;
  onSelect: (i: number) => void;
  tone?: "dark" | "light";
};

export default function CarouselDots({ count, active, onSelect, tone = "dark" }: Props) {
  return (
    <div className={`dots ${tone}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Slide ${i + 1}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
        >
          <span />
        </button>
      ))}
    </div>
  );
}
