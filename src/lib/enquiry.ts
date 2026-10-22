import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { hotel } from "@/data/site";

export type Enquiry = {
  checkIn: string; // yyyy-MM-dd
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  room?: string;
  name?: string;
  contact?: string;
  message?: string;
};

export function validateDates(checkIn: string, checkOut: string): string | null {
  if (!checkIn || !checkOut) return "Please choose both check-in and check-out dates.";
  if (differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn)) < 1)
    return "Check-out must be after check-in.";
  return null;
}

export function nights(checkIn: string, checkOut: string) {
  return Math.max(0, differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn)));
}

export function summary(e: Enquiry) {
  const lines = [
    `${e.checkIn ? "Booking enquiry" : "Enquiry"} — ${hotel.name}`,
    e.room ? `Room: ${e.room}` : null,
    e.checkIn ? `Check-in: ${format(parseISO(e.checkIn), "d MMM yyyy")}` : null,
    e.checkOut ? `Check-out: ${format(parseISO(e.checkOut), "d MMM yyyy")} (${nights(e.checkIn, e.checkOut)} nights)` : null,
    e.checkIn ? `Guests: ${e.adults} adults, ${e.children} children · Rooms: ${e.rooms}` : null,
    e.name ? `Name: ${e.name}` : null,
    e.contact ? `Contact: ${e.contact}` : null,
    e.message ? `Message: ${e.message}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

/** Modular hand-off point: swap this for a booking engine / channel manager later. */
export function enquiryUrl(e: Enquiry) {
  const text = encodeURIComponent(summary(e));
  if (hotel.enquiryChannel === "email")
    return `mailto:${hotel.email}?subject=${encodeURIComponent("Booking enquiry")}&body=${text}`;
  return `https://wa.me/${hotel.whatsapp}?text=${text}`;
}
