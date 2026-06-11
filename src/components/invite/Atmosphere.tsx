import { motion } from "framer-motion";
import butterflyImg from "@/assets/butterfly.png";

interface Butterfly {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  hue: number;
  opacity: number;
}

const seeds: Butterfly[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  left: `${(i * 53) % 95}%`,
  top: `${(i * 37) % 90}%`,
  size: 28 + ((i * 11) % 36),
  delay: (i * 0.7) % 5,
  duration: 14 + ((i * 3) % 10),
  hue: (i * 47) % 360,
  opacity: 0.55 + ((i * 13) % 30) / 100,
}));

export function FloatingButterflies({ count = 9 }: { count?: number }) {
  const items = seeds.slice(0, count);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((b) => (
        <motion.img
          key={b.id}
          src={butterflyImg}
          alt=""
          width={b.size}
          height={b.size}
          loading="lazy"
          className="absolute drop-shadow-[0_8px_18px_rgba(236,72,153,0.25)]"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            filter: `hue-rotate(${b.hue}deg) saturate(0.9)`,
            opacity: b.opacity,
          }}
          initial={{ x: -40, y: 0, rotate: -8 }}
          animate={{
            x: [0, 60, -30, 40, 0],
            y: [0, -40, 20, -25, 0],
            rotate: [-8, 6, -4, 10, -8],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Petals({ count = 14 }: { count?: number }) {
  const petals = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${(i * 41) % 100}%`,
    delay: (i * 0.9) % 8,
    duration: 12 + ((i * 5) % 10),
    size: 6 + ((i * 3) % 8),
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-rose/60 blur-[1px]"
          style={{ left: p.left, width: p.size, height: p.size, top: "-5%" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: ["-5%", "110%"], opacity: [0, 0.9, 0], x: [0, 20, -10, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
