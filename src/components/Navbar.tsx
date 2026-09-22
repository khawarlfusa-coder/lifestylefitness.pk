"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Phone,
  Lock,
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean, high-end, uncluttered navigation links
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "transformations", label: "Transformations", highlight: true },
    { id: "videos", label: "Video Vault" },
    { id: "store", label: "Superfood Store" },
    { id: "calculators", label: "Calculators" },
    { id: "ai-scanner", label: "AI Calorie Scan" },
    { id: "chat", label: "Consultation" },
    { id: "articles", label: "Diet Guides" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-950/85 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
      
      {/* Top Announcement Bar - Sleek, Minimal */}
      <div className="bg-gradient-to-r from-dark-950 via-emerald-950/50 to-dark-950 text-slate-300 text-[11px] py-1.5 px-4 text-center font-medium border-b border-white/5 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span className="inline-flex items-center gap-1.5 text-brand-400 font-bold uppercase tracking-wider text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          ISSA USA Certified Nutritionist
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="text-slate-300">
          Khawar Khan | 317k+ YouTube Community
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <a 
          href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20want%20to%20consult%20regarding%20weight%20loss" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
        >
          <Phone className="w-2.5 h-2.5" />
          <span>WhatsApp: +92 318 2112122</span>
        </a>
      </div>

      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo Emblem Only (Clean, Icon-Only, No Redundant Text) */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center cursor-pointer group select-none shrink-0"
            title="Lifestyle Fitness PK - Khawar Khan"
          >
            <div className="relative">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-500 shadow-lg shadow-yellow-500/25 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/lf-logo.png"
                  alt="Lifestyle Fitness Official Emblem"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-brand-400 border-2 border-dark-950 rounded-full" />
            </div>
          </div>

          {/* Luxury Minimalist Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-[13px] font-semibold tracking-normal transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{link.label}</span>
                  
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-sm shadow-brand-400" />
                  )}

                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-brand-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Direct WhatsApp */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Shopping Cart Pill */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-white/10 transition-all hover:border-brand-400/40"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-brand-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-400 text-dark-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-brand-400/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Key Lock */}
            <button
              onClick={openAdmin}
              className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-brand-300 border border-white/10 transition-all"
              title="Khawar Khan Admin CMS (/admin)"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Official Direct WhatsApp Button */}
            <a
              href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20want%20to%20consult%20regarding%20weight%20loss%20and%20diet%20plan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 fill-dark-950" />
              <span className="hidden sm:inline font-heading font-black tracking-tight">+92 318 2112122</span>
              <span className="sm:hidden font-heading font-black">WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-dark-900/98 backdrop-blur-2xl px-4 py-4 space-y-1.5 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-brand-400/15 text-brand-300 border border-brand-400/30"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-400/20 text-brand-300">
                    Results
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-white/10 space-y-2">
            <a
              href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500 text-dark-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4 fill-dark-950" />
              <span>WhatsApp Khawar: +92 318 2112122</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Khawar Khan Admin CMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
