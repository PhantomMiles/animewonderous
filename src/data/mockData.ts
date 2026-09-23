export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: number;
  category: string;
  status: 'upcoming' | 'past';
  tags?: string[];
}

export interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  title: string;
  body: string;
  category: string;
  createdAt: string;
  replies: number;
  likes: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  memberCount: number;
  verified: boolean;
  tags: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Oaloelas Chronicles: Rise of the Starlite',
    description: 'High-quality action figure with intricate details. This premium collectible features hand-painted accents and multiple articulation points.',
    price: 125000,
    currency: '₦',
    images: [
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=500',
      'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500',
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=500',
      'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=500'
    ],
    category: 'Figures',
    stock: 12,
    rating: 4.5,
    tags: ['New', 'Exclusive']
  },
  {
    id: '2',
    name: 'Kiso Tsugyu Mighty',
    description: 'Limited edition collectable statue. A masterpiece of craftsmanship depicting the legendary Kiso Tsugyu in a dynamic battle pose.',
    price: 85000,
    currency: '₦',
    images: [
      'https://images.unsplash.com/photo-1559535332-db9971090158?q=80&w=500',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500'
    ],
    category: 'Statues',
    stock: 5,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Rake Guaire Nurn Hoody',
    description: 'Authentic anime apparel made with premium cotton. High-density embroidery and custom oversized fit for ultimate comfort.',
    price: 35000,
    currency: '₦',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500'
    ],
    category: 'Apparel',
    stock: 25,
    rating: 4.2
  },
  {
    id: '4',
    name: 'Spiva Goordane OST',
    description: 'Official soundtrack CD with bonus tracks and a limited edition 24-page art booklet featuring conceptual sketches.',
    price: 15000,
    currency: '₦',
    images: [
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500',
      'https://images.unsplash.com/photo-1514894780063-58787a8f8b4c?q=80&w=500'
    ],
    category: 'Media',
    stock: 50,
    rating: 4.9
  }
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Comiket 102 Anime Expo',
    description: 'The biggest anime event of the year returns. Join for three days of cosplay, panels, and exclusive early-access screenings.',
    date: 'Oct 14, 2026',
    location: 'Lagos Landmark Center',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800',
    price: 15000,
    category: 'Exhibition',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'World Cosplay Summit',
    description: 'Global cosplay competition and parade. Watch the finest creators from across the continent compete for the crown.',
    date: 'Nov 02, 2026',
    location: 'Abuja International Conference Center',
    image: 'https://images.unsplash.com/photo-1533481406255-7a699c723440?q=80&w=800',
    price: 10000,
    category: 'Performance',
    status: 'upcoming'
  }
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    author: {
      name: 'AnimeLover99',
      avatar: 'https://i.pravatar.cc/150?u=1',
      verified: true
    },
    title: 'Who else is excited for the new season of Oaloelas?',
    body: 'The trailer just dropped and it looks absolutely stunning! The animation quality has improved so much.',
    category: 'General',
    createdAt: '2 hours ago',
    replies: 156,
    likes: 1200
  },
  {
    id: '2',
    author: {
      name: 'OtakuPrime',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    title: 'The best way to watch anime: Subs vs Dubs',
    body: 'Let\'s settle this once and for all. What do you prefer and why?',
    category: 'Discussions',
    createdAt: '5 hours ago',
    replies: 452,
    likes: 890
  }
];

export const COMMUNITIES: Community[] = [
  {
    id: '1',
    name: 'Starlite Knights',
    description: 'A community dedicated to the Oaloelas series.',
    avatar: 'https://images.unsplash.com/photo-1560169897-bb334ee5babc?q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800',
    memberCount: 15400,
    verified: true,
    tags: ['Series', 'Official']
  },
  {
    id: '2',
    name: 'Cosplay Creators',
    description: 'Tips, tricks, and showcases of amazing cosplay.',
    avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
    memberCount: 8200,
    verified: false,
    tags: ['Art', 'Community']
  }
];
