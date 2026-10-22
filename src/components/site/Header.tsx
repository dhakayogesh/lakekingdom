import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { hotel, nav } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container-lux flex h-9 items-center justify-between text-xs tracking-wider">
          <span>{hotel.city}, {hotel.region}</span>
          <div className="flex gap-6">
            <a href={`tel:${hotel.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-gold"><Phone className="h-3 w-3" />{hotel.phone}</a>
            <a href={`mailto:${hotel.email}`} className="flex items-center gap-2 hover:text-gold"><Mail className="h-3 w-3" />{hotel.email}</a>
          </div>
        </div>
      </div>
      <div className={`border-b bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
        <div className="container-lux grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={`${hotel.name} home`}>
            <img src={hotel.logo} alt={`${hotel.name} logo`} className="h-16 w-auto shrink-0" />
            <span className="truncate font-serif text-xl tracking-[0.12em] uppercase">{hotel.name}</span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-xs font-semibold uppercase tracking-[0.2em] hover:text-gold" activeProps={{ className: "text-gold" }}>
                {n.label}
              </Link>
            ))}
            <Link to="/book" className="btn btn-primary">Book Your Stay</Link>
          </nav>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t bg-background lg:hidden" aria-label="Mobile">
            <div className="container-lux flex flex-col py-4">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-4 font-serif text-xl">
                  {n.label}
                </Link>
              ))}
              <Link to="/book" onClick={() => setOpen(false)} className="btn btn-primary mt-6">Book Your Stay</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
