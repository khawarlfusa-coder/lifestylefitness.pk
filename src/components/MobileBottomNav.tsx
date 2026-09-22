"use client";

import React from "react";
import { Dumbbell, Video, Calculator, ShoppingBag, MessageSquareText, Award, Sparkles } from "lucide-react";

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
}) => {
  const tabs = [
    { id: "home", label: "Home", icon: Dumbbell },
    { id: "transformations", label: "Results", icon: Award },
    { id: "videos", label: "Videos", icon: Video },
    { id: "store", label: "Store", icon: ShoppingBag, badge: cartCount },
    { id: "calculators", label: "Health", icon: Calculator },
    { id: "chat", label: "Chat", icon: MessageSquareText },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-950/95 backdrop-blur-xl border-t border-white/10 px-1 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all ${
                isActive ? "text-brand-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.75px]"}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-400 text-dark-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? "font-black text-brand-300" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
