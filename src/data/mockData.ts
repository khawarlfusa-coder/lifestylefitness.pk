export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  category: "superfood" | "diet_plan" | "ebook";
  image: string;
  badge?: string;
  description: string;
  features: string[];
  stock: number;
}

export interface VideoItem {
  id: string;
  title: string;
  category: "Weight Loss" | "Keto & Fasting" | "Belly Fat" | "Diet Mistakes" | "Workout" | "Nutrition Tips";
  youtubeId: string;
  duration: string;
  views: string;
  thumbnail: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "khawar";
  text: string;
  timestamp: string;
  isLocked?: boolean;
  unlocked?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "matcha-tea",
    name: "Lifestyle Fitness Ceremonial Matcha Green Tea",
    tagline: "Ceremonial Grade Weight Loss Friendly | 50g Organic Pouch",
    price: 2850,
    originalPrice: 3500,
    category: "superfood",
    image: "/images/matcha-tea.jpg",
    badge: "Official LF Brand (50g)",
    description: "Official Lifestyle Fitness Ceremonial Grade Matcha Green Tea. Packed with potent fat-burning EGCG antioxidants and chlorophyll. Boosts resting metabolic rate, targets stubborn visceral belly fat, and gives clean energy. We recommend only 1 cup per day (1 pinch of matcha).",
    features: [
      "Ceremonial Grade - Weight Loss Friendly",
      "We recommend only 1 cup per day (1 pinch)",
      "Non-GMO, 100% Vegan & Gluten Free Certified",
      "Burns stubborn fat & suppresses appetite"
    ],
    stock: 45
  },
  {
    id: "chia-seeds",
    name: "Organic Whole Chia Seeds (Premium)",
    tagline: "High Fiber & Omega-3 Powerhouse | 250g",
    price: 1450,
    originalPrice: 1950,
    category: "superfood",
    image: "https://images.unsplash.com/photo-1589135233689-d56d7870a41f?auto=format&fit=crop&q=80&w=800",
    badge: "Doctor Recommended",
    description: "Cold-cleaned high-purity chia seeds. Expands in the stomach to create a feeling of fullness for hours, aids digestion, regulates blood sugar, and provides essential Omega-3 fatty acids.",
    features: [
      "11g Fiber per 2 tablespoons",
      "Regulates Insulin & Prevents Sugar Spikes",
      "Hydration Booster for Intermittent Fasting",
      "Supports Glowing Skin & Hair"
    ],
    stock: 80
  },
  {
    id: "camu-camu",
    name: "Wild-Harvested Camu Camu Berry Powder",
    tagline: "World's Highest Source of Vitamin C & Immune Booster | 100g",
    price: 3200,
    originalPrice: 3900,
    category: "superfood",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
    badge: "Super Immunity",
    description: "Pure Amazonian Camu Camu berry extract. Packed with 60x more Vitamin C than an orange! Powerful anti-inflammatory, detoxifies liver, reduces cortisol (stress hormone causing belly fat), and repairs collagen.",
    features: [
      "60x More Vitamin C Than Fresh Oranges",
      "Flushes Out Stubborn Water Retention",
      "Reduces Cortisol Belly Fat & Stress",
      "100% Pure, No Artificial Additives"
    ],
    stock: 28
  },
  {
    id: "custom-diet-plan",
    name: "1-on-1 Customized Weight Loss Diet Plan",
    tagline: "Personalized by Khawar Khan (ISSA USA) | 30 Days",
    price: 6500,
    originalPrice: 9000,
    category: "diet_plan",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    badge: "100% Guaranteed Results",
    description: "Tailored to your specific weight, height, medical condition (PCOS, Thyroid, Diabetes, Fatty Liver), food preferences (Desi Pakistani or Continental), and daily routine.",
    features: [
      "Personal WhatsApp Support Directly with Khawar Khan",
      "Weekly Weight Check-ins & Diet Adjustments",
      "Desi Ghar Ka Khana (Roti, Daal, Salan included)",
      "Target 4 to 8 Kilos Healthy Fat Loss per Month"
    ],
    stock: 15
  },
  {
    id: "recipe-book",
    name: "Lifestyle Fitness Ultimate Fat Loss Recipe Book",
    tagline: "100+ Delicious Desi & Low-Calorie Recipes | Digital & Print",
    price: 1999,
    originalPrice: 2999,
    category: "ebook",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    badge: "Instant PDF Access",
    description: "Transform your favorite foods into fat-burning meals! Includes Low-Calorie Biryani, High-Protein Shawarma, Fat Loss Parathas, Detox Smoothies, and Guilt-Free Desserts with full macros.",
    features: [
      "100+ Tested Pakistani & Fusion Recipes",
      "Complete Calories, Protein, Carbs & Fats Breakdown",
      "Easy 15-Minute Preparation Steps",
      "Bonus: 7-Day Quick Fat-Burn Kickstart Plan"
    ],
    stock: 100
  }
];

// ACTUAL OFFICIAL VIDEOS FROM KHAWAR KHAN'S CHANNEL (@Lifestylefitnesspk)
export const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "No DIET no GYM 4 Pillers for Weight Loss at Home || Ghar Per Reh kar Wazan Kum",
    category: "Weight Loss",
    youtubeId: "ULTwk4MqEoU",
    duration: "13:42",
    views: "520K views",
    thumbnail: "https://img.youtube.com/vi/ULTwk4MqEoU/hqdefault.jpg"
  },
  {
    id: "v2",
    title: "16:8 Intermittent Fasting for Weight Loss | Desi Routine me Intermittent Fasting Kaise Karein?",
    category: "Keto & Fasting",
    youtubeId: "tygSLvxGpUw",
    duration: "15:20",
    views: "440K views",
    thumbnail: "https://img.youtube.com/vi/tygSLvxGpUw/hqdefault.jpg"
  },
  {
    id: "v3",
    title: "1200 Calories Sasta Diet Plan | Lose 8 kg in September (Budget Friendly)",
    category: "Weight Loss",
    youtubeId: "friK8NcbxEk",
    duration: "11:54",
    views: "680K views",
    thumbnail: "https://img.youtube.com/vi/friK8NcbxEk/hqdefault.jpg"
  },
  {
    id: "v4",
    title: "How to Stop Late Night Cravings | Raat Ki Bhook Kaise Khatam Karein",
    category: "Belly Fat",
    youtubeId: "9oWi5Y4e6II",
    duration: "09:15",
    views: "310K views",
    thumbnail: "https://img.youtube.com/vi/9oWi5Y4e6II/hqdefault.jpg"
  },
  {
    id: "v5",
    title: "Low Budget High Protein ROTI DIET for Weight Loss | Desi Roti Khate Huwe Wazan Kam Karein",
    category: "Nutrition Tips",
    youtubeId: "GRUoDWatHMU",
    duration: "14:10",
    views: "390K views",
    thumbnail: "https://img.youtube.com/vi/GRUoDWatHMU/hqdefault.jpg"
  },
  {
    id: "v6",
    title: "5 Morning Mistakes That Ruin Your Weight Loss | Subha Ki 5 Ghalatiyan",
    category: "Diet Mistakes",
    youtubeId: "0oyxfI01A_U",
    duration: "12:05",
    views: "475K views",
    thumbnail: "https://img.youtube.com/vi/0oyxfI01A_U/hqdefault.jpg"
  },
  {
    id: "v7",
    title: "10 Min Home Workout for FEMALES | No Equipment Home Workout by Ambreen",
    category: "Workout",
    youtubeId: "PRxBMC7fYBI",
    duration: "10:30",
    views: "295K views",
    thumbnail: "https://img.youtube.com/vi/PRxBMC7fYBI/hqdefault.jpg"
  },
  {
    id: "v8",
    title: "From 96 to 69: Kainat's 27 kg Weight Loss Transformation (Real Client Story)",
    category: "Weight Loss",
    youtubeId: "p6SVZ_oJ_o8",
    duration: "16:45",
    views: "820K views",
    thumbnail: "https://img.youtube.com/vi/p6SVZ_oJ_o8/hqdefault.jpg"
  },
  {
    id: "v9",
    title: "15 Easy Weight Loss Breakfast Recipes By Lifestyle Fitness Khawar Khan",
    category: "Nutrition Tips",
    youtubeId: "-GJMjKROgQA",
    duration: "18:22",
    views: "350K views",
    thumbnail: "https://img.youtube.com/vi/-GJMjKROgQA/hqdefault.jpg"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Pakistani Roti vs Rice: Weight Loss Ke Liye Kaunsi Behtar Hai?",
    category: "Nutrition Science",
    readTime: "4 min read",
    date: "Sep 2026",
    excerpt: "Kya wazan kam karne ke liye chawal aur roti bilkul chhorni parti hai? Ek USA certified nutritionist ka authentic scientific tajziya.",
    content: "Bohat se log samajhte hain ke roti ya chawal chhorne se hi wazan kam hota hai. Sachai yeh hai ke carbohydrate ka source aur portion size sab se ahem hai...",
    image: "https://img.youtube.com/vi/GRUoDWatHMU/hqdefault.jpg"
  },
  {
    id: "art-2",
    title: "Matcha Green Tea Aur Regular Green Tea Me Kya Farq Hai?",
    category: "Superfoods",
    readTime: "5 min read",
    date: "Sep 2026",
    excerpt: "1 cup Japanese Matcha tea 10 cups aam green tea ke barabar fat burning antioxidants kyun rakhti hai? Jaaniye mukammal waja.",
    content: "Matcha green tea me patton ko bareek pees kar istemal kiya jata hai, jis ki waja se 100% bio-nutrients aapke jism ko milte hain...",
    image: "/images/matcha-tea.jpg"
  },
  {
    id: "art-3",
    title: "Camu Camu Powder: Cortisol Aur Stubborn Belly Fat Ka Dushman",
    category: "Hormone Balance",
    readTime: "3 min read",
    date: "Sep 2026",
    excerpt: "Jab stress hormone 'Cortisol' barhta hai to pait par charbi jama hoti hai. Camu Camu ka massive Vitamin C isko kaise control karta hai.",
    content: "Camu Camu dunya ka sab se concentrated natural Vitamin C ka zariya hai. Vitamin C adrenal glands ko relax karta hai aur stress-induced fat storage ko rokkta hai...",
    image: "https://img.youtube.com/vi/ULTwk4MqEoU/hqdefault.jpg"
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "khawar",
    text: "Assalam o Alaikum! Mai hoon Khawar Khan (ISSA USA Certified Nutritionist). Aapka fitness, wazan ya diet se related koi bhi sawaal ho yahan poochein ya direct mere WhatsApp (+92 318 2112122) par message karein!",
    timestamp: "10:00 AM",
    isLocked: false,
    unlocked: true
  }
];
