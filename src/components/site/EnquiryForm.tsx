import { format } from "date-fns";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { hotel, rooms } from "@/data/site";
import { enquiryUrl, nights, summary, validateDates, type Enquiry } from "@/lib/enquiry";

type Props = { initial?: Partial<Enquiry>; showStay?: boolean };

/** Enquiry form: validates, then opens WhatsApp/email with a prefilled summary. No backend yet. */
export function EnquiryForm({ initial = {}, showStay = true }: Props) {
  const [v, setV] = useState<Enquiry>({
    checkIn: initial.checkIn ?? "",
    checkOut: initial.checkOut ?? "",
    adults: initial.adults ?? 2,
    children: initial.children ?? 0,
    rooms: initial.rooms ?? 1,
    room: initial.room ?? "",
    name: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const set = <K extends keyof Enquiry>(k: K, val: Enquiry[K]) => setV((s) => ({ ...s, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!v.name?.trim()) errs["name"] = "Please enter your name.";
    const c = v.contact?.trim() ?? "";
    if (!c) errs["contact"] = "Please enter a phone number or email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && !/^\+?[\d\s-]{7,}$/.test(c)) errs["contact"] = "Enter a valid phone number or email.";
    if (showStay) {
      const d = validateDates(v.checkIn, v.checkOut);
      if (d) errs["dates"] = d;
    } else if (!v.message?.trim()) errs["message"] = "Please write a short message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("loading");
    try {
      const url = enquiryUrl(showStay ? v : { ...v, checkIn: "", checkOut: "" });
      const w = window.open(url, "_blank", "noopener");
      setTimeout(() => setState(w === null && hotel.enquiryChannel === "whatsapp" ? "error" : "done"), 400);
    } catch {
      setState("error");
    }
  };

  const label = "block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1.5";
  const err = (k: string) => errors[k] && <p role="alert" className="mt-1 text-sm text-destructive">{errors[k]}</p>;
  const channel = hotel.enquiryChannel === "whatsapp" ? "WhatsApp" : "email";
  const datesOk = showStay && !validateDates(v.checkIn, v.checkOut);

  if (state === "done")
    return (
      <div className="border bg-card p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
        <h3 className="mt-4 text-3xl">Your enquiry is ready</h3>
        <p className="mt-3 text-muted-foreground">We opened {channel} with your details prefilled. Please press send there — our team will reply to confirm availability.</p>
        <button className="btn btn-outline mt-6" onClick={() => setState("idle")}>Edit enquiry</button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-5 border bg-card p-6 md:p-10">
      {showStay && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="ef-in" className={label}>Check-in</label><input id="ef-in" type="date" className="field" min={format(new Date(), "yyyy-MM-dd")} value={v.checkIn} onChange={(e) => set("checkIn", e.target.value)} /></div>
            <div><label htmlFor="ef-out" className={label}>Check-out</label><input id="ef-out" type="date" className="field" min={v.checkIn} value={v.checkOut} onChange={(e) => set("checkOut", e.target.value)} /></div>
          </div>
          {err("dates")}
          <div className="grid gap-4 sm:grid-cols-4">
            {(["adults", "children", "rooms"] as const).map((k) => (
              <div key={k}>
                <label htmlFor={`ef-${k}`} className={label}>{k}</label>
                <select id={`ef-${k}`} className="field" value={v[k]} onChange={(e) => set(k, Number(e.target.value))}>
                  {Array.from({ length: 9 }, (_, i) => i + (k === "children" ? 0 : 1)).map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label htmlFor="ef-room" className={label}>Room</label>
              <select id="ef-room" className="field" value={v.room} onChange={(e) => set("room", e.target.value)}>
                <option value="">Any</option>
                {rooms.map((r) => <option key={r.slug}>{r.name}</option>)}
              </select>
            </div>
          </div>
          {datesOk && (
            <div className="bg-secondary p-5 text-sm" aria-live="polite">
              <p className="eyebrow">Your stay</p>
              <p className="mt-2 font-serif text-xl">
                {format(new Date(v.checkIn), "d MMM yyyy")} → {format(new Date(v.checkOut), "d MMM yyyy")} · {nights(v.checkIn, v.checkOut)} night{nights(v.checkIn, v.checkOut) > 1 ? "s" : ""}
              </p>
              <p className="mt-1 text-muted-foreground">{v.adults} adults, {v.children} children · {v.rooms} room{v.rooms > 1 ? "s" : ""}{v.room ? ` · ${v.room}` : ""}</p>
            </div>
          )}
        </>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="ef-name" className={label}>Full name</label><input id="ef-name" className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} />{err("name")}</div>
        <div><label htmlFor="ef-contact" className={label}>Phone or email</label><input id="ef-contact" className="field" value={v.contact} onChange={(e) => set("contact", e.target.value)} />{err("contact")}</div>
      </div>
      <div><label htmlFor="ef-msg" className={label}>Message {showStay && "(optional)"}</label><textarea id="ef-msg" rows={4} className="field" value={v.message} onChange={(e) => set("message", e.target.value)} />{err("message")}</div>
      {state === "error" && <p role="alert" className="text-sm text-destructive">We couldn't open {channel}. Please allow pop-ups, or contact us at {hotel.phone}.</p>}
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={state === "loading"}>
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}Send Enquiry via {channel}
      </button>
      <p className="text-xs text-muted-foreground">This is an enquiry, not a confirmed booking. Availability and rates will be confirmed by our team.</p>
      <details className="text-xs text-muted-foreground"><summary className="cursor-pointer">Preview message</summary><pre className="mt-2 whitespace-pre-wrap font-sans">{datesOk ? summary(v) : "Add your dates to preview."}</pre></details>
    </form>
  );
}
