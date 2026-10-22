export function seo(title: string, description: string, image?: string) {
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (image) meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  return { meta };
}
