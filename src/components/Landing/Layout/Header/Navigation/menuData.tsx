// Local HeaderItem type to avoid missing '@/types/menu' module
type HeaderItem = {
  label: string;
  to: string;
};

export const headerData: HeaderItem[] = [
  { label: "Features", to: "/#work" },
  { label: "Benefits", to: "/#development" },
  { label: "Services", to: "/#portfolio" },
  { label: "Why Datafy", to: "/#upgrade" },
  { label: "FAQs", to: "/#faq" },
];
