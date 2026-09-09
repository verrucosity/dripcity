const PRESALE_ENDS = new Date("2026-10-08T07:00:00Z");

export const event = {
  name: "Live in Modesto",
  venue: "Club Paradise",
  address: "605 H St, Modesto, CA",
  date: "October 16",
  time: "Doors 9PM, Starts: 9-10PM",
  postponed: true,
  totalCapacity: 300,
  sellingFastAt: 50,
  lineup: ["JhoodTwin", "BabyDonkk3", "Doe7even"],
  host: "ProdBySu",
  sound: "DJ Sanni & SilentProfit",
  flyerImage: "/images/events/live-in-modesto-flyer.webp",
  ageRestriction: "21+",
  tiers: {
    ga: {
      label: "General Admission",
      description: "Standard entry.",
      price: 30,
      presalePrice: 20,
      capacityUsed: 1,
    },
    reserved: {
      label: "Table + Bottle Service",
      description: "Up to 6 guests, includes a bottle.",
      price: 400,
      capacityUsed: 6,
    },
  },
};

export type TicketTierKey = keyof typeof event.tiers;

export function isPresaleActive() {
  return Date.now() < PRESALE_ENDS.getTime();
}

export function getTierPrice(tierKey: TicketTierKey) {
  if (tierKey === "ga" && isPresaleActive()) {
    return event.tiers.ga.presalePrice;
  }
  return event.tiers[tierKey].price;
}
