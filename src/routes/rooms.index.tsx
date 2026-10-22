import { createFileRoute } from "@tanstack/react-router";
import { PageHero, RoomCard, SectionHead, TbcNote } from "@/components/site/ui";
import { img, rooms } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/rooms/")({
  head: () => seo("Rooms & Suites | The Lake Kingdom, Udaipur", "Heritage rooms and royal suites at The Lake Kingdom, a luxury boutique hotel in Udaipur, Rajasthan.", img.palaceInside),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <>
      <PageHero eyebrow="Stay" title="Rooms & Suites" image={img.palaceInside}>Spaces of quiet comfort, shaped by Mewari heritage.</PageHero>
      <section className="container-lux py-24">
        <SectionHead eyebrow="Accommodation" title="Choose your retreat">
          Every room detail below is a placeholder — update names, sizes, bedding and prices in one central file.
        </SectionHead>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
        </div>
        <TbcNote>Indicative prices are placeholders and subject to confirmation.</TbcNote>
      </section>
    </>
  );
}
