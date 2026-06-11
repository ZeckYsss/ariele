import { motion } from "framer-motion";
import butterflyImg from "@/assets/butterfly.png";

interface EnvelopeProps {
  open: boolean;
  onOpen: () => void;
}

export function Envelope({ open, onOpen }: EnvelopeProps) {
  return (
    <div className="relative flex flex-col items-center gap-8">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Abrir convite"
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-rose/60 rounded-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: open ? 1 : 1.03 }}
        whileTap={{ scale: open ? 1 : 0.97 }}
        disabled={open}
      >
        {/* Idle float */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 1200 }}
          className="relative"
        >
          {/* Envelope body */}
          <div
            className="relative w-[280px] h-[190px] sm:w-[340px] sm:h-[230px] rounded-md"
            style={{
              background: "linear-gradient(135deg, oklch(0.96 0.02 30), oklch(0.92 0.04 20))",
              boxShadow:
                "0 30px 60px -20px rgba(180, 90, 120, 0.35), inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}
          >
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-md shimmer opacity-50" />

            {/* Butterflies escaping */}
            {open && (
              <>
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.img
                    key={i}
                    src={butterflyImg}
                    alt=""
                    aria-hidden
                    className="absolute left-1/2 top-1/2 w-10 h-10 -ml-5 -mt-5 drop-shadow-lg"
                    style={{ filter: `hue-rotate(${i * 50}deg)` }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
                    animate={{
                      x: (i - 3) * 80 + (Math.random() - 0.5) * 40,
                      y: -200 - i * 30,
                      opacity: [0, 1, 0],
                      scale: [0.4, 1, 1.1],
                      rotate: (i - 3) * 20,
                    }}
                    transition={{ duration: 2.2, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  />
                ))}
              </>
            )}

            {/* Back flap (closed) */}
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "100%",
                clipPath: "polygon(0 0, 100% 0, 50% 60%)",
                background:
                  "linear-gradient(160deg, oklch(0.92 0.05 20), oklch(0.85 0.08 15))",
                transformStyle: "preserve-3d",
                boxShadow: "inset 0 -2px 8px rgba(180,90,120,0.2)",
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: open ? -180 : 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Wax seal */}
            <motion.div
              className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full grid place-items-center"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, oklch(0.85 0.13 20), oklch(0.55 0.18 18))",
                boxShadow: "0 6px 16px rgba(120,30,50,0.4), inset 0 -3px 8px rgba(0,0,0,0.25)",
              }}
              animate={open ? { scale: 0, opacity: 0, rotate: 90 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-script text-2xl text-white/95 leading-none">A</span>
            </motion.div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-3 inset-x-6 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
          </div>
        </motion.div>
      </motion.button>

      {!open && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          toque para abrir
        </motion.p>
      )}
    </div>
  );
}
