"use client";

import React from "react";
import Image from "next/image";
import { 
  Award, 
  Youtube, 
  Instagram, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  Phone,
  Check,
  Dumbbell
} from "lucide-react";

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-20 right-0 w-[450px] h-[450px] bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Value Prop */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Trust Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 bg-dark-850/90 border border-brand-400/30 rounded-full px-4 py-1.5 shadow-lg shadow-black/60">
              <span className="flex items-center gap-1.5 text-xs font-black text-brand-300 tracking-wide">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                ISSA USA CERTIFIED NUTRITIONIST
              </span>
              <span className="text-slate-600">•</span>
              <a
                href="https://www.youtube.com/@Lifestylefitnesspk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                317K+ YouTube
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="https://wa.me/923182112122"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                +92 318 2112122
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-heading">
              Lose 10 Kilos of <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">Stubborn Fat</span> <br className="hidden sm:inline" />
              Without Starving.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Main hoon <strong className="text-white font-bold">Khawar Khan</strong> (ISSA USA Certified Nutritionist). Science-backed Pakistani diet plans, 100% natural organic superfoods (Matcha, Chia, Camu Camu), aur personalized WhatsApp guidance ke sath apna wazan hamesha ke liye kam karein.
            </p>

            {/* Bullet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-3 bg-dark-850/70 p-3 rounded-2xl border border-white/5 hover:border-brand-400/30 transition-colors">
                <div className="w-7 h-7 rounded-xl bg-brand-400/15 flex items-center justify-center text-brand-400 shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="font-semibold">No Starvation (Ghar Ka Desi Khana)</span>
              </div>
              <div className="flex items-center gap-3 bg-dark-850/70 p-3 rounded-2xl border border-white/5 hover:border-brand-400/30 transition-colors">
                <div className="w-7 h-7 rounded-xl bg-brand-400/15 flex items-center justify-center text-brand-400 shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="font-semibold">PCOS, Thyroid & Diabetes Friendly</span>
              </div>
              <div className="flex items-center gap-3 bg-dark-850/70 p-3 rounded-2xl border border-white/5 hover:border-brand-400/30 transition-colors">
                <div className="w-7 h-7 rounded-xl bg-brand-400/15 flex items-center justify-center text-brand-400 shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="font-semibold">Japanese Matcha & Camu Camu</span>
              </div>
              <div className="flex items-center gap-3 bg-dark-850/70 p-3 rounded-2xl border border-white/5 hover:border-brand-400/30 transition-colors">
                <div className="w-7 h-7 rounded-xl bg-brand-400/15 flex items-center justify-center text-brand-400 shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="font-semibold">Direct WhatsApp: +92 318 2112122</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab("store")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-400 via-brand-500 to-emerald-500 hover:from-brand-300 hover:to-emerald-400 text-dark-950 font-black text-sm tracking-wide shadow-xl shadow-brand-400/25 hover:shadow-brand-400/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 font-heading"
              >
                <span>Get Customized Diet Plan</span>
                <ArrowRight className="w-4 h-4 text-dark-950 stroke-[3]" />
              </button>

              <a
                href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20want%20to%20consult%20regarding%20weight%20loss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white font-black text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center justify-center gap-2.5 shadow-lg font-heading"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +92 318 2112122</span>
              </a>

              <button
                onClick={() => setActiveTab("ai-scanner")}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-bold text-sm border border-purple-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Food Scanner</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Connect Directly:</span>
              <a
                href="https://www.youtube.com/@Lifestylefitnesspk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-red-400 transition-colors font-semibold"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube 317k</span>
              </a>
              <a
                href="https://www.instagram.com/khawarLF"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition-colors font-semibold"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>@khawarLF (6k)</span>
              </a>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-semibold">TikTok: @lfpk.pk (30k)</span>
            </div>

          </div>

          {/* Right Column: Hero Profile Presentation (Using New Cutout Photo) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[390px]">
              
              {/* Outer neon halo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-brand-400 via-emerald-500 to-teal-300 rounded-[36px] blur-2xl opacity-35 animate-pulse" />

              {/* Athletic Showcase Card */}
              <div className="relative bg-gradient-to-b from-dark-850 to-dark-950 rounded-[32px] overflow-hidden border border-white/15 shadow-2xl">
                
                {/* Athletic Silhouette Area */}
                <div className="relative w-full h-[470px] flex items-end justify-center overflow-hidden bg-gradient-to-t from-dark-950 via-dark-900/60 to-dark-950/20">
                  
                  {/* Subtle glowing radial pedestal behind Khawar Khan */}
                  <div className="absolute bottom-10 w-64 h-64 bg-brand-400/20 rounded-full blur-2xl pointer-events-none" />

                  {/* Cutout Image of Khawar Khan in black shirt */}
                  <div className="relative w-[340px] h-[450px] z-10 transition-transform duration-700 hover:scale-105">
                    <Image
                      src="/images/khawar-khan-athletic.png"
                      alt="Khawar Khan - ISSA USA Certified Nutritionist"
                      fill
                      className="object-contain object-bottom drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
                      priority
                    />
                  </div>
                  
                  {/* ISSA USA Badge Tag */}
                  <div className="absolute top-4 left-4 z-20 bg-dark-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-400/50 shadow-xl flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-400" />
                    <span className="text-[11px] font-black text-white tracking-wider">ISSA USA CERTIFIED</span>
                  </div>

                  {/* YouTube Subscriber Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-red-600/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 text-white">
                    <Youtube className="w-4 h-4 fill-white" />
                    <span className="text-xs font-black">317K</span>
                  </div>
                </div>

                {/* Profile Card Info Box */}
                <div className="p-6 bg-dark-900/95 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-white flex items-center gap-1.5 font-heading">
                        Khawar Khan
                        <CheckCircle2 className="w-4 h-4 text-brand-400 fill-brand-400/20" />
                      </h2>
                      <p className="text-xs text-brand-400 font-bold">USA Certified Fitness Nutritionist</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-gold-400 bg-gold-400/15 px-2.5 py-1 rounded-lg border border-gold-400/30">
                        10 Kilo Fat Loss
                      </span>
                    </div>
                  </div>

                  {/* Micro stats inside card */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-center">
                    <div className="bg-dark-800/80 p-2.5 rounded-2xl border border-white/5">
                      <p className="text-base font-black text-white font-heading">317k+</p>
                      <p className="text-[10px] text-slate-400 font-semibold">Subscribers</p>
                    </div>
                    <div className="bg-dark-800/80 p-2.5 rounded-2xl border border-white/5">
                      <p className="text-base font-black text-brand-400 font-heading">10,000+</p>
                      <p className="text-[10px] text-slate-400 font-semibold">Clients</p>
                    </div>
                    <div className="bg-dark-800/80 p-2.5 rounded-2xl border border-white/5">
                      <p className="text-base font-black text-gold-400 font-heading">ISSA</p>
                      <p className="text-[10px] text-slate-400 font-semibold">USA Certified</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Pill - WhatsApp Direct */}
              <a
                href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-5 -left-5 z-20 bg-emerald-950/95 border border-emerald-500/50 text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 hover:scale-105 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-400/20 flex items-center justify-center text-brand-400">
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </div>
                <div>
                  <p className="text-xs font-black text-white font-heading">+92 318 2112122</p>
                  <p className="text-[10px] text-emerald-300 font-semibold">WhatsApp Direct Click</p>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
