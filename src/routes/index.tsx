import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Quote } from "lucide-react";
import { BookingPanel } from "@/components/site/BookingPanel";
import { RoomCard, SectionHead, TbcNote } from "@/components/site/ui";
import { amenities, attractions, experiences, gallery, hotel, img, rooms, testimonials } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("The Lake Kingdom | Luxury Lakeside Hotel in Udaipur", "A royal escape by the lakes of Udaipur, Rajasthan. Discover heritage rooms and suites, local experiences and warm Rajasthani hospitality.", img.hero),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={img.hero} alt="City Palace rising above Lake Pichola, Udaipur" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-lux relative pb-40 pt-24 text-center text-ivory animate-rise">
          <p className="eyebrow">{hotel.city} · {hotel.region}</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl leading-[1.05] md:text-8xl">{hotel.tagline}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg opacity-90">Discover exceptional hospitality in the City of Lakes — where heritage, serenity and warm Rajasthani welcome meet.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/rooms" className="btn btn-gold">Explore Our Rooms</Link>
            <Link to="/about" className="btn btn-outline-light">Discover Our Story</Link>
          </div>
        </div>
      </section>

      <div className="container-lux relative z-10 -mt-24">
        <BookingPanel />
      </div>

      <section className="container-lux grid items-center gap-14 py-28 md:grid-cols-2">
        <SectionHead eyebrow="Welcome" title="Hospitality shaped by the lakes of Mewar">
          <p>The Lake Kingdom is a boutique retreat in Udaipur, inspired by the city's palaces, courtyards and still waters. This introduction is a placeholder — replace it with the hotel's own story and confirmed features.</p>
          <Link to="/about" className="btn btn-outline mt-8">About Us</Link>
        </SectionHead>
        <div className="grid grid-cols-2 gap-4">
          <img src={img.cityPalace2} alt="Carved palace balconies" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          <img src={img.jagNiwas} alt="Palace on Lake Pichola" loading="lazy" className="mt-12 aspect-[3/4] w-full object-cover" />
        </div>
      </section>

      <section className="bg-secondary py-28">
        <div className="container-lux">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Stay" title="Rooms & Suites" />
            <Link to="/rooms" className="btn btn-outline">View All</Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {rooms.slice(0, 3).map((r) => <RoomCard key={r.slug} room={r} />)}
          </div>
          <TbcNote>Prices, sizes and occupancy are indicative placeholders pending confirmation.</TbcNote>
        </div>
      </section>

      <section className="container-lux py-28">
        <SectionHead center eyebrow="Experiences" title="Moments worth travelling for" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.slice(0, 3).map((e) => (
            <Link key={e.id} to="/experiences" hash={e.id} className="img-zoom group relative block aspect-[4/5]">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="hero-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                <h3 className="text-3xl">{e.title}</h3>
                <p className="mt-2 text-sm opacity-85">{e.text}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 border-y py-10">
          <p className="eyebrow text-center">Amenities</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-3 font-serif text-xl">
            {amenities.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-primary py-28 text-primary-foreground">
        <div className="container-lux">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Gallery" title="Glimpses of Udaipur" />
            <Link to="/gallery" className="btn btn-outline-light">Open Gallery</Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.slice(0, 8).map((g, i) => (
              <Link to="/gallery" key={g.src} className={`img-zoom block ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={g.src} alt={g.alt} loading="lazy" className="aspect-square h-full w-full object-cover" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-lux py-28">
        <SectionHead center eyebrow="Guest Words" title="Testimonials" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="border bg-card p-8">
              <Quote className="h-6 w-6 text-gold" />
              <blockquote className="mt-4 font-serif text-xl italic">{t.quote}</blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{t.name} — {t.origin}</figcaption>
            </figure>
          ))}
        </div>
        <TbcNote>These are placeholder testimonials, not real guest reviews.</TbcNote>
      </section>

      <section className="bg-secondary py-28">
        <div className="container-lux grid gap-14 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Location" title="In the heart of the City of Lakes">
              <p className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-gold" />{hotel.address}</p>
            </SectionHead>
            <ul className="mt-8 divide-y border-y">
              {attractions.map((a) => (
                <li key={a.name} className="flex justify-between py-4"><span className="font-serif text-lg">{a.name}</span><span className="text-sm text-muted-foreground">{a.distance}</span></li>
              ))}
            </ul>
          </div>
          <iframe title="Map of Udaipur" src={hotel.mapEmbed} loading="lazy" className="min-h-[420px] w-full border-0" />
        </div>
      </section>

      <section className="relative overflow-hidden py-32 text-center">
        <img src={img.sunset} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-lux relative text-ivory">
          <p className="eyebrow">Plan your stay</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-5xl md:text-6xl">Your royal escape awaits</h2>
          <Link to="/book" className="btn btn-gold mt-10">Book Your Stay</Link>
        </div>
      </section>
    </>
  );
}
