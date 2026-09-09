export type Service = {
  handle: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    handle: "book-studio-time",
    title: "Book Studio Time",
    description: "Reserve studio time with the Drip Lab team for recording sessions.",
  },
  {
    handle: "book-music-video",
    title: "Book Music Video",
    description: "Full music video production, from concept and shoot to final edit.",
  },
  {
    handle: "book-drop-mic-video",
    title: "Book Drop Mic Video",
    description: "A drop mic video shoot for singles, freestyles, and social drops.",
  },
  {
    handle: "book-photo-shoot",
    title: "Book Photo Shoot",
    description: "Cover art, press shots, and promo photography with the Drip Lab crew.",
  },
  {
    handle: "song-mix-mastering",
    title: "Song Mix & Mastering Services",
    description: "Professional mixing and mastering to get a track release-ready.",
  },
];

export function getService(handle: string) {
  return services.find((service) => service.handle === handle);
}
