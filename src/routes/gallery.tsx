import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/ui";
import { gallery, galleryCategories, img, type GalleryCategory } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => seo("Gallery | The Lake Kingdom, Udaipur", "Photographs of rooms, property, dining, experiences and Udaipur surroundings at The Lake Kingdom.", img.lakePalace),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o! + 1) % items.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o! - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, items.length]);

  return (
    <>
      <PageHero eyebrow="Gallery" title="Through the lens" image={img.lakePalace} />
      <section className="container-lux py-20">
        <div className="flex flex-wrap justify-center gap-2" role="tablist">
          {(["All", ...galleryCategories] as const).map((c) => (
            <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
              className={`btn ${filter === c ? "btn-primary" : "btn-outline"} px-5 py-2.5`}>{c}</button>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">No photographs in this category yet.</p>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((g, i) => (
              <button key={g.src} onClick={() => setOpen(i)} className="img-zoom mb-4 block w-full" aria-label={`Open ${g.alt}`}>
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full" />
              </button>
            ))}
          </div>
        )}
        <p className="mt-6 text-center text-xs italic text-muted-foreground">Temporary Udaipur photographs (Wikimedia Commons) — to be replaced with the hotel's own images.</p>
      </section>
      {open !== null && items[open] && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[60] flex items-center justify-center bg-overlay/95 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-5 top-5 text-ivory" aria-label="Close" onClick={() => setOpen(null)}><X className="h-8 w-8" /></button>
          <button className="absolute left-3 text-ivory" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }}><ChevronLeft className="h-10 w-10" /></button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
            <img src={items[open].src} alt={items[open].alt} className="max-h-[80vh] w-auto" />
            <figcaption className="mt-3 text-center text-sm text-ivory">{items[open].alt}</figcaption>
          </figure>
          <button className="absolute right-3 text-ivory" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % items.length); }}><ChevronRight className="h-10 w-10" /></button>
        </div>
      )}
    </>
  );
}
