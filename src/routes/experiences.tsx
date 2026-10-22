import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, TbcNote } from "@/components/site/ui";
import { experiences, img } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/experiences")({
  head: () => seo("Experiences in Udaipur | The Lake Kingdom", "Lake boat rides, sightseeing, Rajasthani culture, dining and relaxation curated by The Lake Kingdom in Udaipur.", img.sunset),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <>
      <PageHero eyebrow="Experiences" title="Udaipur, unhurried" image={img.sunset}>Lakes, palaces and living traditions — curated around your stay.</PageHero>
      <div className="container-lux py-24">
        {experiences.map((e, i) => (
          <section key={e.id} id={e.id} className="grid scroll-mt-32 items-center gap-10 py-12 md:grid-cols-2 md:gap-16">
            <div className={`img-zoom ${i % 2 ? "md:order-2" : ""}`}>
              <img src={e.image} alt={e.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="mt-3 text-4xl md:text-5xl">{e.title}</h2>
              <div className="mt-5 h-px w-16 bg-gold" />
              <p className="mt-5 leading-relaxed text-muted-foreground">{e.text}</p>
              <Link to="/contact" className="btn btn-outline mt-8">Enquire</Link>
            </div>
          </section>
        ))}
        <TbcNote>All experiences are editable placeholders until the hotel's actual offerings are confirmed.</TbcNote>
      </div>
    </>
  );
}
