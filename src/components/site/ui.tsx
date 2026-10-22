import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BedDouble, Users } from "lucide-react";
import type { Room } from "@/data/site";

export function PageHero({ eyebrow, title, image, children }: { eyebrow: string; title: string; image: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[55vh] items-end overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="container-lux relative pb-16 pt-32 text-ivory animate-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-5xl md:text-7xl">{title}</h1>
        {children && <div className="mt-4 max-w-xl text-lg opacity-90">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, center }: { eyebrow: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl md:text-5xl">{title}</h2>
      <div className={`mt-5 h-px w-16 bg-gold ${center ? "mx-auto" : ""}`} />
      {children && <div className="mt-5 text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex flex-col bg-card shadow-lux">
      <Link to="/rooms/$slug" params={{ slug: room.slug }} className="img-zoom block aspect-[4/3]">
        <img src={room.images[0]} alt={`${room.name} placeholder photograph`} loading="lazy" className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-3xl">{room.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{room.short}</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" />{room.occupancy}</span>
          <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-gold" />{room.bed}</span>
        </div>
        <p className="mt-5 font-serif text-xl text-primary">{room.price}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <Link to="/rooms/$slug" params={{ slug: room.slug }} className="btn btn-outline">View Room</Link>
          <Link to="/book" search={{ room: room.name }} className="btn btn-primary">Enquire</Link>
        </div>
      </div>
    </article>
  );
}

export function TbcNote({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-xs italic text-muted-foreground">{children}</p>;
}
