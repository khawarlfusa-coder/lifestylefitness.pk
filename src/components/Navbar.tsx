"use client";

import React, { useState } from "react";
import { 
  Dumbbell, 
  ShoppingBag, 
  MessageSquareText, 
  Calculator, 
  Video, 
  Camera, 
  Menu, 
  X, 
  ShieldCheck, 
  Phone,
  Lock,
  Sparkles,
  Flame
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

  const navLinks = [
    { id: "home", label: "Home", icon: Dumbbell },
    { id: "videos", label: "Video Library", icon: Video },
    { id: "calculators", label: "Health Suite", icon: Calculator },
    { id: "ai-scanner", label: "AI Calorie Scan", icon: Camera, badge: "AI" },
    { id: "store", label: "Superfood Store", icon: ShoppingBag },
    { id: "chat", label: "Consultation", icon: MessageSquareText, badge: "Live" },
    { id: "articles", label: "Diet Guides", icon: Sparkles },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 transition-all duration-300">
      {/* Top Notification Announcement */}
      <div className="bg-gradient-to-r from-dark-950 via-emerald-950/80 to-dark-950 text-emerald-300 text-xs py-2 px-4 text-center font-medium border-b border-brand-500/20 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-brand-400 text-dark-950 tracking-wider shadow-sm shadow-brand-400/30">
          ISSA USA CERTIFIED
        </span>
        <span className="text-slate-200">
          Consultation with Nutritionist <strong>Khawar Khan</strong> | 317k+ Community
        </span>
        <a 
          href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20visited%20your%20website%20and%20want%20consultation" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 text-brand-400 hover:text-white font-bold ml-1 transition-colors group"
        >
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <Phone className="w-3 h-3 group-hover:rotate-12 transition-transform" />
          <span className="underline decoration-brand-400/50">+92 318 2112122</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-500 shadow-lg shadow-yellow-500/25 group-hover:scale-105 transition-all duration-300">
                <img
                  src="/images/lf-logo.png"
                  alt="Lifestyle Fitness Official Logo"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-brand-400 border-2 border-dark-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                  LIFESTYLE <span className="text-gradient-emerald">FITNESS</span>
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-brand-400/10 text-brand-300 border border-brand-400/30">
                  PK
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                Khawar Khan • ISSA USA Certified
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 ${
                    isActive
                      ? "text-white bg-white/10 border border-brand-400/40 shadow-md shadow-brand-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-brand-400" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full tracking-wider ${
                      link.badge === "AI" 
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" 
                        : "bg-brand-400/20 text-brand-300 border border-brand-400/40"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            
            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-dark-800 text-slate-200 hover:text-white hover:bg-dark-750 border border-white/10 transition-all hover:border-brand-400/40"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-400 text-dark-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-brand-400/50 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Key */}
            <button
              onClick={openAdmin}
              className="p-2.5 rounded-xl bg-dark-800 text-slate-400 hover:text-brand-400 hover:bg-dark-750 border border-white/10 transition-all"
              title="Khawar Khan Admin Dashboard"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Official WhatsApp Button */}
            <a
              href="https://wa.me/923182112122?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20want%20to%20consult%20regarding%20weight%20loss%20and%20diet%20plan"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+92 318 2112122</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-dark-800 text-slate-200 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-dark-900/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-brand-400/15 text-brand-300 border border-brand-400/30"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-brand-400" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-400/20 text-brand-300">
                    {link.badge}
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
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: +92 318 2112122</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
