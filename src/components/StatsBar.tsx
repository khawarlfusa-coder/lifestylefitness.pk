"use client";

import React from "react";
import { Youtube, Award, Users, TrendingDown } from "lucide-react";

export const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: Youtube,
      value: "317,000+",
      label: "YouTube Community",
      sub: "@Lifestylefitnesspk",
      color: "text-red-400",
      bg: "bg-red-500/15 border-red-500/30",
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Active Diet Clients",
      sub: "Pakistan & Overseas",
      color: "text-brand-400",
      bg: "bg-brand-400/15 border-brand-400/30",
    },
    {
      icon: Award,
      value: "ISSA USA",
      label: "Certified Nutritionist",
      sub: "Scientific Accreditation",
      color: "text-gold-400",
      bg: "bg-gold-400/15 border-gold-400/30",
    },
    {
      icon: TrendingDown,
      value: "100,000+ KG",
      label: "Total Fat Reduced",
      sub: "Documented Success",
      color: "text-teal-400",
      bg: "bg-teal-400/15 border-teal-400/30",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-3xl flex items-center gap-4 border border-white/10 hover:border-brand-400/40 transition-all duration-300 group"
            >
              <div className={`p-3.5 rounded-2xl ${item.bg} border shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xl sm:text-3xl font-black text-white tracking-tight font-heading truncate">
                  {item.value}
                </h4>
                <p className="text-xs font-bold text-slate-200 mt-0.5 truncate">{item.label}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
