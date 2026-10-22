import { createFileRoute } from "@tanstack/react-router";
import { hotel } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/policies")({
  head: () => seo("Hotel Policies & Privacy | The Lake Kingdom", "Check-in, cancellation and privacy information for The Lake Kingdom, Udaipur."),
  component: Policies,
});

function Policies() {
  return (
    <section className="container-lux max-w-3xl py-24">
      <p className="eyebrow">Information</p>
      <h1 className="mt-3 text-5xl">Hotel Policies</h1>
      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <div><h2 className="text-2xl text-foreground">Check-in & check-out</h2><p className="mt-2">Check-in: {hotel.checkIn}. Check-out: {hotel.checkOut}.</p></div>
        <div><h2 className="text-2xl text-foreground">Cancellation</h2><p className="mt-2">Cancellation policy to be confirmed by the hotel.</p></div>
        <div><h2 className="text-2xl text-foreground">Children & extra beds</h2><p className="mt-2">Policy to be confirmed.</p></div>
        <div id="privacy" className="scroll-mt-32"><h2 className="text-2xl text-foreground">Privacy</h2><p className="mt-2">Enquiry details you submit are passed to our reservations team via WhatsApp or email only to respond to your request. Full privacy policy to be confirmed.</p></div>
      </div>
    </section>
  );
}
