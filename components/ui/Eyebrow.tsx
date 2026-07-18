export default function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className={`eyebrow ${tone}`}>
      <span className="dot" />
      {children}
    </span>
  );
}
