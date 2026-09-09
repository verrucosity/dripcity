export type Producer = {
  handle: string;
  name: string;
  traktrainUrl: string;
  traktrainWidgetSrc: string;
};

export const producers: Producer[] = [
  {
    handle: "prodbysu",
    name: "ProdBySu",
    traktrainUrl: "https://traktrain.com/prodbysu",
    traktrainWidgetSrc: "https://traktrain.com/widget/184005",
  },
];

export function getProducer(handle: string) {
  return producers.find((producer) => producer.handle === handle);
}
