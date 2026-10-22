/**
 * CENTRAL CONTENT FILE — edit hotel details, rooms, images and copy here.
 * Anything marked "TBC" is a placeholder awaiting confirmation from the hotel.
 * Images are temporary Udaipur photographs from Wikimedia Commons — replace
 * the URLs in `img` below with the hotel's own photographs.
 */
import logoAsset from "@/assets/logo.png.asset.json";

const wm = (path: string) =>
  `https://thumb.wikimedia.org/wikipedia/commons/thumb/${path}/1600px-${path.split("/").pop()}`;

export const img = {
  hero: wm("7/74/20191207_Lake_Pichola%2C_City_Palace%2C_Udaipur%2C_1516_7254.jpg"),
  sunset: wm("d/dd/Lake_Pichola_at_sunset%2C_Udaipur%2C_Rajasthan%2C_India.jpg"),
  lakePalace: wm("f/f7/Lake_Palace%2C_Lake_Pichola%2C_Udaipur.jpg"),
  lakePalace2: wm("6/65/Lake_Palace%2C_Lake_Pichola%2C_Udaipur_2.jpg"),
  cityPalace: wm("b/b2/20191207_City_Palace%2C_Udaipur%2C_1422_7187.jpg"),
  cityPalace2: wm("5/5c/20191207_City_Palace%2C_Udaipur_1701_7325.jpg"),
  cityPalace3: wm("a/a0/City_Palace%2C_Udaipur%2C_20191207_1542_7282.jpg"),
  mohanTemple: wm("e/e9/20191207_City_Palace%2C_Mohan_Temple_and_Lake_Pichola%2C_Udaipur%2C_1523_7262.jpg"),
  jagMandir: wm("b/ba/Jag_Mandir_Palace.jpg"),
  jagNiwas: wm("e/e4/Udaipur-Lac_Pichola-Jag_Niwas-20131013.jpg"),
  palaceInside: wm("d/d0/Rajasthan-Udaipur_Palace_Inside_03.jpg"),
  shivNiwas: wm("d/d2/Shiv_Niwas_Palace%2C_Udaipur%2C_20191207_1408_7142.jpg"),
  shivNiwas2: wm("8/88/Shiv_Niwas_Palace%2C_Udaipur%2C_20191207_1409_7147.jpg"),
  cityView: wm("3/34/View_of_Udaipur_from_City_Palace.jpg"),
  lakeView: wm("0/07/Taj_Lake_Palace_Udaipur_from_City_Palace.jpg"),
  pichola: wm("5/59/Udaipur%2C_India%2C_Lake_Palace_on_Lake_Pichola.jpg"),
};

export const hotel = {
  name: "The Lake Kingdom",
  tagline: "A Royal Escape by the Lakes",
  city: "Udaipur",
  region: "Rajasthan, India",
  logo: logoAsset.url,
  // TBC — replace every value below with confirmed details
  address: "Address to be confirmed, Udaipur, Rajasthan 313001",
  phone: "+91 00000 00000",
  email: "reservations@example.com",
  whatsapp: "910000000000", // digits only, with country code
  checkIn: "2:00 PM (TBC)",
  checkOut: "11:00 AM (TBC)",
  mapEmbed: "https://www.google.com/maps?q=Udaipur,Rajasthan&output=embed",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  /** Where enquiries go. "whatsapp" or "email". Swap for a booking engine URL later. */
  enquiryChannel: "whatsapp" as "whatsapp" | "email",
  bookingEngineUrl: "" as string, // e.g. "https://booking-engine.example.com" — when set, Book buttons use it
};

export const nav = [
  { to: "/rooms", label: "Rooms & Suites" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export type Room = {
  slug: string;
  name: string;
  short: string;
  description: string;
  occupancy: string;
  bed: string;
  size: string;
  price: string; // indicative — TBC
  amenities: string[];
  images: string[];
};

export const rooms: Room[] = [
  {
    slug: "heritage-room",
    name: "Heritage Room",
    short: "A calm, warmly appointed room inspired by Mewari craftsmanship.",
    description:
      "Placeholder description: a restful room with hand-finished details, soft textiles and a quiet palette drawn from old Udaipur. Replace with the confirmed room description.",
    occupancy: "2 adults",
    bed: "King or twin (TBC)",
    size: "Size TBC",
    price: "From ₹ — TBC / night",
    amenities: ["Air conditioning", "Wi-Fi", "Ensuite bathroom", "Tea & coffee", "Smart TV"],
    images: [img.palaceInside, img.shivNiwas, img.cityPalace2],
  },
  {
    slug: "royal-suite",
    name: "Royal Suite",
    short: "Generous living space with a separate sitting area for slow mornings.",
    description:
      "Placeholder description: a spacious suite with a lounge, carved accents and room to unwind. Replace with the confirmed suite description and view details.",
    occupancy: "2 adults + 1 child",
    bed: "King (TBC)",
    size: "Size TBC",
    price: "From ₹ — TBC / night",
    amenities: ["Sitting area", "Wi-Fi", "Bathtub (TBC)", "Minibar", "Room service"],
    images: [img.shivNiwas2, img.cityPalace3, img.palaceInside],
  },
  {
    slug: "kingdom-suite",
    name: "Kingdom Suite",
    short: "Our signature suite, designed for celebrations and longer stays.",
    description:
      "Placeholder description: the property's most expansive accommodation, ideal for honeymoons and special occasions. Replace with confirmed features.",
    occupancy: "3 adults",
    bed: "King + daybed (TBC)",
    size: "Size TBC",
    price: "From ₹ — TBC / night",
    amenities: ["Private balcony (TBC)", "Wi-Fi", "Lounge", "Premium toiletries", "Butler on call (TBC)"],
    images: [img.lakePalace2, img.shivNiwas, img.jagNiwas],
  },
  {
    slug: "family-room",
    name: "Family Room",
    short: "Thoughtfully arranged for families travelling together.",
    description:
      "Placeholder description: a roomy layout with flexible bedding for parents and children. Replace with confirmed configuration.",
    occupancy: "2 adults + 2 children",
    bed: "King + twin (TBC)",
    size: "Size TBC",
    price: "From ₹ — TBC / night",
    amenities: ["Extra bedding", "Wi-Fi", "Ensuite bathroom", "Smart TV", "Tea & coffee"],
    images: [img.cityPalace, img.palaceInside, img.cityView],
  },
];

export type Experience = { id: string; title: string; text: string; image: string };
export const experiences: Experience[] = [
  { id: "lake", title: "Lake Experiences", text: "Sunset boat rides on Lake Pichola can be arranged on request. Details TBC.", image: img.sunset },
  { id: "sightseeing", title: "Local Sightseeing", text: "Guided visits to the City Palace, Jag Mandir and old-city bazaars. Itineraries TBC.", image: img.cityPalace },
  { id: "culture", title: "Rajasthani Culture", text: "Evenings of folk music, puppetry and craft — subject to confirmation.", image: img.mohanTemple },
  { id: "dining", title: "Dining", text: "Regional Mewari and contemporary menus. Restaurant details TBC.", image: img.jagNiwas },
  { id: "relaxation", title: "Relaxation", text: "Quiet corners, terraces and wellness offerings to be confirmed.", image: img.lakeView },
  { id: "celebrations", title: "Celebrations", text: "Intimate gatherings and special occasions. Packages TBC.", image: img.jagMandir },
];

export const amenities = ["Free Wi-Fi", "24-hour front desk", "Airport transfers (TBC)", "Room service", "Travel desk", "Parking (TBC)"];

export type GalleryCategory = "Rooms" | "Property" | "Dining" | "Experiences" | "Surroundings";
export const galleryCategories: GalleryCategory[] = ["Rooms", "Property", "Dining", "Experiences", "Surroundings"];
export const gallery: { src: string; alt: string; category: GalleryCategory }[] = [
  { src: img.hero, alt: "City Palace overlooking Lake Pichola", category: "Surroundings" },
  { src: img.palaceInside, alt: "Ornate palace interior with arches", category: "Rooms" },
  { src: img.sunset, alt: "Lake Pichola at sunset", category: "Experiences" },
  { src: img.shivNiwas, alt: "Heritage courtyard architecture", category: "Property" },
  { src: img.jagNiwas, alt: "Lakeside palace on the water", category: "Dining" },
  { src: img.cityPalace2, alt: "Carved balconies of the City Palace", category: "Property" },
  { src: img.lakePalace, alt: "Lake Palace reflected on still water", category: "Surroundings" },
  { src: img.shivNiwas2, alt: "Palace terrace in soft light", category: "Rooms" },
  { src: img.jagMandir, alt: "Jag Mandir island palace", category: "Experiences" },
  { src: img.cityView, alt: "View over Udaipur rooftops", category: "Surroundings" },
  { src: img.mohanTemple, alt: "Temple spires beside the lake", category: "Experiences" },
  { src: img.lakeView, alt: "Lake view from the palace", category: "Dining" },
];

/** PLACEHOLDER testimonials — not real guest reviews. Replace with verified reviews. */
export const testimonials = [
  { quote: "Placeholder testimonial — add a verified guest review here.", name: "Guest name", origin: "City, Country" },
  { quote: "Placeholder testimonial — a second verified review will appear here.", name: "Guest name", origin: "City, Country" },
  { quote: "Placeholder testimonial — replace with a confirmed review from a booking platform.", name: "Guest name", origin: "City, Country" },
];

/** Distances TBC once the property address is confirmed. */
export const attractions = [
  { name: "City Palace", distance: "Distance TBC" },
  { name: "Lake Pichola", distance: "Distance TBC" },
  { name: "Jagdish Temple", distance: "Distance TBC" },
  { name: "Fateh Sagar Lake", distance: "Distance TBC" },
  { name: "Saheliyon ki Bari", distance: "Distance TBC" },
  { name: "Maharana Pratap Airport", distance: "Distance TBC" },
];
