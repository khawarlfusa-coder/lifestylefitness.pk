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
    name: "LF Clean Living Organic Chia Seeds",
    tagline: "Rich in Omega-3 • Fiber • Protein | 100% Natural Super Food",
    price: 1450,
    originalPrice: 1950,
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
    id: "camu-camu",
    name: "LF Clean Living Camu Camu Berry Powder",
    tagline: "Natural Source of Vitamin C • Immunity • Antioxidants • Wellness | 100% Natural",
    price: 3200,
    originalPrice: 3900,
    category: "superfood",
    image: "/images/camu-camu.jpg",
    badge: "100% Natural Vitamin C",
    description: "Official Lifestyle Fitness (LF Clean Living) Camu Camu Berry Powder. 100% pure and natural wild-harvested Amazonian superfood. The world's most concentrated natural source of Vitamin C, loaded with bioflavonoids and powerful antioxidants. Promotes immune defense, healthy skin and collagen repair, hormonal cortisol balance (targeting stubborn belly fat), and clean natural vitality. 'Small Superfoods, Big Change!'",
    features: [
      "Boosts Immunity: World's richest natural source of pure Vitamin C",
      "Healthy Skin: Stimulates natural collagen synthesis and radiant skin",
      "Powerful Antioxidants: Combats oxidative stress and cortisol belly fat",
      "Natural Energy: Sustained daytime vitality and fatigue defense"
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

export const INITIAL_ORDERS: Order[] = [
  {
    id: "LF-1048",
    customerName: "Mohammad Usman",
    phone: "0300 8472910",
    city: "Lahore",
    address: "House 42, Block B, Model Town, Lahore",
    items: [
      {
        productId: "matcha-tea",
        productName: "Lifestyle Fitness Ceremonial Matcha Green Tea (50g)",
        quantity: 2,
        price: 2850
      },
      {
        productId: "chia-seeds",
        productName: "Organic Whole Chia Seeds (250g)",
        quantity: 1,
        price: 1450
      }
    ],
    subtotal: 7150,
    shippingFee: 0,
    total: 7150,
    paymentMethod: "Cash on Delivery (COD)",
    status: "Pending",
    createdAt: "Today at 2:45 PM"
  },
  {
    id: "LF-1047",
    customerName: "Fatima Noor",
    phone: "0321 4983021",
    city: "Karachi",
    address: "Flat 4-B, Al-Noor Heights, Gulshan-e-Iqbal Block 13-D, Karachi",
    items: [
      {
        productId: "custom-diet-plan",
        productName: "1-on-1 Customized Weight Loss Diet Plan (30 Days)",
        quantity: 1,
        price: 6500
      }
    ],
    subtotal: 6500,
    shippingFee: 0,
    total: 6500,
    paymentMethod: "WhatsApp Order",
    status: "Confirmed",
    createdAt: "Today at 11:20 AM"
  },
  {
    id: "LF-1046",
    customerName: "Ahmed Bilal",
    phone: "0333 5129844",
    city: "Islamabad",
    address: "House 19, Street 44, Sector F-8/2, Islamabad",
    items: [
      {
        productId: "camu-camu",
        productName: "Wild-Harvested Camu Camu Berry Powder (100g)",
        quantity: 1,
        price: 3200
      },
      {
        productId: "recipe-book",
        productName: "Ultimate Fat Loss Recipe Book",
        quantity: 1,
        price: 1999
      }
    ],
    subtotal: 5199,
    shippingFee: 0,
    total: 5199,
    paymentMethod: "Cash on Delivery (COD)",
    status: "Dispatched",
    createdAt: "Yesterday at 6:15 PM"
  }
];

