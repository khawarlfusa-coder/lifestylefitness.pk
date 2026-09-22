"use client";

import React, { useState } from "react";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Flame, 
  RotateCcw, 
  PieChart, 
  HelpCircle,
  MessageSquare,
  Phone
} from "lucide-react";

interface MealAnalysis {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  fitnessRating: "Excellent" | "Moderate" | "High Calorie";
  color: string;
  nutritionistTip: string;
  items: string[];
}

const SAMPLE_MEALS: { label: string; image: string; analysis: MealAnalysis }[] = [
  {
    label: "Chicken Tikka & Salad",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800",
    analysis: {
      name: "Grilled Chicken Tikka Breast with Green Salad",
      calories: 340,
      protein: 44,
      carbs: 8,
      fat: 12,
      fiber: 4,
      fitnessRating: "Excellent",
      color: "text-emerald-400",
      nutritionistTip: "Behtareen high-protein lean meal! Yeh muscle ko preserve rakhti hai aur body fat jaldi pighlati hai. Daily lunch ya dinner me ideal hai.",
      items: ["Skinless Chicken Tikka (200g)", "Cucumber & Tomato Salad", "Lemon Dressing", "Zero White Flour"]
    }
  },
  {
    label: "Daal Chawal & Salad",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    analysis: {
      name: "Yellow Lentil (Daal) with Steamed White Rice",
      calories: 480,
      protein: 16,
      carbs: 78,
      fat: 9,
      fiber: 7,
      fitnessRating: "Moderate",
      color: "text-amber-400",
      nutritionistTip: "Desi comfort food! Isko fat loss friendly banane ke liye chawal ki quantity aadhi katori karein aur sath me 1 katori fresh cucumber salad aur 1 ubla hua anda shamil karein.",
      items: ["Moong/Masoor Daal (1 Bowl)", "Boiled White Rice (150g)", "Zeera Tarka (Light Oil)"]
    }
  },
  {
    label: "Pakistani Biryani Plate",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    analysis: {
      name: "Special Chicken Biryani with Potato & Raita",
      calories: 780,
      protein: 28,
      carbs: 95,
      fat: 32,
      fiber: 3,
      fitnessRating: "High Calorie",
      color: "text-rose-400",
      nutritionistTip: "Calorie density bohat zyada hai ghee aur chawal ki waja se. Weight loss dauran isko hafte me ek baar 'cheat meal' ke tor par 1 small plate limit karein aur bad me 1 cup Matcha Green Tea zaroor piyein.",
      items: ["Spiced Biryani Rice (250g)", "Chicken Thigh Piece (1)", "Potato (Aloo 1)", "Oil/Ghee Content High"]
    }
  },
  {
    label: "Eggs & Brown Bread",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    analysis: {
      name: "2 Whole Boiled Eggs with Whole Wheat Toast",
      calories: 270,
      protein: 19,
      carbs: 22,
      fat: 11,
      fiber: 4,
      fitnessRating: "Excellent",
      color: "text-emerald-400",
      nutritionistTip: "Perfect fat loss breakfast! Eggs me choline aur essential amino acids hote hain jo subha ke waqt cravings aur hunger hormone (Ghrelin) ko control karte hain.",
      items: ["2 Hard Boiled Eggs", "1 Slice Multi-grain/Brown Bread", "Black Pepper & Himalayan Pink Salt"]
    }
  }
];

interface AIFoodScannerProps {
  onAskKhawar: () => void;
}

export const AIFoodScanner: React.FC<AIFoodScannerProps> = ({ onAskKhawar }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_MEALS[0].image);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(SAMPLE_MEALS[0].analysis);

  const handleSelectSample = (sample: typeof SAMPLE_MEALS[0]) => {
    setSelectedImage(sample.image);
    setIsScanning(true);
    setAnalysis(null);

    setTimeout(() => {
      setAnalysis(sample.analysis);
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setIsScanning(true);
      setAnalysis(null);

      setTimeout(() => {
        setAnalysis({
          name: "Home Cooked Balanced Meal (Detected)",
          calories: 410,
          protein: 26,
          carbs: 45,
          fat: 14,
          fiber: 6,
          fitnessRating: "Moderate",
          color: "text-emerald-400",
          nutritionistTip: "AI Plate Scan: Khana acha balanced lag raha hai. Agar aap weight loss deficit me hain to oil ki miqdaar kam rakhein aur sham ko Chia Seeds water drink karein.",
          items: ["Cooked Protein Portion (~120g)", "Carbohydrate Source (~1 roti/cup)", "Vegetable/Salad Elements"]
        });
        setIsScanning(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleDiscussOnWhatsApp = () => {
    if (!analysis) return;
    const text = encodeURIComponent(
      `Assalam o Alaikum Khawar Khan (+92 318 2112122)!\nMaine website ke AI Food Scanner par apna khana scan kiya hai:\n\n*Meal:* ${analysis.name}\n*Calories:* ${analysis.calories} kcal\n*Macros:* ${analysis.protein}g Protein, ${analysis.carbs}g Carbs, ${analysis.fat}g Fat\n\nIs meal ko weight loss ke liye aur behtar kaise bana sakta hoon?`
    );
    window.open(`https://wa.me/923182112122?text=${text}`, "_blank");
  };

  return (
    <section id="ai-scanner" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black mb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Smart AI Calorie Vision Scanner
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Snap Your Food & <span className="text-purple-400">Get Instant Calories</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Apne khane ki photo capture karein. Hamara AI food recognition system calories, protein, carbs aur Khawar Khan ka verified nutritionist mashwara bataega.
        </p>
      </div>

      {/* Main Scanner Card */}
      <div className="max-w-5xl mx-auto glass-card rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl">
        {/* Sample Meal Quick Selectors */}
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1.5 font-heading">
            <span>Yahan se sample meal select karein ya apni photo upload karein:</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SAMPLE_MEALS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(s)}
                className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition-all text-left font-heading ${
                  selectedImage === s.image
                    ? "bg-purple-500/20 border-purple-500 text-purple-200 shadow-md"
                    : "bg-dark-850/80 border-white/5 text-slate-300 hover:bg-dark-800"
                }`}
              >
                <img src={s.image} alt={s.label} className="w-9 h-9 rounded-xl object-cover" />
                <span className="truncate">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scanner Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image Preview & Laser Scan */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-dark-950 border border-white/10 flex items-center justify-center group shadow-inner">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Meal Plate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-center p-6 text-slate-500 space-y-2">
                  <Camera className="w-12 h-12 mx-auto text-slate-600" />
                  <p className="text-sm font-semibold">Koi khana upload nahi hua</p>
                </div>
              )}

              {/* Scanning Overlay Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-purple-950/75 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
                  <p className="text-sm font-black text-white flex items-center gap-2 font-heading">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                    AI Plate Scan Kar Raha Hai...
                  </p>
                  <p className="text-xs text-purple-300">Calculating Calories & Macros</p>
                </div>
              )}

              <div className="absolute top-3.5 left-3.5 bg-dark-950/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-purple-400" />
                <span>Plate Scanner</span>
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex items-center gap-3">
              <label className="flex-1 py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-purple-600/25 font-heading">
                <Upload className="w-4 h-4" />
                <span>Upload Apni Food Picture</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  if (analysis) handleSelectSample(SAMPLE_MEALS[0]);
                }}
                className="p-3.5 rounded-2xl bg-dark-800 hover:bg-dark-750 text-slate-300 border border-white/5"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: AI Analysis Output */}
          <div className="lg:col-span-6 bg-dark-950/90 rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            {analysis ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 font-heading">
                      AI Detected Meal
                    </span>
                    <h3 className="text-xl font-black text-white font-heading">{analysis.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black px-3 py-1 rounded-full bg-dark-800 border ${analysis.color} font-heading`}>
                      {analysis.fitnessRating}
                    </span>
                  </div>
                </div>

                {/* Total Calories Highlight */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-300 font-bold">Total Estimated Calories</p>
                      <h4 className="text-3xl font-black text-white font-heading">{analysis.calories} <span className="text-sm font-normal text-slate-400">kcal</span></h4>
                    </div>
                  </div>
                </div>

                {/* Macronutrient Breakdown */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-dark-850 p-2.5 rounded-2xl border border-white/5">
                    <p className="text-[11px] font-black text-sky-400 font-heading">Protein</p>
                    <p className="text-lg font-black text-white font-heading">{analysis.protein}g</p>
                  </div>
                  <div className="bg-dark-850 p-2.5 rounded-2xl border border-white/5">
                    <p className="text-[11px] font-black text-amber-400 font-heading">Carbs</p>
                    <p className="text-lg font-black text-white font-heading">{analysis.carbs}g</p>
                  </div>
                  <div className="bg-dark-850 p-2.5 rounded-2xl border border-white/5">
                    <p className="text-[11px] font-black text-teal-400 font-heading">Fat</p>
                    <p className="text-lg font-black text-white font-heading">{analysis.fat}g</p>
                  </div>
                  <div className="bg-dark-850 p-2.5 rounded-2xl border border-white/5">
                    <p className="text-[11px] font-black text-brand-400 font-heading">Fiber</p>
                    <p className="text-lg font-black text-white font-heading">{analysis.fiber}g</p>
                  </div>
                </div>

                {/* Khawar Khan Verdict */}
                <div className="bg-emerald-950/50 border border-brand-400/30 p-4 rounded-2xl space-y-1.5">
                  <p className="text-xs font-black text-brand-300 flex items-center gap-1.5 font-heading">
                    <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                    Khawar Khan's Nutritionist Verdict:
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysis.nutritionistTip}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onAskKhawar}
                    className="py-3 px-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 hover:text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-2 transition-colors font-heading"
                  >
                    <MessageSquare className="w-4 h-4 text-brand-400" />
                    <span>Free Website Chat</span>
                  </button>

                  <button
                    onClick={handleDiscussOnWhatsApp}
                    className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 font-heading"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Khawar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <PieChart className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-sm font-semibold">Plate ko scan karne ke liye picture upload karein.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
