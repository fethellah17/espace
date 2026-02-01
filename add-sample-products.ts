import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const sampleProducts = [
  {
    name: "Oud Mystique Royal",
    description: "Une fragrance luxueuse à base d'oud avec des notes boisées profondes et des touches épicées. Parfait pour les occasions spéciales.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    category: "Parfums Premium",
    is_new: true,
    discount: 0,
    stock: 25
  },
  {
    name: "Rose de Grasse",
    description: "Élégante essence de rose de Grasse avec des notes florales délicates. Une composition raffinée et romantique.",
    price: 3200,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
    category: "Parfums Floraux",
    is_new: true,
    discount: 15,
    stock: 30
  },
  {
    name: "Ambre Noir Intense",
    description: "Mélange chaleureux d'ambre et de vanille avec une touche de patchouli. Longue tenue et captivant.",
    price: 3800,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    category: "Parfums Orientaux",
    is_new: false,
    discount: 10,
    stock: 20
  },
  {
    name: "Jasmin de Nuit",
    description: "Jasmin délicat avec des notes de tête d'agrumes et un fond musqué. Frais et romantique pour le soir.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    category: "Parfums Floraux",
    is_new: false,
    discount: 0,
    stock: 40
  },
  {
    name: "Santal Crémeux",
    description: "Santal crémeux avec des nuances de musc blanc. Apaisant, sophistiqué et parfait pour toutes les saisons.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    category: "Parfums Boisés",
    is_new: true,
    discount: 0,
    stock: 15
  },
  {
    name: "Lavande Provence",
    description: "Lavande pure de Provence avec des notes herbacées subtiles. Apaisant et intemporel.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    category: "Parfums Frais",
    is_new: false,
    discount: 20,
    stock: 50
  },
  {
    name: "Musc Blanc Sensuel",
    description: "Mélange sensuel de musc blanc avec des accents floraux doux. Longue tenue et captivant.",
    price: 3600,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
    category: "Parfums Musqués",
    is_new: true,
    discount: 0,
    stock: 22
  },
  {
    name: "Vanille Gourmande",
    description: "Vanille douce avec des notes de caramel et tonka. Chaleureux, réconfortant et gourmand.",
    price: 2600,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    category: "Parfums Gourmands",
    is_new: false,
    discount: 5,
    stock: 35
  },
  {
    name: "Agrumes Vitalité",
    description: "Mélange d'agrumes brillants avec bergamote et pamplemousse. Énergisant et frais pour la journée.",
    price: 2400,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    category: "Parfums Frais",
    is_new: false,
    discount: 0,
    stock: 45
  },
  {
    name: "Patchouli Mystique",
    description: "Patchouli profond avec base boisée et touches terreuses. Mystérieux et envoûtant.",
    price: 3300,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    category: "Parfums Boisés",
    is_new: false,
    discount: 12,
    stock: 18
  },
  {
    name: "Pivoine Romance",
    description: "Pivoine romantique avec des floraux doux et une touche de litchi. Élégant et féminin.",
    price: 2900,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    category: "Parfums Floraux",
    is_new: true,
    discount: 0,
    stock: 28
  },
  {
    name: "Vétiver Élégance",
    description: "Vétiver sophistiqué avec des notes d'agrumes et une base boisée. Raffiné et masculin.",
    price: 3100,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
    category: "Parfums Premium",
    is_new: false,
    discount: 8,
    stock: 25
  },
  {
    name: "Fleur d'Oranger",
    description: "Fleur d'oranger fraîche avec des notes poudrées délicates. Lumineux et printanier.",
    price: 2700,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    category: "Parfums Floraux",
    is_new: true,
    discount: 0,
    stock: 32
  },
  {
    name: "Cuir Précieux",
    description: "Accord cuir avec des notes de safran et de bois de cèdre. Puissant et sophistiqué.",
    price: 4200,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    category: "Parfums Premium",
    is_new: true,
    discount: 0,
    stock: 12
  },
  {
    name: "Bergamote Soleil",
    description: "Bergamote éclatante avec des notes hespéridées. Parfait pour les matins ensoleillés.",
    price: 2100,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    category: "Parfums Frais",
    is_new: false,
    discount: 15,
    stock: 40
  },
  {
    name: "Iris Poudrée",
    description: "Iris délicat avec des notes poudrées et une touche de violette. Doux et élégant.",
    price: 3400,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    category: "Parfums Floraux",
    is_new: false,
    discount: 0,
    stock: 20
  },
  {
    name: "Encens Mystique",
    description: "Encens sacré avec des notes résineuses et boisées. Spirituel et captivant.",
    price: 3700,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
    category: "Parfums Orientaux",
    is_new: true,
    discount: 10,
    stock: 15
  },
  {
    name: "Pomme Verte Fraîcheur",
    description: "Pomme verte croquante avec des notes florales légères. Frais et vivifiant.",
    price: 2300,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    category: "Parfums Frais",
    is_new: false,
    discount: 5,
    stock: 38
  }
];

async function addProducts() {
  console.log('Starting to add products...');
  
  for (const product of sampleProducts) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) {
      console.error(`Error adding ${product.name}:`, error);
    } else {
      console.log(`✓ Added: ${product.name}`);
    }
  }
  
  console.log('\nFinished adding products!');
}

addProducts();
