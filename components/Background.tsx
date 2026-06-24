const noiseSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter><rect width="120" height="120" filter="url(#n)"/></svg>';
const NOISE = `url("data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}")`;

export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-flood absolute"
        style={{
          top: "-30%",
          left: "50%",
          width: "120%",
          height: "90%",
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(58,28,98,.55), rgba(26,16,40,.25) 45%, rgba(11,10,15,0) 72%)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "-12%",
          left: "8%",
          width: "36%",
          height: "80%",
          background: "radial-gradient(closest-side, rgba(120,80,200,.18), transparent 72%)",
          filter: "blur(14px)",
          transform: "rotate(18deg)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "-12%",
          right: "6%",
          width: "34%",
          height: "80%",
          background: "radial-gradient(closest-side, rgba(255,77,94,.12), transparent 72%)",
          filter: "blur(16px)",
          transform: "rotate(-18deg)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-20%",
          left: "50%",
          width: "140%",
          height: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(60% 100% at 50% 100%, rgba(42,26,69,.5), transparent 70%)",
        }}
      />
      <div className="absolute inset-0" style={{ opacity: 0.05, backgroundImage: NOISE, mixBlendMode: "overlay" }} />
    </div>
  );
}
