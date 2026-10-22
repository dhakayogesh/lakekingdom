import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SectionHead } from "@/components/site/ui";
import { hotel } from "@/data/site";
import { seo } from "@/lib/seo";

const search = z.object({
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  adults: z.coerce.number().optional(),
  children: z.coerce.number().optional(),
  rooms: z.coerce.number().optional(),
  room: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: (s) => search.parse(s),
  head: () => seo("Booking Enquiry | The Lake Kingdom, Udaipur", "Send a booking enquiry to The Lake Kingdom, Udaipur. Choose your dates, guests and room and our team will confirm availability."),
  component: Book,
});

function Book() {
  const s = Route.useSearch();
  return (
    <section className="container-lux grid gap-14 py-20 lg:grid-cols-[1fr_1.5fr]">
      <SectionHead eyebrow="Book your stay" title="Booking enquiry">
        <p>Tell us your dates and guests. We'll confirm availability and rates personally — there's no instant reservation yet.</p>
        <p className="mt-4">Prefer to call? <a className="text-primary underline" href={`tel:${hotel.phone.replace(/\s/g, "")}`}>{hotel.phone}</a></p>
      </SectionHead>
      {hotel.bookingEngineUrl ? (
        <a href={hotel.bookingEngineUrl} className="btn btn-primary self-start">Continue to booking</a>
      ) : (
        <EnquiryForm initial={s} />
      )}
    </section>
  );
}
