import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { hotel, nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={hotel.logo} alt={`${hotel.name} logo`} className="h-28 w-auto" loading="lazy" />
          <p className="mt-4 text-sm opacity-80">{hotel.tagline}</p>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="opacity-80 hover:text-gold hover:opacity-100">{n.label}</Link></li>)}
            <li><Link to="/book" className="opacity-80 hover:text-gold">Booking Enquiry</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Contact</h3>
          <address className="space-y-2 text-sm not-italic opacity-80">
            <p>{hotel.address}</p>
            <p><a href={`tel:${hotel.phone.replace(/\s/g, "")}`} className="hover:text-gold">{hotel.phone}</a></p>
            <p><a href={`mailto:${hotel.email}`} className="hover:text-gold">{hotel.email}</a></p>
          </address>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Follow</h3>
          <div className="flex gap-4">
            <a href={hotel.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:text-gold"><Instagram /></a>
            <a href={hotel.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-gold"><Facebook /></a>
            <a href={hotel.social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="hover:text-gold"><Youtube /></a>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            <li><Link to="/policies" className="opacity-80 hover:text-gold">Hotel Policies</Link></li>
            <li><Link to="/policies" hash="privacy" className="opacity-80 hover:text-gold">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-lux py-6 text-xs opacity-60">© {new Date().getFullYear()} {hotel.name}, {hotel.city}. All rights reserved.</div>
      </div>
    </footer>
  );
}
