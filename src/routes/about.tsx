import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHead, TbcNote } from "@/components/site/ui";
import { hotel, img } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us | The Lake Kingdom, Udaipur", "The story, property and hospitality philosophy of The Lake Kingdom, a boutique hotel in Udaipur, Rajasthan.", img.cityView),
  component: About,
});

const pillars = [
  { t: "Warmth", d: "Placeholder: hospitality rooted in the Rajasthani tradition of atithi devo bhava." },
  { t: "Heritage", d: "Placeholder: design and service that honour Udaipur's craft and history." },
  { t: "Serenity", d: "Placeholder: an unhurried pace, shaped by the stillness of the lakes." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Our Story" image={img.cityView}>A lakeside welcome in the City of Lakes.</PageHero>
      <section className="container-lux grid items-center gap-14 py-24 md:grid-cols-2">
        <SectionHead eyebrow="Brand story" title={`The heart of ${hotel.name}`}>
          <p>Placeholder story — share how the hotel began, the family or team behind it, and what makes it distinct. This section is ready for the hotel's actual history.</p>
        </SectionHead>
        <img src={img.cityPalace3} alt="Udaipur palace architecture" loading="lazy" className="aspect-[4/5] w-full object-cover shadow-lux" />
      </section>
      <section className="bg-secondary py-24">
        <div className="container-lux grid items-center gap-14 md:grid-cols-2">
          <img src={img.shivNiwas} alt="Heritage courtyard" loading="lazy" className="aspect-[4/3] w-full object-cover md:order-1" />
          <SectionHead eyebrow="The property" title="A retreat by the water">
            <p>Placeholder property introduction — number of rooms, architecture, setting and unique features (to be confirmed; no lake-view claims until verified).</p>
          </SectionHead>
        </div>
      </section>
      <section className="container-lux py-24">
        <SectionHead center eyebrow="Philosophy" title="How we host" />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.t} className="border-t-2 border-gold pt-6">
              <h3 className="text-3xl">{p.t}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
        <TbcNote>All About Us copy is placeholder text awaiting the hotel's confirmed story.</TbcNote>
        <div className="mt-12 text-center"><Link to="/rooms" className="btn btn-primary">Explore Our Rooms</Link></div>
      </section>
    </>
  );
}
