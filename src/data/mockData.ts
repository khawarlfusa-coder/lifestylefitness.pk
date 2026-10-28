export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  category: "superfood" | "diet_plan" | "ebook" | "deal";
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

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: "Cash on Delivery (COD)" | "WhatsApp Order";
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
  createdAt: string;
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
    id: "deal-1",
    name: "Deal 1",
    tagline: "Matcha Mini (30g) + 1-on-1 Customized 30-Day Diet Plan",
    price: 3000,
    originalPrice: 8500,
    category: "deal",
    image: "/images/deals/deal-1.jpg",
    badge: "DEAL 1",
    description: "Lifestyle Fitness Matcha Green Tea Mini (30g) together with the 1-on-1 Customized Weight Loss Diet Plan by Khawar Khan.",
    features: [
      "Matcha Green Tea Mini (30g)",
      "1-on-1 Customized Diet Plan (30 Days)",
      "Meal plan, calorie guide, recipes and WhatsApp support"
    ],
    stock: 20
  },
  {
    id: "deal-2",
    name: "Deal 2",
    tagline: "Matcha Mini + Chia Seeds + 1-on-1 Customized Diet Plan",
    price: 4000,
    originalPrice: 9500,
    category: "deal",
    image: "/images/deals/deal-2.jpg",
    badge: "DEAL 2",
    description: "Matcha Green Tea Mini (30g), Organic Chia Seeds and the 1-on-1 Customized Weight Loss Diet Plan by Khawar Khan.",
    features: [
      "Matcha Green Tea Mini (30g)",
      "Organic Chia Seeds",
      "1-on-1 Customized Diet Plan (30 Days)"
    ],
    stock: 20
  },
  {
    id: "deal-3",
    name: "Deal 3 - Complete Weight Loss Bundle",
    tagline: "Matcha + Chia Seeds + Camu Camu + Diet Plan",
    price: 7000,
    originalPrice: 12000,
    category: "deal",
    image: "/images/deals/deal-3.jpg",
    badge: "DEAL 3 - BEST VALUE",
    description: "The complete bundle: Matcha Green Tea Mini (30g), Organic Chia Seeds, Camu Camu Berry Powder (60g) and the 1-on-1 Customized Weight Loss Diet Plan.",
    features: [
      "Matcha Green Tea Mini (30g)",
      "Organic Chia Seeds",
      "Camu Camu Berry Powder (60g)",
      "1-on-1 Customized Diet Plan (30 Days)"
    ],
    stock: 20
  },
  {
    id: "matcha-tea",
    name: "Lifestyle Fitness Ceremonial Matcha Green Tea (50g)",
    tagline: "Ceremonial Grade Weight Loss Friendly | 50g Organic Pouch",
    price: 2200,
    originalPrice: 2800,
    category: "superfood",
    image: "/images/matcha-tea.jpg",
    badge: "Official LF Brand (50g)",
    description: "Official Lifestyle Fitness Ceremonial Grade Matcha Green Tea (50g). Packed with potent fat-burning EGCG antioxidants and chlorophyll. Boosts resting metabolic rate, targets stubborn visceral belly fat, and gives clean energy. We recommend only 1 cup per day (1 pinch of matcha).",
    features: [
      "Official 50g Ceremonial Grade Pouch",
      "Weight Loss Friendly: Boosts metabolic fat burn",
      "We recommend only 1 cup per day (1 pinch of matcha)",
      "Non-GMO, 100% Vegan & Gluten Free Certified"
    ],
    stock: 45
  },
  {
    id: "matcha-mini",
    name: "Lifestyle Fitness Ceremonial Matcha Green Tea Mini (30g)",
    tagline: "Ceremonial Grade Weight Loss Friendly | 30g Trial Pouch",
    price: 1500,
    originalPrice: 1900,
    category: "superfood",
    image: "/images/matcha-tea.jpg",
    badge: "Mini Pack (30g)",
    description: "Lifestyle Fitness Ceremonial Grade Matcha Green Tea in a handy 30g mini pouch. Same quality as the 50g pack, ideal for first-time users. We recommend only 1 cup per day (1 pinch of matcha).",
    features: [
      "30g Ceremonial Grade Mini Pouch",
      "Weight Loss Friendly: Boosts metabolic fat burn",
      "We recommend only 1 cup per day (1 pinch of matcha)",
      "Non-GMO, 100% Vegan & Gluten Free"
    ],
    stock: 45
  },
  {
    id: "chia-seeds",
    name: "LF Clean Living Organic Chia Seeds",
    tagline: "Rich in Omega-3 • Fiber • Protein | 100% Natural Super Food",
    price: 1000,
    originalPrice: 1450,
    category: "superfood",
    image: "/images/chia-seeds.jpg",
    badge: "100% Natural Superfood",
    description: "Official Lifestyle Fitness (LF Clean Living) Chia Seeds Super Food. 100% pure and natural, packed with heart-healthy Omega-3, high prebiotic dietary fiber, and plant-based protein. Designed to support effective weight management, digestive health, energy boosting, and appetite control during fasting. 'Small Seeds, Big Change!'",
    features: [
      "Weight Management: Expands in stomach to keep you full for hours",
      "Heart Health: Rich source of essential Omega-3 fatty acids",
      "Digestive Health: High prebiotic fiber regulates bowel movements",
      "Boosts Energy: Clean fuel for intermittent fasting and daily vitality"
    ],
    stock: 80
  },
  {
    id: "chia-seeds-pack2",
    name: "LF Clean Living Organic Chia Seeds - Pack of 2",
    tagline: "2 Pouches | Rich in Omega-3 • Fiber • Protein",
    price: 1600,
    originalPrice: 2000,
    category: "superfood",
    image: "/images/chia-seeds.jpg",
    badge: "Pack of 2 - Save Rs. 400",
    description: "Two pouches of LF Clean Living Chia Seeds Super Food at a lower price than buying separately. 100% pure and natural, rich in Omega-3, fiber and plant-based protein.",
    features: [
      "2 Pouches of Organic Chia Seeds",
      "Save Rs. 400 compared to buying 2 singles",
      "Rich source of Omega-3 fatty acids",
      "High prebiotic fiber supports digestion"
    ],
    stock: 60
  },
  {
    id: "camu-camu",
    name: "LF Clean Living Camu Camu Berry Powder (60g)",
    tagline: "Natural Source of Vitamin C • Immunity • Antioxidants | 60g Pouch",
    price: 2500,
    originalPrice: 3200,
    category: "superfood",
    image: "/images/camu-camu.jpg",
    badge: "Official 60g Pack",
    description: "Official Lifestyle Fitness (LF Clean Living) Camu Camu Berry Powder (60g). 100% pure and natural wild-harvested Amazonian superfood. The world's most concentrated natural source of Vitamin C, loaded with bioflavonoids and powerful antioxidants. Promotes immune defense, healthy skin and collagen repair, hormonal cortisol balance (targeting stubborn belly fat), and clean natural vitality. 'Small Superfoods, Big Change!'",
    features: [
      "Official 60g Premium Organic Pouch",
      "Boosts Immunity: World's richest natural source of pure Vitamin C",
      "Healthy Skin: Stimulates natural collagen synthesis and radiant skin",
      "Powerful Antioxidants: Combats oxidative stress and cortisol belly fat",
      "Natural Energy: Sustained daytime vitality and fatigue defense"
    ],
    stock: 35
  },
  {
    id: "custom-diet-plan",
    name: "1-on-1 Customized Weight Loss Diet Plan",
    tagline: "Personalized by Khawar Khan (ISSA USA) | 30 Days",
    price: 7000,
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
    name: "The Weight Loss Recipe Book",
    tagline: "50+ Healthy & Delicious Recipes | Healthy • Simple • Delicious",
    price: 1999,
    originalPrice: 2999,
    category: "ebook",
    image: "/images/recipe-book.jpg",
    badge: "Official LF Recipe Book",
    description: "Official 'The Weight Loss Recipe Book' by Khawar Khan (ISSA USA Certified Nutritionist). Featuring 50+ healthy, simple, and delicious fat-loss recipes designed for everyday Pakistani and international lifestyles without starvation. Includes healthy breakfast bowls, low-calorie avocado toasts, detox green smoothies, high-protein meals, and clean desserts with complete calorie and macronutrient breakdowns.",
    features: [
      "50+ Healthy, Simple & Delicious Fat-Loss Recipes",
      "Exact Calorie, Protein, Carb & Fat Breakdown per Dish",
      "Quick & Easy 15-Minute Preparation Methods",
      "Includes Smoothies, Desi Healthy Meals & Fat-Loss Snacks"
    ],
    stock: 85
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

export const INITIAL_ORDERS: Order[] = [];
