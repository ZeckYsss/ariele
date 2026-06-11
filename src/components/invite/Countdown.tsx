import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-07-18T17:00:00-03:00").getTime();

function diff() {
  const now = Date.now();
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d / 3_600_000) % 24),
    minutes: Math.floor((d / 60_000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "dias", value: t.days },
    { label: "horas", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "seg", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {items.map((i, idx) => (
        <motion.div
          key={i.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
          className="glass-card rounded-2xl p-3 sm:p-5 text-center"
        >
          <div className="font-serif text-3xl sm:text-5xl text-foreground tabular-nums">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-1 text-muted-foreground">
            {i.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
