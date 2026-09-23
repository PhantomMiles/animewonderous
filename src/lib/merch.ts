// data/merch.ts

export interface MerchItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export const featuredMerch: MerchItem[] = [
  {
    id: 1,
    name: "Gojo Satoru Figure",
    price: "₦45,000",
    image: "/merch/gojo.jpg",
  },
  {
    id: 2,
    name: "Akatsuki Hoodie",
    price: "₦25,000",
    image: "/merch/akatsuki-hoodie.jpg",
  },
  {
    id: 3,
    name: "One Piece Straw Hat",
    price: "₦12,000",
    image: "/merch/straw-hat.jpg",
  },
  {
    id: 4,
    name: "Naruto Uzumaki Figure",
    price: "₦40,000",
    image: "/merch/naruto.jpg",
  },
  {
    id: 5,
    name: "Demon Slayer Hoodie",
    price: "₦28,000",
    image: "/merch/demon-slayer-hoodie.jpg",
  },
];