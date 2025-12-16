
export const footerlabels: { label: string; to: string }[] = [
  { label: "Terms", to: "#" },
  { label: "Disclosures", to: "#" },
  { label: "Latest News", to: "#" },
];

// constants/crypto-price/data.ts

export const pricedeta: {
  title: string;
  short: string;
  icon: string;
  background: string;
  width: number;
  height: number;
  padding: string;
}[] = [
  {
    title: "Bitcoin",
    short: "BTC/USD",
    icon: "/images/icons/icon-bitcoin.svg",
    background: "bg-warning/20",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: 'Ethereum',
    short: 'ETH/USD',
    icon: '/images/icons/icon-ethereum.svg',
    background: 'bg-blue-500/20',
    padding: 'p-4',
    width: 18,
    height: 20,
  },
  {
    title: 'BinanceCoin',
    short: 'BNB/USD',
    icon: '/images/icons/icon-bnb.svg',
    background: 'bg-yellow-500/20',
    padding: 'p-4',
    width: 18,
    height: 23,
  },
  {
    title: 'Ripple',
    short: 'XRP/USD',
    icon: '/images/icons/icon-ripple.svg',
    background: 'bg-blue-400/20',
    padding: 'p-4',
    width: 40,
    height: 40,
  },
  {
    title: 'Cardano',
    short: 'ADA/USD',
    icon: '/images/icons/icon-cardano.svg',
    background: 'bg-blue-600/20',
    padding: 'p-4',
    width: 40,
    height: 40,
  },
  {
    title: 'Solana',
    short: 'SOL/USD',
    icon: '/images/icons/icon-solana.svg',
    background: 'bg-purple-500/20',
    padding: 'p-4',
    width: 40,
    height: 40,
  },
];
export const portfolioData: { image: string; title: string }[] = [
  {
    image: "/images/portfolio/portfolio-icon-1.svg",
    title: "Manage your portfolio",
  },
  {
    image: "/images/portfolio/portfolio-icon-2.svg",
    title: "Vault protection",
  },
  {
    image: "/images/portfolio/portfolio-icon-3.svg",
    title: "Mobile access",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "Fast bill payments" },
  { title: "Secure airtime & data top-ups" },
  { title: "Reliable crypto trading" },
  { title: "Low transaction fees" },
  { title: "24/7 automated service" },
  { title: "Easy wallet funding" },
  { title: "Simple user dashboard" },
  { title: "No middlemen" },
];


export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
{
  icon: "/images/perks/peak-icon-1.svg",
  title: "24/7 Support",
  text: "Get instant help with payments, airtime, and crypto—anytime.",
  space: "lg:mt-8",
},
{
  icon: "/images/perks/peak-icon-2.svg",
  title: "Community",
  text: "Connect with other users, share tips, and stay updated on Datafy services.",
  space: "lg:mt-14",
},
{
  icon: "/images/perks/peak-icon-3.svg",
  title: "Academy",
  text: "Learn how to pay bills, trade crypto, and manage your wallet for free.",
  space: "lg:mt-4",
},
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  {
    icon: "/images/timeline/icon-planning.svg",
    title: "Planning",
    text: "Map the project's scope and architecture",
    position: "md:top-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-refinement.svg",
    title: "Refinement",
    text: "Refine and improve your solution",
    position: "md:top-0 md:right-0",
  },
  {
    icon: "/images/timeline/icon-prototype.svg",
    title: "Prototype",
    text: "Build a working prototype to test your product",
    position: "md:bottom-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-support.svg",
    title: "Support",
    text: "Deploy the product and ensure full support by us",
    position: "md:bottom-0 md:right-0",
  },
];

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];