import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Heart, Sparkles } from "lucide-react";

import ariele from "@/assets/ariele.jpeg";
import floralBg from "@/assets/floral-bg.jpg";
import floralCorner from "@/assets/floral-corner.png";
import butterfly from "@/assets/butterfly.png";

import { FloatingButterflies, Petals } from "@/components/invite/Atmosphere";
import { Envelope } from "@/components/invite/Envelope";
import { Countdown } from "@/components/invite/Countdown";
import { RSVPForm } from "@/components/invite/RSVPForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1º Aninho — Jardim das Borboletas" },
      {
        name: "description",
        content:
          "Convite especial para o 1º aninho. Tema Jardim das Borboletas — 18/07 às 17h.",
      },
      { property: "og:title", content: "1º Aninho — Jardim das Borboletas" },
      {
        property: "og:description",
        content: "Nosso jardim vai florescer ainda mais com sua presença.",
      },
      { property: "og:image", content: ariele },
      { name: "twitter:image", content: ariele },
    ],
  }),
  component: InvitePage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

function InvitePage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative">
      {/* Soft floral wash behind everything */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage: `url(${floralBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 bg-[var(--gradient-sky)] opacity-90" aria-hidden />

      {/* ====== HERO / ENVELOPE ====== */}
      <section className="relative min-h-[100dvh] grid place-items-center overflow-hidden px-6">
        <Petals count={16} />
        <FloatingButterflies count={opened ? 10 : 6} />

        <img
          src={floralCorner}
          alt=""
          aria-hidden
          loading="eager"
          className="pointer-events-none absolute -top-10 -left-16 w-64 sm:w-96 opacity-80 rotate-[-15deg]"
        />
        <img
          src={floralCorner}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute -bottom-12 -right-16 w-64 sm:w-96 opacity-80 rotate-[160deg]"
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-10 max-w-xl">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-10"
              >
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="font-script text-3xl sm:text-4xl text-rose/90"
                >
                  Arielly

                </motion.p>
                <Envelope open={false} onOpen={() => setOpened(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground"
                >
                  <Sparkles size={14} className="text-gold" />
                  você está convidado
                  <Sparkles size={14} className="text-gold" />
                </motion.span>
                <h1 className="font-serif text-5xl sm:text-7xl leading-[1.05]">
                  1<span className="gold-text">º</span> Aninho
                </h1>
                <p className="font-script text-4xl sm:text-5xl text-rose/90 -mt-2">
                  Jardim das Borboletas
                </p>
                <p className="max-w-md text-balance text-foreground/80 text-base sm:text-lg leading-relaxed italic">
                  “Nosso jardim vai florescer ainda mais com a sua presença.”
                </p>

                <motion.a
                  href="#detalhes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="mt-6 inline-flex flex-col items-center gap-1 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                  ver convite
                  <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="block h-8 w-px bg-gradient-to-b from-rose/60 to-transparent"
                  />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Content only after opening */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* ====== DETAILS ====== */}
            <section id="detalhes" className="relative py-24 px-6">
              <div className="max-w-2xl mx-auto text-center">
                <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl mb-3">
                  A celebração
                </motion.h2>
                <motion.div
                  {...fadeUp}
                  className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-rose/60 to-transparent mb-12"
                />

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Calendar, label: "Data", value: "18 de Julho" },
                    { icon: Clock, label: "Horário", value: "17:00" },
                    { icon: MapPin, label: "Local", value: "Jardim das Imbuias" },
                  ].map((it, i) => (
                    <motion.div
                      key={it.label}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                      className="glass-card rounded-2xl p-6 flex flex-col items-center gap-2"
                    >
                      <div className="w-11 h-11 rounded-full grid place-items-center"
                           style={{ background: "var(--gradient-rose)" }}>
                        <it.icon size={18} className="text-white" />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {it.label}
                      </div>
                      <div className="font-serif text-xl">{it.value}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.p {...fadeUp} className="mt-10 text-foreground/80 leading-relaxed">
                  Rua Professor Enéias de Siqueira Neto, 997
                  <br />
                  <span className="text-muted-foreground">Jardim das Imbuias</span>
                </motion.p>
              </div>
            </section>

            {/* ====== COUNTDOWN ====== */}
            <section className="relative py-20 px-6">
              <div className="max-w-3xl mx-auto text-center">
                <motion.span
                  {...fadeUp}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground"
                >
                  <Heart size={12} className="text-rose" /> contagem regressiva
                </motion.span>
                <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl mt-3 mb-10">
                  Cada pétala mais perto
                </motion.h2>
                <Countdown />
              </div>
            </section>

            {/* ====== GALLERY — single hero portrait ====== */}
            <section className="relative py-20 px-6 overflow-hidden">
              <FloatingButterflies count={4} />
              <div className="max-w-2xl mx-auto relative">
                <motion.span
                  {...fadeUp}
                  className="block text-center text-xs uppercase tracking-[0.35em] text-muted-foreground"
                >
                  nossa pequena flor
                </motion.span>
                <motion.h2
                  {...fadeUp}
                  className="font-serif text-3xl sm:text-4xl text-center mt-3 mb-3"
                >
                  Nosso jardim
                </motion.h2>
                
                <motion.p {...fadeUp} className="text-center text-muted-foreground mb-12">
                  Pequenos momentos que florescem todos os dias.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto max-w-sm"
                >
                  {/* Floral frame decorations */}
                  <img
                    src={floralCorner}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="pointer-events-none absolute -top-10 -left-10 w-32 sm:w-40 rotate-[-18deg] opacity-90 drop-shadow-md"
                  />
                  <img
                    src={floralCorner}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="pointer-events-none absolute -bottom-10 -right-10 w-32 sm:w-40 rotate-[155deg] opacity-90 drop-shadow-md z-20"
                  />
                  

                  {/* Soft glow behind portrait */}
                  <div
                    className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-70"
                    style={{ background: "var(--gradient-rose)" }}
                    aria-hidden
                  />

                  {/* Portrait card */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-[2rem] p-2 glass-card"
                    style={{ boxShadow: "var(--shadow-petal)" }}
                  >
                    <div className="relative overflow-hidden rounded-[1.6rem] aspect-[3/4]">
                      <img
  src={ariele}
  alt="Arielly"
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover"
/>



                      {/* Cinematic vignettes */}
                      <div className="absolute inset-0 bg-gradient-to-t from-rose/30 via-transparent to-transparent" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-[1.6rem]" />
                      <div className="absolute inset-0 shimmer opacity-20 mix-blend-overlay" />

                      {/* Name plate */}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                        <div
                          className="mx-auto inline-flex flex-col items-center gap-1 px-6 py-3 rounded-2xl backdrop-blur-md"
                          style={{
                            background: "color-mix(in oklab, white 55%, transparent)",
                            border: "1px solid color-mix(in oklab, white 70%, transparent)",
                          }}
                        >
                          <span className="font-script text-3xl text-rose leading-none">
                            Arielly
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                            1 aninho
                          </span>
                        </div>
                      </div>
                    </div>
                    
                  </motion.div>
                </motion.div><motion.div
  {...fadeUp}
  className="glass-card rounded-2xl p-6 mb-10 text-center max-w-md mx-auto"
>
  <h3 className="font-serif text-2xl mb-3">
    🎁 Sugestão de presentes
  </h3>

  <p className="text-muted-foreground leading-7">
    Caso deseje presentear a Arielly, seguem algumas sugestões:
  </p>

  <ul className="mt-4 space-y-2">
    <li>👕 Roupas tamanho <strong>2 ou 3 anos</strong></li>
    <li>👟 Sapatos número <strong>19/20</strong></li>
    <li>🧸 Brinquedos</li>
  </ul>
</motion.div>
              </div>
            </section>


            {/* ====== MAP ====== */}
            <section className="relative py-20 px-6">
              <div className="max-w-3xl mx-auto">
                <motion.h2 {...fadeUp} className="font-serif text-3xl sm:text-4xl text-center mb-3">
                  Como chegar
                </motion.h2>
                <motion.p {...fadeUp} className="text-center text-muted-foreground mb-8">
                  Rua Professor Enéias de Siqueira Neto, 997 — Jardim das Imbuias
                </motion.p>
                <motion.div
                  {...fadeUp}
                  className="glass-card rounded-3xl overflow-hidden p-2"
                >
                  <iframe
                    title="Mapa do local"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      "Rua Professor Enéias de Siqueira Neto, 997, Jardim das Imbuias, São Paulo",
                    )}&output=embed`}
                    className="w-full h-72 sm:h-96 rounded-2xl border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
                <motion.a
                  {...fadeUp}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    "Rua Professor Enéias de Siqueira Neto, 997, Jardim das Imbuias, São Paulo",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full justify-center items-center gap-2 rounded-xl py-3 text-white"
                  style={{ background: "var(--gradient-rose)" }}
                >
                  <MapPin size={16} /> Abrir no Google Maps
                </motion.a>
              </div>
            </section>

            {/* ====== RSVP ====== */}
            <section className="relative py-20 px-6">
              <div className="max-w-lg mx-auto">
                <motion.span
                  {...fadeUp}
                  className="block text-center text-xs uppercase tracking-[0.35em] text-muted-foreground"
                >
                  confirmação de presença
                </motion.span>
                <motion.h2
                  {...fadeUp}
                  className="font-serif text-3xl sm:text-4xl text-center mt-3 mb-2"
                >
                  Venha florescer com a gente
                </motion.h2>
                <motion.p {...fadeUp} className="text-center text-muted-foreground mb-10">
                  Confirme até <span className="text-foreground">10 de julho</span>.
                </motion.p>
                <RSVPForm />
              </div>
            </section>

            {/* ====== FINAL ====== */}
            <section className="relative py-28 px-6 overflow-hidden">
              <Petals count={10} />
              <FloatingButterflies count={5} />
              <div className="relative max-w-xl mx-auto text-center">
                <motion.img
                  src={butterfly}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="mx-auto w-16 mb-6 animate-float"
                />
                <motion.p
                  {...fadeUp}
                  className="font-script text-4xl sm:text-5xl text-rose/90 leading-tight"
                >
                  Com amor,
                </motion.p>
                <motion.p {...fadeUp} className="font-serif text-2xl sm:text-3xl mt-2">
                  Família da Arielly
                </motion.p>
                <motion.div
                  {...fadeUp}
                  className="mx-auto mt-8 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                />
                <motion.p {...fadeUp} className="mt-8 text-sm text-muted-foreground italic">
                  “Que cada borboleta carregue um pedacinho de afeto até você.”
                </motion.p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
