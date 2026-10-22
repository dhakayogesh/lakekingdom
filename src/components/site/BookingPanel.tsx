import { useNavigate } from "@tanstack/react-router";
import { format, addDays } from "date-fns";
import { useState } from "react";
import { validateDates } from "@/lib/enquiry";

const today = () => format(new Date(), "yyyy-MM-dd");

/** Compact enquiry panel. Sends the selection to /book for summary and hand-off. */
export function BookingPanel({ compact }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateDates(checkIn, checkOut);
    setError(err);
    if (err) return;
    navigate({ to: "/book", search: { checkIn, checkOut, adults, children, rooms } });
  };

  const label = "block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1.5";
  return (
    <form onSubmit={submit} className={`bg-card p-6 shadow-lux ${compact ? "" : "md:p-8"}`} noValidate aria-label="Booking enquiry">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.6fr_0.6fr_0.6fr_auto] lg:items-end">
        <div>
          <label htmlFor="bp-in" className={label}>Check-in</label>
          <input id="bp-in" type="date" className="field" min={today()} value={checkIn}
            onChange={(e) => { setCheckIn(e.target.value); if (!checkOut || e.target.value >= checkOut) setCheckOut(format(addDays(new Date(e.target.value), 1), "yyyy-MM-dd")); }} />
        </div>
        <div>
          <label htmlFor="bp-out" className={label}>Check-out</label>
          <input id="bp-out" type="date" className="field" min={checkIn || today()} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
        <Num id="bp-a" label="Adults" value={adults} min={1} set={setAdults} cls={label} />
        <Num id="bp-c" label="Children" value={children} min={0} set={setChildren} cls={label} />
        <Num id="bp-r" label="Rooms" value={rooms} min={1} set={setRooms} cls={label} />
        <button type="submit" className="btn btn-primary h-[46px] sm:col-span-2 lg:col-span-1">Check Availability</button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
      <p className="mt-3 text-xs text-muted-foreground">This sends an enquiry — not an instant reservation. Our team will confirm availability.</p>
    </form>
  );
}

function Num({ id, label, value, min, set, cls }: { id: string; label: string; value: number; min: number; set: (n: number) => void; cls: string }) {
  return (
    <div>
      <label htmlFor={id} className={cls}>{label}</label>
      <select id={id} className="field" value={value} onChange={(e) => set(Number(e.target.value))}>
        {Array.from({ length: 9 }, (_, i) => i + min).map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
  );
}
