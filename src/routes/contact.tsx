import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero, TbcNote } from "@/components/site/ui";
import { hotel, img } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact & Location | The Lake Kingdom, Udaipur", "Contact The Lake Kingdom in Udaipur, Rajasthan — phone, email, WhatsApp, directions and enquiries.", img.pichola),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: MapPin, label: "Address", value: hotel.address },
    { icon: Phone, label: "Phone", value: hotel.phone, href: `tel:${hotel.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: hotel.email, href: `mailto:${hotel.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: `+${hotel.whatsapp}`, href: `https://wa.me/${hotel.whatsapp}` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" image={img.pichola} />
      <section className="container-lux grid gap-14 py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-4xl">Get in touch</h2>
          <ul className="mt-8 space-y-6">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div><p className="eyebrow">{label}</p>{href ? <a href={href} className="mt-1 block hover:text-gold">{value}</a> : <p className="mt-1">{value}</p>}</div>
              </li>
            ))}
          </ul>
          <TbcNote>Contact details are placeholders — to be confirmed.</TbcNote>
        </div>
        <div>
          <h2 className="mb-6 text-4xl">Send an enquiry</h2>
          <EnquiryForm showStay={false} />
        </div>
      </section>
      <iframe title="Map showing The Lake Kingdom location" src={hotel.mapEmbed} loading="lazy" className="h-[450px] w-full border-0" />
    </>
  );
}
