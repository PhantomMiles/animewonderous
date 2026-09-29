// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   images: string[];
//   category: string;
//   stock: number;
//   rating: number;
//   tags?: string[];
// }

// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   image: string;
//   price: number;
//   category: string;
//   status: 'upcoming' | 'past';
//   tags?: string[];
// }

// export interface ForumPost {
//   id: string;
//   author: {
//     name: string;
//     avatar: string;
//     verified?: boolean;
//   };
//   title: string;
//   body: string;
//   category: string;
//   createdAt: string;
//   replies: number;
//   likes: number;
// }

// export interface Community {
//   id: string;
//   name: string;
//   description: string;
//   avatar: string;
//   banner: string;
//   memberCount: number;
//   verified: boolean;
//   tags: string[];
// }

// export const PRODUCTS: Product[] = [
//   {
//     id: '1',
//     name: 'Oaloelas Chronicles: Rise of the Starlite',
//     description: 'High-quality action figure with intricate details. This premium collectible features hand-painted accents and multiple articulation points.',
//     price: 125000,
//     currency: '₦',
//     images: [
//       'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=500',
//       'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500',
//       'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=500',
//       'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=500'
//     ],
//     category: 'Figures',
//     stock: 12,
//     rating: 4.5,
//     tags: ['New', 'Exclusive']
//   },
//   {
//     id: '2',
//     name: 'Kiso Tsugyu Mighty',
//     description: 'Limited edition collectable statue. A masterpiece of craftsmanship depicting the legendary Kiso Tsugyu in a dynamic battle pose.',
//     price: 85000,
//     currency: '₦',
//     images: [
//       'https://images.unsplash.com/photo-1559535332-db9971090158?q=80&w=500',
//       'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500'
//     ],
//     category: 'Statues',
//     stock: 5,
//     rating: 4.8
//   },
//   {
//     id: '3',
//     name: 'Rake Guaire Nurn Hoody',
//     description: 'Authentic anime apparel made with premium cotton. High-density embroidery and custom oversized fit for ultimate comfort.',
//     price: 35000,
//     currency: '₦',
//     images: [
//       'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500',
//       'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500'
//     ],
//     category: 'Apparel',
//     stock: 25,
//     rating: 4.2
//   },
//   {
//     id: '4',
//     name: 'Spiva Goordane OST',
//     description: 'Official soundtrack CD with bonus tracks and a limited edition 24-page art booklet featuring conceptual sketches.',
//     price: 15000,
//     currency: '₦',
//     images: [
//       'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500',
//       'https://images.unsplash.com/photo-1514894780063-58787a8f8b4c?q=80&w=500'
//     ],
//     category: 'Media',
//     stock: 50,
//     rating: 4.9
//   }
// ];

// export const EVENTS: Event[] = [
//   {
//     id: '1',
//     title: 'Comiket 102 Anime Expo',
//     description: 'The biggest anime event of the year returns. Join for three days of cosplay, panels, and exclusive early-access screenings.',
//     date: 'Oct 14, 2026',
//     location: 'Lagos Landmark Center',
//     image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800',
//     price: 15000,
//     category: 'Exhibition',
//     status: 'upcoming'
//   },
//   {
//     id: '2',
//     title: 'World Cosplay Summit',
//     description: 'Global cosplay competition and parade. Watch the finest creators from across the continent compete for the crown.',
//     date: 'Nov 02, 2026',
//     location: 'Abuja International Conference Center',
//     image: 'https://images.unsplash.com/photo-1533481406255-7a699c723440?q=80&w=800',
//     price: 10000,
//     category: 'Performance',
//     status: 'upcoming'
//   }
// ];

// export const FORUM_POSTS: ForumPost[] = [
//   {
//     id: '1',
//     author: {
//       name: 'AnimeLover99',
//       avatar: 'https://i.pravatar.cc/150?u=1',
//       verified: true
//     },
//     title: 'Who else is excited for the new season of Oaloelas?',
//     body: 'The trailer just dropped and it looks absolutely stunning! The animation quality has improved so much.',
//     category: 'General',
//     createdAt: '2 hours ago',
//     replies: 156,
//     likes: 1200
//   },
//   {
//     id: '2',
//     author: {
//       name: 'OtakuPrime',
//       avatar: 'https://i.pravatar.cc/150?u=2'
//     },
//     title: 'The best way to watch anime: Subs vs Dubs',
//     body: 'Let\'s settle this once and for all. What do you prefer and why?',
//     category: 'Discussions',
//     createdAt: '5 hours ago',
//     replies: 452,
//     likes: 890
//   }
// ];

// export const COMMUNITIES: Community[] = [
//   {
//     id: '1',
//     name: 'Starlite Knights',
//     description: 'A community dedicated to the Oaloelas series.',
//     avatar: 'https://images.unsplash.com/photo-1560169897-bb334ee5babc?q=80&w=200',
//     banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800',
//     memberCount: 15400,
//     verified: true,
//     tags: ['Series', 'Official']
//   },
//   {
//     id: '2',
//     name: 'Cosplay Creators',
//     description: 'Tips, tricks, and showcases of amazing cosplay.',
//     avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200',
//     banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
//     memberCount: 8200,
//     verified: false,
//     tags: ['Art', 'Community']
//   }
// ];

// export interface EventItem {
//   id: string;
//   title: string;
//   date: string;
//   location: string;
//   category: string;
//   price: number;
//   image: string;
//   description: string;
// }

// export const EVENTS: EventItem[] = [
//   {
//     id: 'shibuya-fest-3',
//     title: 'Shibuya Fest 3.0',
//     date: 'December 2026',
//     location: 'Enugu, Nigeria',
//     category: 'Anime & Cosplay',
//     price: 3000,
//     image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200',
//     description:
//       'Enugu’s premier gaming, cosplay, and Japanese pop-culture festival returning for its third monumental edition.',
//   },
//   {
//     id: 'coden-2027',
//     title: 'CODEN (Call of Duty Enugu)',
//     date: 'August 2027',
//     location: 'Across Enugu Universities, Enugu',
//     category: 'Esports & Gaming',
//     price: 3000,
//     image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
//     description:
//       'Inter-university esports tournament and gaming convention taking place across tertiary campuses in Enugu.',
//   },
// ];

// export const ENUGU_UNIVERSITIES = [
//   {
//     name: 'University of Nigeria, Nsukka & Enugu Campus (UNN / UNEC)',
//     location: 'Nsukka & Independence Layout, Enugu',
//     role: 'Main Campus Hub & Finals Stage',
//   },
//   {
//     name: 'Enugu State University of Science and Technology (ESUT)',
//     location: 'Agbani, Enugu',
//     role: 'Esports Qualifiers Arena',
//   },
//   {
//     name: 'Godfrey Okoye University (GOUNI)',
//     location: 'Thinkers Corner / Ugwuomu-Nike, Enugu',
//     role: 'Tech & Gaming Innovation Center',
//   },
//   {
//     name: 'Coal City University (CCU)',
//     location: 'Independence Layout, Enugu',
//     role: 'Console & Fighter Stage',
//   },
//   {
//     name: 'Caritas University',
//     location: 'Amorji-Nike, Enugu',
//     role: 'Qualifiers Arena',
//   },
//   {
//     name: 'Institute of Management and Technology (IMT)',
//     location: 'Independence Layout, Enugu',
//     role: 'Exhibition & Merch Pavilion',
//   },
// ];

// export const ANIME_TICKET_TIERS = [
//   {
//     id: 'solo-leveling',
//     title: 'Solo Hunter Pass',
//     animeTheme: 'Solo Leveling / Ronin',
//     capacity: '1 Person (Solo)',
//     groupSize: 1,
//     price: 3000,
//     perks: [
//       '1x General Admission Pass',
//       'Access to main stages & gaming free-play zone',
//       'Standard event badge & lanyard',
//     ],
//   },
//   {
//     id: 'tag-team-duo',
//     title: 'Dual Wielder Duo Pass',
//     animeTheme: 'Jujutsu Kaisen / Tag-Team',
//     capacity: '2 People (Duo)',
//     groupSize: 2,
//     price: 5500,
//     perks: [
//       'Passes for 2 attendees',
//       '10% discount at official merch booths',
//       'Matching themed wristbands',
//     ],
//   },
//   {
//     id: 'genin-trio',
//     title: 'Genin Squad Pass',
//     animeTheme: 'Naruto / Team 7',
//     capacity: '3 People (Trio)',
//     groupSize: 3,
//     price: 8000,
//     perks: [
//       'Passes for 3 attendees',
//       'Priority queue for tournament registration',
//       '1x Group photobooth voucher',
//     ],
//   },
//   {
//     id: 'kage-council',
//     title: 'Five Kage Council Pass',
//     animeTheme: 'Naruto / Kage Squad',
//     capacity: '4 - 5 People (Squad)',
//     groupSize: 5,
//     price: 12500,
//     perks: [
//       'Passes for up to 5 attendees',
//       'Free energy drink & refreshment pack',
//       'Reserved VIP seating at tournament finals',
//     ],
//   },
//   {
//     id: 'hashira-brigade',
//     title: 'Hashira Brigade Pass',
//     animeTheme: 'Demon Slayer / Hashira',
//     capacity: '6 - 8 People (Guild)',
//     groupSize: 8,
//     price: 19000,
//     perks: [
//       'Passes for up to 8 attendees',
//       'Cosplay runway showcase priority seating',
//       'Dedicated group lounge seat',
//     ],
//   },
//   {
//     id: 'overlord-legion',
//     title: 'Overlord Legion Pass',
//     animeTheme: 'Overlord / Guild of 10',
//     capacity: '10 People (Full Guild)',
//     groupSize: 10,
//     price: 24000,
//     perks: [
//       'Full passes for 10 attendees',
//       'Reserved VIP lounge booth & drinks bucket',
//       'Exclusive commemorative event poster pack',
//       'Fast-track tournament registration for all 10 members',
//     ],
//   },
// ];
// ==========================================
// TYPE DEFINITIONS & INTERFACES
// ==========================================

// ==========================================
// TYPE DEFINITIONS & INTERFACES
// ==========================================

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
  hasUniversityHubs?: boolean; // Flag for CODEN inter-university participation
}

export interface UniversityItem {
  name: string;
  location: string;
  role: string;
}

export interface TicketTierItem {
  id: string;
  title: string;
  theme: string; // Anime theme or COD theme
  capacity: string;
  groupSize: number;
  price: number;
  perks: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedDate: string;
  phone?: string;
  location?: string;
}

export interface OrderItem {
  id: string;
  eventName: string;
  date: string;
  tierName: string;
  quantity: number;
  totalPrice: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface UserTicket {
  id: string;
  eventId: string;
  eventTitle: string;
  tierName: string;
  qrCodeUrl: string;
  eventDate: string;
  venue: string;
  status: 'Valid' | 'Used' | 'Expired';
}

export interface CategoryItem {
  id: string;
  label: string;
  count: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  images: string[];
  description: string;
  stock: number;
  tags?: string[];
}

export interface CommunityItem {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  verified: boolean;
  memberCount: number;
  tags: string[];
  description: string;
}

export interface ForumPostAuthor {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface ForumPostItem {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  replies: number;
  likes: number;
  author: ForumPostAuthor;
}

// ==========================================
// CATEGORIES DATA
// ==========================================

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Events', count: 2 },
  { id: 'anime-cosplay', label: 'Anime & Cosplay', count: 1 },
  { id: 'esports-gaming', label: 'Esports & Gaming', count: 1 },
];

// ==========================================
// EVENTS DATA
// ==========================================

export const EVENTS: EventItem[] = [
  {
    id: 'shibuya-fest-3',
    title: 'Shibuya Fest 3.0',
    date: 'December 2026',
    location: 'Enugu, Nigeria',
    category: 'Anime & Cosplay',
    price: 3000,
    image: '../../../bg-img/shibuya-fest-3.0.jpg',
    description:
      'Enugu’s premier gaming, cosplay, and Japanese pop-culture festival returning for its third monumental edition.',
    featured: true,
    hasUniversityHubs: false,
  },
  {
    id: 'coden-2027',
    title: 'CODEN (Call of Duty Enugu)',
    date: 'August 2027',
    location: 'Across Enugu Universities, Enugu',
    category: 'Esports & Gaming',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
    description:
      'Inter-university Call of Duty esports tournament and gaming convention taking place across tertiary campuses in Enugu.',
    featured: true,
    hasUniversityHubs: true,
  },
];

// ==========================================
// CODEN SPECIFIC: ENUGU UNIVERSITIES PARTICIPATION
// ==========================================

export const CODEN_ENUGU_UNIVERSITIES: UniversityItem[] = [
  {
    name: 'University of Nigeria, Nsukka & Enugu Campus (UNN / UNEC)',
    location: 'Nsukka & Independence Layout, Enugu',
    role: 'Main Campus Hub & Tournament Finals Stage',
  },
  {
    name: 'Enugu State University of Science and Technology (ESUT)',
    location: 'Agbani, Enugu',
    role: 'Esports Qualifiers Arena',
  },
  {
    name: 'Godfrey Okoye University (GOUNI)',
    location: 'Thinkers Corner / Ugwuomu-Nike, Enugu',
    role: 'Tech & Gaming Innovation Center',
  },
  {
    name: 'Coal City University (CCU)',
    location: 'Independence Layout, Enugu',
    role: 'Console & Fighter Stage',
  },
  {
    name: 'Caritas University',
    location: 'Amorji-Nike, Enugu',
    role: 'Qualifiers Arena',
  },
  {
    name: 'Institute of Management and Technology (IMT)',
    location: 'Independence Layout, Enugu',
    role: 'Exhibition & Merch Pavilion',
  },
];

export const ENUGU_UNIVERSITIES = CODEN_ENUGU_UNIVERSITIES;

// ==========================================
// SHIBUYA FEST 3.0: ANIME TICKET TIERS
// ==========================================

export const ANIME_TICKET_TIERS: TicketTierItem[] = [
  {
    id: 'solo-leveling',
    title: 'Solo Hunter Pass',
    theme: 'Solo Leveling / Ronin',
    capacity: '1 Person (Solo)',
    groupSize: 1,
    price: 3000,
    perks: [
      '1x General Admission Pass',
      'Access to main stages & gaming free-play zone',
      'Standard event badge & lanyard',
    ],
  },
  {
    id: 'tag-team-duo',
    title: 'Dual Wielder Duo Pass',
    theme: 'Jujutsu Kaisen / Tag-Team',
    capacity: '2 People (Duo)',
    groupSize: 2,
    price: 5500,
    perks: [
      'Passes for 2 attendees',
      '10% discount at official merch booths',
      'Matching themed wristbands',
    ],
  },
  {
    id: 'genin-trio',
    title: 'Genin Squad Pass',
    theme: 'Naruto / Team 7',
    capacity: '3 People (Trio)',
    groupSize: 3,
    price: 8000,
    perks: [
      'Passes for 3 attendees',
      'Priority queue for cosplay runway registration',
      '1x Group photobooth voucher',
    ],
  },
  {
    id: 'kage-council',
    title: 'Five Kage Council Pass',
    theme: 'Naruto / Kage Squad',
    capacity: '4 - 5 People (Squad)',
    groupSize: 5,
    price: 12500,
    perks: [
      'Passes for up to 5 attendees',
      'Free energy drink & refreshment pack',
      'Reserved VIP seating at cosplay finals',
    ],
  },
  {
    id: 'hashira-brigade',
    title: 'Hashira Brigade Pass',
    theme: 'Demon Slayer / Hashira',
    capacity: '6 - 8 People (Guild)',
    groupSize: 8,
    price: 19000,
    perks: [
      'Passes for up to 8 attendees',
      'Cosplay runway showcase priority seating',
      'Dedicated group lounge seat',
    ],
  },
  {
    id: 'overlord-legion',
    title: 'Overlord Legion Pass',
    theme: 'Overlord / Guild of 10',
    capacity: '10 People (Full Guild)',
    groupSize: 10,
    price: 24000,
    perks: [
      'Full passes for 10 attendees',
      'Reserved VIP lounge booth & drinks bucket',
      'Exclusive commemorative event poster pack',
      'Fast-track cosplay & stage entry for all 10 members',
    ],
  },
];

// ==========================================
// CODEN: CALL OF DUTY THEMED TICKET TIERS
// ==========================================

export const CODEN_TICKET_TIERS: TicketTierItem[] = [
  {
    id: 'recruit-solo',
    title: 'Recruit Operator Pass',
    theme: 'Bootcamp / Lone Wolf',
    capacity: '1 Person (Solo)',
    groupSize: 1,
    price: 3000,
    perks: [
      '1x General Admission Pass to Campus Qualifiers & Main Stage',
      'Access to Free-Play LAN Arena & VR Zone',
      'Official CODEN Dog Tag & Player Badge',
    ],
  },
  {
    id: 'duo-gunfight',
    title: 'Gunfight Duo Pass',
    theme: 'Modern Warfare / 2v2',
    capacity: '2 People (Duo)',
    groupSize: 2,
    price: 5500,
    perks: [
      'Passes for 2 Operators',
      'Fast-track registration for 2v2 Gunfight Side-Tournaments',
      'Co-op Gaming Lanyard & Wristbands',
    ],
  },
  {
    id: 'trio-resurgence',
    title: 'Resurgence Trio Pass',
    theme: 'Warzone / Fireteam Trio',
    capacity: '3 People (Trio)',
    groupSize: 3,
    price: 8000,
    perks: [
      'Passes for 3 Fireteam Members',
      'Guaranteed spot in Warzone Resurgence Community Bracket',
      '1x Squad Photobooth Voucher',
    ],
  },
  {
    id: 'taskforce-squad',
    title: 'Search & Destroy Squad Pass',
    theme: 'Task Force 141 / 5v5 Competitive',
    capacity: '4 - 5 People (Squad)',
    groupSize: 5,
    price: 12500,
    perks: [
      'Full Passes for up to 5 Squad Members',
      'Priority Seeding in Inter-University COD Championship Qualifiers',
      'Reserved Front-Row Seating at Main Stage Finals',
      'Complimentary Energy Drink & Refreshment Pack',
    ],
  },
  {
    id: 'veteran-platoon',
    title: 'Warzone Veteran Platoon Pass',
    theme: 'Platoon / Battalion',
    capacity: '6 - 8 People (Platoon)',
    groupSize: 8,
    price: 18000,
    perks: [
      'Passes for up to 8 Platoon Members',
      'Access to Dedicated VIP Gaming Lounge',
      '15% Off Official CODEN Esports Jersey & Merch',
      'Exclusive Platoon Photo & Trophy Stage Access',
    ],
  },
  {
    id: 'tactical-nuke',
    title: 'Tactical Nuke Command Pass',
    theme: 'Killstreak / Command Guild',
    capacity: '10 People (Full Guild)',
    groupSize: 10,
    price: 25000,
    perks: [
      'Full VIP Passes for 10 Guild Members',
      'Private VIP Console/PC Station Room',
      'Meet & Greet with Pro COD Streamers & University Captains',
      'Exclusive Commemorative CODEN Poster Pack & Swag Box',
      'Express Entry Across All University Venue Gates',
    ],
  },
];

// ==========================================
// STORE & SHOP PRODUCTS DATA
// ==========================================

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-001',
    name: 'Goku Ultra Instinct Masterpiece Anime Figure',
    category: 'Anime Figure',
    price: 120000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/goku-ultra-instinct-statue.jpg',
      '../../merch/ultra-instinct-2.jpg',
      '../../merch/ultra-instinct-3.jpg'
    ],
    description:
      'Hand-painted master grade collectible statue depicting Ultra Instinct Son Goku with dynamic aura translucency and integrated LED pedestal light.',
    stock: 8,
    tags: ['Bestseller', 'Limited Edition'],
  },
  {
    id: 'prod-002',
    name: 'Cyberpunk Ronin Cosplay Katana Replica',
    category: 'Cosplay',
    price: 45000,
    currency: '₦',
    rating: 4.8,
    images: [
      '../../merch/cyberpunk-katana-1.jpg',
      '../../merch/cyberpunk-katana-2.jpg'
    ],
    description:
      'High-grade decorative cosplay katana featuring neon accent trims and custom laser-etched scabbard.',
    stock: 15,
    tags: ['Cosplay', 'New Arrival'],
  },
  {
    id: 'prod-003',
    name: 'Shibuya Fest 3.0 Official Oversized Hoodie',
    category: 'Apparel',
    price: 25000,
    currency: '₦',
    rating: 4.7,
    images: [
      '../../merch/shibuya-fest-hoodie-1.jpg',
      '../../merch/shibuya-fest-hoodie-2.jpg'
    ],
    description:
      'Heavyweight 400gsm cotton fleece hoodie with high-density Shibuya Fest back artwork and embroidered anime sleeve patches.',
    stock: 45,
    tags: ['Official Merch', 'Hot Item'],
  },
  {
    id: 'prod-004',
    name: 'Demon Slayer Hashira Collection Hardcover Artbook',
    category: 'Media',
    price: 15000,
    currency: '₦',
    rating: 5.0,
    images: [
      '../../merch/hashira-artbook-1.jpg',
      '../../merch/hashira-artbook-2.jpg'
    ],
    description:
      'Official hardcover concept art collection featuring full-color character illustrations, production notes, and exclusive key visual sketches.',
    stock: 22,
    tags: ['Artbook', 'Import'],
  },
  {
    id: 'prod-005',
    name: 'Akastuki Hoodie',
    category: 'Apparel',
    price: 10000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/akatsuki-hoodie.jpg',
    ],
    description: 'Comfortable and stylish Akastuki hoodie that makes you stand out from the crowd. Join the Akatsuki with this cool hoodie',
    stock: 50,
    tags: ['Anime', 'New Arrival'],
  },
  {
    id: 'prod-006',
    name: 'Gojo Statue',
    category: 'Anime Figure',
    price: 1000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/gojo.jpg',
    ],
    description: 'A cool and detailed Gojo statue, that brings the aura to your living space wherever you put it.',
    stock: 50,
    tags: ['Anime', 'Statue'],
  },
  {
    id: 'prod-007',
    name: 'Pokemon Keychain Set',
    category: 'Accessories',
    price: 5000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/poke-keychain.jpg',
    ],
    description: 'A cool and detailed Pokemon keychain set.',
    stock: 50,
    tags: ['Anime', 'Keychain'],
  },
  {
    id: 'prod-008',
    name: 'Kamado Tanjiro Demon Slayer Hoodie',
    category: 'Apparel',
    price: 25000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/demon-slayer-hoodie.jpg',
    ],
    description: 'A cool and detailed Demon Slayer hoodie.',
    stock: 50,
    tags: ['Anime', 'Hoodie'],
  },
  {
    id: 'prod-009',
    name: 'Demon Slayer Hashira Keychain Set',
    category: 'Accessories',
    price: 5000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/hashira-keychain-1.jpg',
      '../../merch/hashira-keychain-2.jpg',
      '../../merch/hashira-keychain-3.jpg',
    ],
    description: 'A cool and detailed Demon Slayer Hashira keychain set.',
    stock: 50,
    tags: ['Anime', 'Keychain'],
  },
  {
    id: 'prod-010',
    name: 'Monkey D Luffy Straw Hat',
    category: 'Cosplay',
    price: 5000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/straw-hat.jpg',
    ],
    description: 'This straw hat makes you look and feel like you are the aspiring Pirate King.',
    stock: 50,
    tags: ['Anime', 'Cosplay'],
  },
  {
    id: 'prod-011',
    name: 'Tokyo Revengers Hoodies',
    category: 'Apparel',
    price: 10000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/tokyo-revengers-1.jpg',
      '../../merch/tokyo-revengers-2.jpg',
      '../../merch/tokyo-revengers-3.jpg',
    ],
    description: 'Show your love for Tokyo Revengers with this cool hoodie.',
    stock: 50,
    tags: ['Anime', 'Hoodie'],
  },
  {
    id: 'prod-012',
    name: 'Zoro Hoodie',
    category: 'Apparel',
    price: 10000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/zoro-1.jpg',
      '../../merch/zoro-2.jpg',
      '../../merch/zoro-3.jpg',
    ],
    description: 'Show your love for Zoro with this cool hoodie.',
    stock: 50,
    tags: ['Anime', 'Hoodie'],
  },
  {
    id: 'prod-013',
    name: 'Monkey D Luffy Hoodie',
    category: 'Apparel',
    price: 5000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/luffy-1.jpg',
      '../../merch/luffy-2.jpg',
      '../../merch/luffy-3.jpg',
    ],
    description: 'A cool and detailed Monkey D Luffy hoodie.',
    stock: 50,
    tags: ['Anime', 'Hoodie'],
  },
  {
    id: 'prod-014',
    name: 'Naruto Action Figure',
    category: 'Anime Figure',
    price: 15000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/naruto-figure-1.jpg',
      '../../merch/naruto-figure-2.jpg',
      '../../merch/naruto-figure-3.jpg',
    ],
    description: 'A cool and detailed Naruto action figure.',
    stock: 50,
    tags: ['Anime', 'Action Figure'],
  },
  {
    id: 'prod-015',
    name: 'Naruto Konoha Rings',
    category: 'Accessories',
    price: 5000,
    currency: '₦',
    rating: 4.9,
    images: [
      '../../merch/naruto-ring-1.jpg',
      '../../merch/naruto-ring-2.jpg',
      '../../merch/naruto-ring-3.jpg',
    ],
    description: 'Show your love for Naruto with this cool Konoha rings.',
    stock: 50,
    tags: ['Anime', 'Accessories'],
  },
];

// ==========================================
// COMMUNITIES DATA
// ==========================================

export const COMMUNITIES: CommunityItem[] = [
  {
    id: 'shibuya-guild',
    name: 'Shibuya Guild',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200',
    verified: true,
    memberCount: 2400000,
    tags: ['Anime', 'Cosplay', 'ShibuyaFest'],
    description:
      'Official hub for Shibuya Fest attendees, cosplayers, and Japanese pop-culture enthusiasts across Nigeria.',
  },
  {
    id: 'coden-esports',
    name: 'CODEN Esports Central',
    avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200',
    verified: true,
    memberCount: 18500,
    tags: ['Gaming', 'Esports', 'CODEN'],
    description:
      'The inter-university esports community connecting Call of Duty contenders and competitive squads in Enugu.',
  },
  {
    id: 'otaku-creators',
    name: 'Otaku Creators & Artists',
    avatar: 'https://i.pravatar.cc/150?u=12',
    banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200',
    verified: false,
    memberCount: 9200,
    tags: ['Art', 'Manga', 'Illustration'],
    description:
      'Dedicated space for digital artists, manga creators, and animators to showcase work and collaborate.',
  },
];

// ==========================================
// FORUM DISCUSSIONS & POSTS DATA
// ==========================================

export const FORUM_POSTS: ForumPostItem[] = [
  {
    id: 'post-001',
    title: 'Shibuya Fest 3.0 Cosplay Runway Rules & Prize Pool Breakdown',
    body: 'Greetings Guild members! Here is the official rulebook and prize breakdown for the Cosplay Runway. Cash prizes will be awarded for Solo Master, Best Squad, and Fan Favorite!',
    category: 'Announcements',
    createdAt: '2 hours ago',
    replies: 42,
    likes: 128,
    author: {
      name: 'Admin_Kuro',
      avatar: 'https://i.pravatar.cc/150?u=1',
      verified: true,
    },
  },
  {
    id: 'post-002',
    title: 'CODEN Inter-University Esports Qualifier Seedings Announced',
    body: 'Qualifiers for UNN, ESUT, GOUNI, CCU, Caritas, and IMT have been finalized. Check out your campus seedings and join the weekend practice lobbies!',
    category: 'Discussions',
    createdAt: '5 hours ago',
    replies: 19,
    likes: 74,
    author: {
      name: 'Captain_Gamer',
      avatar: 'https://i.pravatar.cc/150?u=2',
      verified: false,
    },
  },
  {
    id: 'post-003',
    title: 'Which anime collectible figure are you grabbing first from the store?',
    body: 'The official catalog drop is live! Are you going for the Ultra Instinct Goku statue or holding out for the official Shibuya Fest hoodie?',
    category: 'General',
    createdAt: '1 day ago',
    replies: 31,
    likes: 95,
    author: {
      name: 'OtakuQueen',
      avatar: 'https://i.pravatar.cc/150?u=3',
      verified: false,
    },
  },
];

// ==========================================
// USER PROFILE & ACCOUNT DATA
// ==========================================

export const MOCK_USER: UserProfile = {
  id: 'usr_01',
  name: 'Guild Member',
  email: 'user@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
  role: 'V.I.P Attendee',
  joinedDate: 'March 2026',
  phone: '+234 800 000 0000',
  location: 'Enugu, Nigeria',
};

export const USER_PROFILE = MOCK_USER;

// ==========================================
// ORDERS DATA
// ==========================================

export const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'ORD-2026-001',
    eventName: 'Shibuya Fest 3.0',
    date: 'Dec 15, 2026',
    tierName: 'Dual Wielder Duo Pass',
    quantity: 1,
    totalPrice: 5500,
    status: 'Completed',
  },
  {
    id: 'ORD-2027-002',
    eventName: 'CODEN (Call of Duty Enugu)',
    date: 'Aug 20, 2027',
    tierName: 'Task Force Squad Pass',
    quantity: 1,
    totalPrice: 12500,
    status: 'Pending',
  },
];

// ==========================================
// USER TICKETS DATA
// ==========================================

export const MOCK_TICKETS: UserTicket[] = [
  {
    id: 'TCK-SHIB-01',
    eventId: 'shibuya-fest-3',
    eventTitle: 'Shibuya Fest 3.0',
    tierName: 'Dual Wielder Duo Pass',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TCK-SHIB-01',
    eventDate: 'December 2026',
    venue: 'Enugu, Nigeria',
    status: 'Valid',
  },
  {
    id: 'TCK-CODEN-02',
    eventId: 'coden-2027',
    eventTitle: 'CODEN (Call of Duty Enugu)',
    tierName: 'Task Force Squad Pass',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TCK-CODEN-02',
    eventDate: 'August 2027',
    venue: 'Across Enugu Universities',
    status: 'Valid',
  },
];

export const USER_TICKETS = MOCK_TICKETS;

// ==========================================
// HELPER LOOKUP FUNCTIONS
// ==========================================

export function getEventById(id: string): EventItem | undefined {
  return EVENTS.find((event) => event.id === id);
}

export function getTicketTiersForEvent(eventId: string): TicketTierItem[] {
  if (eventId === 'coden-2027') {
    return CODEN_TICKET_TIERS;
  }
  return ANIME_TICKET_TIERS;
}

export function getTicketTierById(id: string): TicketTierItem | undefined {
  return (
    ANIME_TICKET_TIERS.find((tier) => tier.id === id) ||
    CODEN_TICKET_TIERS.find((tier) => tier.id === id)
  );
}

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS.find((prod) => prod.id === id);
}

export function getCommunityById(id: string): CommunityItem | undefined {
  return COMMUNITIES.find((comm) => comm.id === id);
}

export function getEventsByCategory(category: string): EventItem[] {
  if (!category || category.toLowerCase() === 'all') {
    return EVENTS;
  }
  return EVENTS.filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedEvents(): EventItem[] {
  return EVENTS.filter((e) => e.featured);
}

export function getUserOrders(userId?: string): OrderItem[] {
  return MOCK_ORDERS;
}

export function getUserTickets(userId?: string): UserTicket[] {
  return MOCK_TICKETS;
}