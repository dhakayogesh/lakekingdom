import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { RoomCard, SectionHead, TbcNote } from "@/components/site/ui";
import { rooms } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const room = rooms.find((r) => r.slug === params.slug);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(`${loaderData.room.name} | The Lake Kingdom, Udaipur`, loaderData.room.short, loaderData.room.images[0])
      : { meta: [{ title: "Room not found | The Lake Kingdom" }, { name: "robots", content: "noindex" }] },
  component: RoomPage,
});

function RoomPage() {
  const { room } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 2);
  return (
    <>
      <section className="container-lux py-16">
        <Link to="/rooms" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold">← All rooms</Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <img src={room.images[active]} alt={`${room.name} — photo ${active + 1}`} className="aspect-[4/3] w-full object-cover shadow-lux" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {room.images.map((src, i) => (
                <button key={src} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} className={`border-2 ${i === active ? "border-gold" : "border-transparent"}`}>
                  <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Room</p>
            <h1 className="mt-3 text-5xl md:text-6xl">{room.name}</h1>
            <p className="mt-6 leading-relaxed text-muted-foreground">{room.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-y py-6 text-sm">
              <div><dt className="eyebrow">Occupancy</dt><dd className="mt-1">{room.occupancy}</dd></div>
              <div><dt className="eyebrow">Bed</dt><dd className="mt-1">{room.bed}</dd></div>
              <div><dt className="eyebrow">Size</dt><dd className="mt-1">{room.size}</dd></div>
              <div><dt className="eyebrow">Rate</dt><dd className="mt-1">{room.price}</dd></div>
            </dl>
            <h2 className="mt-8 text-2xl">Amenities</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {room.amenities.map((a) => <li key={a} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-gold" />{a}</li>)}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/book" search={{ room: room.name }} className="btn btn-primary">Enquire to Book</Link>
              <Link to="/contact" className="btn btn-outline">Ask a Question</Link>
            </div>
            <TbcNote>All room details are placeholders pending confirmation.</TbcNote>
          </div>
        </div>
      </section>
      <section className="bg-secondary py-24">
        <div className="container-lux">
          <SectionHead eyebrow="Also consider" title="Other rooms" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">{others.map((r) => <RoomCard key={r.slug} room={r} />)}</div>
        </div>
      </section>
    </>
  );
}
