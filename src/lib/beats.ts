export type Producer = {
  handle: string;
  name: string;
  traktrainUrl: string;
  traktrainWidgetSrc: string;
};

export const producers: Producer[] = [
  { handle: "section-8", name: "Section 8", traktrainUrl: "", traktrainWidgetSrc: "" },
  {
    handle: "prodbysu",
    name: "ProdBySu",
    traktrainUrl: "https://traktrain.com/prodbysu",
    traktrainWidgetSrc: "",
  },
  { handle: "prodbyjones", name: "ProdByJones", traktrainUrl: "", traktrainWidgetSrc: "" },
  { handle: "prodbygaven", name: "ProdByGaven", traktrainUrl: "", traktrainWidgetSrc: "" },
];

export function getProducer(handle: string) {
  return producers.find((producer) => producer.handle === handle);
}
