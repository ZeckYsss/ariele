import { supabase } from "@/lib/supabase";

export interface RSVPPayload {
  name: string;
  phone: string;
  adults: number;
  children: number;
  notes?: string;
  attending: "yes" | "no";
}

export async function submitRSVP(
  payload: RSVPPayload
): Promise<{ ok: true }> {
  // Remove qualquer caractere que não seja número
  const phone = payload.phone.replace(/\D/g, "");

  // Verifica se já existe uma confirmação com esse telefone
  const { data: existing, error: searchError } = await supabase
    .from("rsvp")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();

  if (searchError) {
    throw searchError;
  }

  if (existing) {
    throw new Error("PHONE_ALREADY_EXISTS");
  }

  // Salva no banco
  const { error } = await supabase.from("rsvp").insert({
    name: payload.name,
    phone,
    adults: payload.adults,
    children: payload.children,
    notes: payload.notes,
    attending: payload.attending,
  });

  if (error) {
    throw error;
  }

  return { ok: true };
}