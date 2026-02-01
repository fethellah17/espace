import { Product } from "@/context/AppContext";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Parfum Classique",
    description: "Une fragrance intemporelle avec d'élégantes notes florales.",
    price: 2500,
    falconPrice: 18000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop",
    category: "Parfums",
    isNew: true,
  },
  {
    id: 2,
    name: "Mélange Agrumes Frais",
    description: "Senteur d'agrumes rafraîchissante parfaite pour le jour.",
    price: 2000,
    falconPrice: 15000,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&auto=format&fit=crop",
    category: "Parfums",
    isNew: false,
  },
  {
    id: 3,
    name: "Oud de Luxe",
    description: "Fragrance d'oud premium avec des nuances boisées.",
    price: 3500,
    falconPrice: 25000,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop",
    category: "Parfums",
    isNew: true,
    discount: 10,
  },
  {
    id: 4,
    name: "Jardin de Roses",
    description: "Fragrance élégante de rose avec une douceur subtile.",
    price: 2200,
    falconPrice: 16000,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop",
    category: "Parfums",
    isNew: true,
  },
  {
    id: 5,
    name: "Rêves de Vanille",
    description: "Senteur chaude de vanille avec des notes crémeuses.",
    price: 1800,
    falconPrice: 13000,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&auto=format&fit=crop",
    category: "Parfums",
    isNew: false,
    discount: 15,
  },
  {
    id: 6,
    name: "Sérénité Lavande",
    description: "Fragrance apaisante de lavande pour la relaxation.",
    price: 1600,
    falconPrice: 12000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop",
    category: "Parfums",
    isNew: true,
  },
  {
    id: 7,
    name: "Oud Mystique Royal",
    description: "Une fragrance luxueuse à base d'oud avec des notes boisées profondes et des touches épicées.",
    price: 4500,
    falconPrice: 32000,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&auto=format&fit=crop",
    category: "Parfums Premium",
    isNew: true,
  },
  {
    id: 8,
    name: "Rose de Grasse",
    description: "Élégante essence de rose de Grasse avec des notes florales délicates.",
    price: 3200,
    falconPrice: 23000,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop",
    category: "Parfums Floraux",
    isNew: true,
    discount: 15,
  },
  {
    id: 9,
    name: "Ambre Noir Intense",
    description: "Mélange chaleureux d'ambre et de vanille avec une touche de patchouli.",
    price: 3800,
    falconPrice: 27000,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop",
    category: "Parfums Orientaux",
    isNew: false,
    discount: 10,
  },
  {
    id: 10,
    name: "Jasmin de Nuit",
    description: "Jasmin délicat avec des notes de tête d'agrumes et un fond musqué.",
    price: 2800,
    falconPrice: 20000,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&auto=format&fit=crop",
    category: "Parfums Floraux",
    isNew: false,
  },
  {
    id: 11,
    name: "Santal Crémeux",
    description: "Santal crémeux avec des nuances de musc blanc. Apaisant et sophistiqué.",
    price: 3500,
    falconPrice: 25000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop",
    category: "Parfums Boisés",
    isNew: true,
  },
  {
    id: 12,
    name: "Lavande Provence",
    description: "Lavande pure de Provence avec des notes herbacées subtiles.",
    price: 2200,
    falconPrice: 16000,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&auto=format&fit=crop",
    category: "Parfums Frais",
    isNew: false,
    discount: 20,
  },
  {
    id: 13,
    name: "Musc Blanc Sensuel",
    description: "Mélange sensuel de musc blanc avec des accents floraux doux.",
    price: 3600,
    falconPrice: 26000,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop",
    category: "Parfums Musqués",
    isNew: true,
  },
  {
    id: 14,
    name: "Vanille Gourmande",
    description: "Vanille douce avec des notes de caramel et tonka.",
    price: 2600,
    falconPrice: 19000,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop",
    category: "Parfums Gourmands",
    isNew: false,
    discount: 5,
  },
  {
    id: 15,
    name: "Agrumes Vitalité",
    description: "Mélange d'agrumes brillants avec bergamote et pamplemousse.",
    price: 2400,
    falconPrice: 17000,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&auto=format&fit=crop",
    category: "Parfums Frais",
    isNew: false,
  },
  {
    id: 16,
    name: "Patchouli Mystique",
    description: "Patchouli profond avec base boisée et touches terreuses.",
    price: 3300,
    falconPrice: 24000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop",
    category: "Parfums Boisés",
    isNew: false,
    discount: 12,
  },
  {
    id: 17,
    name: "Pivoine Romance",
    description: "Pivoine romantique avec des floraux doux et une touche de litchi.",
    price: 2900,
    falconPrice: 21000,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&auto=format&fit=crop",
    category: "Parfums Floraux",
    isNew: true,
  },
  {
    id: 18,
    name: "Vétiver Élégance",
    description: "Vétiver sophistiqué avec des notes d'agrumes et une base boisée.",
    price: 3100,
    falconPrice: 22000,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop",
    category: "Parfums Premium",
    isNew: false,
    discount: 8,
  },
];

// Extended product interface with decant pricing
export interface ProductWithDecant extends Product {
  pricePerTenMl?: number; // Price in DA for 10ml decant
}

// Perfume products with decant pricing
export interface PerfumeProduct {
  id: number;
  name: string;
  description: string;
  pricePerTenMl: number; // Price in DA for 10ml decant
  image: string;
  category: string;
}

export const PERFUMES: PerfumeProduct[] = [
  {
    id: 101,
    name: "Essence Oud Noir",
    description: "Fragrance luxueuse à base d'oud avec des notes boisées et épicées. Parfum 100% original.",
    pricePerTenMl: 1500, // 1500 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 102,
    name: "Jardin de Roses Deluxe",
    description: "Fragrance élégante de rose avec des nuances florales. Décantations de qualité premium disponibles.",
    pricePerTenMl: 1200, // 1200 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 103,
    name: "Nuits d'Ambre",
    description: "Mélange chaleureux d'ambre et de vanille. Parfait pour les soirées.",
    pricePerTenMl: 1800, // 1800 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 104,
    name: "Murmure de Jasmin",
    description: "Jasmin délicat avec des notes de tête d'agrumes. Frais et romantique.",
    pricePerTenMl: 1400, // 1400 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 105,
    name: "Sérénité de Santal",
    description: "Santal crémeux avec des nuances de musc. Apaisant et sophistiqué.",
    pricePerTenMl: 1600, // 1600 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 106,
    name: "Rêves de Lavande",
    description: "Lavande pure avec des notes herbacées. Apaisant et intemporel.",
    pricePerTenMl: 1100, // 1100 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 107,
    name: "Paradis de Musc",
    description: "Mélange sensuel de musc avec des accents floraux. Longue tenue et captivant.",
    pricePerTenMl: 1700, // 1700 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 108,
    name: "Félicité Vanille",
    description: "Vanille douce avec des notes de caramel. Chaleureux et réconfortant.",
    pricePerTenMl: 1300, // 1300 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 109,
    name: "Levé d'Agrumes",
    description: "Mélange d'agrumes brillants avec bergamote. Énergisant et frais.",
    pricePerTenMl: 1250, // 1250 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 110,
    name: "Mystique de Patchouli",
    description: "Patchouli profond avec base boisée. Mystérieux et terreux.",
    pricePerTenMl: 1550, // 1550 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 111,
    name: "Romance de Pivoine",
    description: "Pivoine romantique avec des floraux doux. Élégant et féminin.",
    pricePerTenMl: 1350, // 1350 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
  {
    id: 112,
    name: "Élégance de Vétiver",
    description: "Vétiver sophistiqué avec des notes d'agrumes. Raffiné et masculin.",
    pricePerTenMl: 1450, // 1450 DA per 10ml
    image: "/placeholder.svg",
    category: "Parfums",
  },
];
