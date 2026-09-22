"use client";

import React, { useState } from "react";
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ZoomIn, 
  X, 
  Phone, 
  ShieldCheck, 
  Star,
  Flame,
  Users
} from "lucide-react";

interface TransformationItem {
  id: string;
  image: string;
  name: string;
  city: string;
  weightLost: string;
  duration: string;
  aspectRatio: number;
  highlight: string;
  tags: string[];
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "trans-1",
    image: "/images/transformations/transformation-1.png",
    name: "Verified LF Client",
    city: "Lahore / UK Client",
    weightLost: "-22 KG Lost",
    duration: "4 Months",
    aspectRatio: 1.42,
    highlight: "Stubborn belly fat reduction & waistline contouring without starvation or gym exhaustion.",
    tags: ["Fat Loss", "Thyroid Safe", "ISSA Diet"]
  },
  {
    id: "trans-2",
    image: "/images/transformations/transformation-2.png",
    name: "Success Story",
    city: "Karachi, Pakistan",
    weightLost: "-18 KG Lost",
    duration: "14 Weeks",
    aspectRatio: 1.18,
    highlight: "Metabolic reset plan with Matcha Green Tea & Pakistani home-cooked meal management.",
    tags: ["PCOS Reversal", "Metabolic Reset", "Home Food"]
  },
  {
    id: "trans-3",
    image: "/images/transformations/transformation-3.png",
    name: "Client Milestone",
    city: "Islamabad, PK",
    weightLost: "-15 KG Lost",
    duration: "12 Weeks",
    aspectRatio: 0.74,
    highlight: "Visceral fat burning, cholesterol profile normalization, and massive energy boost.",
    tags: ["Belly Fat", "No Crash Diet", "ISSA Protocol"]
  },
  {
    id: "trans-4",
    image: "/images/transformations/transformation-4.png",
    name: "Transformation Journey",
    city: "Faisalabad / Overseas",
    weightLost: "-25 KG Lost",
    duration: "5 Months",
    aspectRatio: 0.84,
    highlight: "Dramatic body recomposition with personalized macronutrient balancing by Khawar Khan.",
    tags: ["Severe Obesity", "100% Natural", "Custom Plan"]
  },
  {
    id: "trans-5",
    image: "/images/transformations/transformation-5.png",
    name: "Lifestyle Transformation",
    city: "Rawalpindi, Pakistan",
    weightLost: "-14 KG Lost",
    duration: "10 Weeks",
    aspectRatio: 1.25,
    highlight: "Post-pregnancy weight loss while sustaining daily vitality and balanced hormones.",
    tags: ["Postpartum", "Hormonal Balance", "Natural Diet"]
  },
  {
    id: "trans-6",
    image: "/images/transformations/transformation-6.png",
    name: "Health Breakthrough",
    city: "Dubai / Karachi",
    weightLost: "-12 KG Lost",
    duration: "8 Weeks",
    aspectRatio: 1.00,
    highlight: "Fat shredding using Chia Seeds, Camu Camu superfoods and targeted intermittent fasting.",
    tags: ["Fast Results", "Superfoods", "ISSA USA"]
  },
  {
    id: "trans-7",
    image: "/images/transformations/transformation-7.png",
    name: "Client Success",
    city: "Multan, Pakistan",
    weightLost: "-20 KG Lost",
    duration: "16 Weeks",
    aspectRatio: 0.91,
    highlight: "Complete health turnaround: dropped 4 waist sizes without skipping family dinners.",
    tags: ["Sustainable", "Desi Meals", "Khawar Guidance"]
  },
  {
    id: "trans-8",
    image: "/images/transformations/transformation-8.png",
    name: "Dedicated Member",
    city: "Sialkot / Canada",
    weightLost: "-16 KG Lost",
    duration: "12 Weeks",
    aspectRatio: 1.10,
    highlight: "Lean physique development, improved blood sugar stability, and vibrant skin vitality.",
    tags: ["Insulin Resistance", "Fat Loss", "Superfoods"]
  }
];

interface TestimonialsSectionProps {
  onConsultClick?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onConsultClick }) => {
  const [selectedImage, setSelectedImage] = useState<TransformationItem | null>(null);
  const [filterTag, setFilterTag] = useState<string>("All");

  const filterTags = ["All", "Fat Loss", "Belly Fat", "Metabolic Reset", "Superfoods"];

  const filteredItems = filterTag === "All" 
    ? TRANSFORMATIONS 
    : TRANSFORMATIONS.filter(t => t.tags.includes(filterTag));

  return (
    <section id="transformations" className="py-20 bg-dark-900 border-b border-white/5 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/30 text-brand-300 text-xs font-black tracking-wide">
            <Award className="w-4 h-4 text-brand-400" />
            <span>FITNESSBYKHAWAR.COM VERIFIED RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            Real People. Real <span className="text-gradient-emerald">Transformations</span>.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every photo below represents a real client who achieved sustainable fat loss under the supervision of <strong>Khawar Khan (ISSA USA Certified Nutritionist)</strong>. No artificial shortcuts, no crash starvation.
          </p>

          {/* Social Proof Stats Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-dark-800/80 px-3 py-1.5 rounded-xl border border-white/10">
              <Users className="w-4 h-4 text-brand-400" />
              <span><strong>10,000+</strong> Lives Transformed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-dark-800/80 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span><strong>100%</strong> Original Proof Cards</span>
            </div>
            <div className="flex items-center gap-1.5 bg-dark-800/80 px-3 py-1.5 rounded-xl border border-white/10">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span><strong>5.0</strong> Client Satisfaction</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterTag === tag
                    ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20 font-black scale-105"
                    : "bg-dark-800 text-slate-300 hover:text-white hover:bg-dark-750 border border-white/5"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Transformations Grid - Preserving exact intrinsic aspect ratios with NO stretching */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-dark-850/90 hover:bg-dark-800 border border-white/10 hover:border-brand-400/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with object-contain & aspect ratio safety so NO STRETCHING happens */}
              <div 
                className="relative bg-black/70 p-3 flex items-center justify-center cursor-pointer overflow-hidden border-b border-white/10 min-h-[300px]"
                onClick={() => setSelectedImage(item)}
              >
                {/* Genuine Transformation Card Image - Strictly object-contain, natural proportions */}
                <img
                  src={item.image}
                  alt={`${item.name} - ${item.weightLost}`}
                  className="max-h-[360px] w-auto max-w-full object-contain mx-auto rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />

                {/* Top Weight Loss Badge */}
                <div className="absolute top-4 left-4 bg-emerald-500 text-dark-950 font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-dark-950" />
                  <span>{item.weightLost}</span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-dark-900/90 backdrop-blur-md text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                  {item.duration}
                </div>

                {/* Click to Zoom Overlay */}
                <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs pointer-events-none">
                  <div className="bg-dark-900/90 border border-brand-400/50 px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 text-brand-300">
                    <ZoomIn className="w-4 h-4" />
                    <span>View Full High-Res</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-white font-heading">{item.name}</h3>
                    <span className="text-[11px] text-slate-400 font-medium">{item.city}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.highlight}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="text-xs font-bold text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect</span>
                    <ZoomIn className="w-3 h-3" />
                  </button>

                  <a
                    href={`https://wa.me/923182112122?text=${encodeURIComponent(
                      `Assalam o Alaikum Khawar Khan, maine aapki website per transformation dekhi (${item.weightLost} in ${item.duration}). Main bhi apna customized diet plan lena chahta hun.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-dark-950 border border-emerald-500/30 text-xs font-extrabold transition-all"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Get This Result</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-dark-800 to-dark-850 border border-brand-400/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-brand-400/20 text-brand-300 border border-brand-400/40 uppercase tracking-wider">
              Start Your Journey Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Ready To Be Our Next Success Story?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Receive a customized diet plan tailored to Pakistani home food, your medical history (PCOS, Thyroid, Diabetes), and weight loss goals directly from Khawar Khan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20want%20to%20start%20my%20weight%20loss%20transformation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-dark-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 font-heading"
            >
              <Phone className="w-4 h-4 fill-dark-950" />
              <span>WhatsApp Consultation (+92 318 2112122)</span>
            </a>

            {onConsultClick && (
              <button
                onClick={onConsultClick}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-dark-800 hover:bg-dark-750 text-white font-bold text-xs sm:text-sm border border-white/10 hover:border-brand-400/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Online Chat Area</span>
                <ArrowRight className="w-4 h-4 text-brand-400" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Lightbox Modal - Preserves 100% pure intrinsic resolution without any distortion */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] bg-dark-900 border border-white/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-950">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500 text-dark-950">
                  {selectedImage.weightLost}
                </span>
                <span className="text-sm font-black text-white font-heading">
                  {selectedImage.name} • {selectedImage.city}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white hover:bg-dark-700 transition-colors"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area - Natural aspect ratio display */}
            <div className="p-4 sm:p-6 bg-black flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-dark-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 max-w-md">
                <p className="font-semibold text-white mb-0.5">Program Details ({selectedImage.duration})</p>
                <p>{selectedImage.highlight}</p>
              </div>

              <a
                href={`https://wa.me/923182112122?text=${encodeURIComponent(
                  `Assalam o Alaikum Khawar Khan! I saw this transformation (${selectedImage.weightLost} in ${selectedImage.duration}) on your website and I want to start my plan.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-3.5 h-3.5 fill-dark-950" />
                <span>Consult on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
