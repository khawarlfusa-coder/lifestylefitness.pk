"use client";

import React from "react";
import { Youtube, Instagram, Phone, Award, ShieldCheck, Heart, Sparkles } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark-950 border-t border-white/10 pt-16 pb-28 lg:pb-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/images/lf-logo.png"
                  alt="Lifestyle Fitness Logo"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-heading group-hover:text-slate-100 transition-colors">
                  LIFESTYLE <span className="text-brand-400">FITNESS PK</span>
                </span>
                <p className="text-[11px] text-slate-400 font-medium">Khawar Khan • USA Certified Nutritionist</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs max-w-sm">
              Helping over 317,000+ individuals burn stubborn fat, reverse metabolic slowdown, and live disease-free through science-backed Pakistani diet plans and pure superfoods.
            </p>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@Lifestylefitnesspk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-dark-850 hover:bg-red-600 hover:text-white flex items-center justify-center text-red-500 transition-all border border-white/10"
                title="YouTube (317k Subscribers)"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/khawarLF"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-dark-850 hover:bg-pink-600 hover:text-white flex items-center justify-center text-pink-500 transition-all border border-white/10"
                title="Instagram (@khawarLF)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-dark-850 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-emerald-400 transition-all border border-white/10"
                title="WhatsApp Direct Contact (+92 318 2112122)"
              >
                <Phone className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-slate-300 px-3 py-1.5 rounded-xl bg-dark-850 border border-white/10 font-bold">
                TikTok: @lfpk.pk (30k)
              </span>
            </div>
          </div>

          {/* Quick Links with smooth scroll to top */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-heading">Quick Features</h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <button 
                  onClick={() => handleNavClick("transformations")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>Client Transformations</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("calculators")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>BMI & Ideal Weight Calculator</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("ai-scanner")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>AI Food Picture Calorie Meter</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("store")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>Matcha Tea & Superfoods Store</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("videos")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>Weight Loss Video Library</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("chat")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>1-on-1 Consultation Chat</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("articles")} 
                  className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400" />
                  <span>Diet & Nutrition Guides</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & ISSA Accreditation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-heading">Direct Contact & Verification</h4>
            <div className="p-4 rounded-2xl bg-dark-900 border border-brand-400/20 space-y-2">
              <div className="flex items-center gap-2 text-brand-300 font-bold">
                <Award className="w-4 h-4 text-brand-400" />
                <span>ISSA USA Accredited Nutritionist</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Certified Specialist in Fitness Nutrition (ISSA USA). Consultations & plans follow strictly evidence-based nutritional protocols.
              </p>
              <div className="pt-1 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Official WhatsApp: +92 318 2112122</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              Cash on Delivery (COD) available across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar and all cities in Pakistan.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Lifestyle Fitness PK. All Rights Reserved. Founded by Khawar Khan.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Pakistan & Worldwide Community
          </p>
        </div>
      </div>
    </footer>
  );
};
