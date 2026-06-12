import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Heart, Check } from "lucide-react";
import { submitRSVP } from "@/services/rsvp";

const schema = z.object({
  name: z.string().trim().min(2, "Conte seu nome"),
  phone: z.string().trim().min(8, "Telefone inválido"),
  adults: z.coerce.number().min(0).max(20),
  children: z.coerce.number().min(0).max(20),
  notes: z.string().max(400).optional(),
  attending: z.enum(["yes", "no"]),
});

export function RSVPForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      adults: Number(fd.get("adults") || 0),
      children: Number(fd.get("children") || 0),
      notes: String(fd.get("notes") || ""),
      attending,
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await submitRSVP(parsed.data);
      setDone(true);
      toast.success("Presença confirmada com carinho 🦋", {
        description: "Mal podemos esperar para te ver no jardim.",
      });
   } catch (err: any) {
  console.error(err);

  if (err.message === "PHONE_ALREADY_EXISTS") {
    toast.error("Este telefone já confirmou presença 💗", {
      description:
        "Cada convite pode ser confirmado apenas uma vez utilizando o mesmo telefone.",
    });
  } else {
    toast.error("Erro ao confirmar presença.", {
      description:
        "Ocorreu um problema ao enviar sua confirmação. Tente novamente.",
    });
  }
} finally {
  setLoading(false);
}
  }

  const fieldCls =
    "w-full rounded-xl border border-border/70 bg-white/70 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-rose/50 focus:border-rose/40 transition";

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="glass-card rounded-3xl p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="mx-auto w-16 h-16 rounded-full grid place-items-center mb-4"
            style={{ background: "var(--gradient-rose)" }}
          >
            <Check className="text-white" />
          </motion.div>
          <h3 className="font-serif text-2xl mb-2">Presença confirmada</h3>
          <p className="text-muted-foreground">
            Obrigado por florescer esse jardim com a gente.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 sm:p-8 space-y-4"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Nome</label>
            <input name="name" className={fieldCls} placeholder="Seu nome completo" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Telefone</label>
            <input name="phone" inputMode="tel" className={fieldCls} placeholder="(11) 99999-9999" />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Adultos</label>
              <input name="adults" type="number" min={0} defaultValue={1} className={fieldCls} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Crianças</label>
              <input name="children" type="number" min={0} defaultValue={0} className={fieldCls} />
            </div>
          </div>

          {/*<div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Observações</label>
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Restrições alimentares, recado..." />
          </div>*/}

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
              Você poderá comparecer?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["yes", "no"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAttending(opt)}
                  className={
                    "rounded-xl border px-4 py-3 text-sm font-medium transition " +
                    (attending === opt
                      ? "border-rose/60 bg-rose/15 text-foreground shadow-sm"
                      : "border-border/60 bg-white/50 text-muted-foreground hover:bg-white/80")
                  }
                >
                  {opt === "yes" ? "Sim, estarei lá 💗" : "Não poderei ir"}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="relative w-full rounded-xl py-4 font-medium text-white overflow-hidden disabled:opacity-70"
            style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-petal)" }}
          >
            <span className="absolute inset-0 shimmer opacity-40" />
            <span className="relative inline-flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Heart size={16} />}
              {loading ? "Enviando..." : "Confirmar presença"}
            </span>
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
