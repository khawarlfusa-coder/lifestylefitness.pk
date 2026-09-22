"use client";

import React, { useState } from "react";
import { Article } from "@/data/mockData";
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";

interface ArticlesSectionProps {
  articles: Article[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="articles" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-brand-300 text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-brand-400" />
            Science-Backed Fitness & Diet Articles
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Nutritionist <span className="text-brand-400">Diet Guides & Recipes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Desi Pakistani diets, hormone balancing tips, aur superfoods par Khawar Khan ke tehqeeqi articles.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {articles.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-brand-300 border border-white/10">
                  {art.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {art.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-xs font-bold text-brand-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Read Full Scientific Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-3xl w-full p-6 sm:p-10 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-slate-400">
                Author: <strong className="text-white">Khawar Khan (ISSA USA Certified Nutritionist)</strong>
              </p>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
              <p className="text-base font-semibold text-white">
                {selectedArticle.excerpt}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  Key Nutritionist Takeaways:
                </h4>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Wazan kam karne ke liye kisi bhi food group ko mukammal chhorna nuqsaan deh ho sakta hai.</li>
                  <li>Insulin resistance kam karne ke liye subha Matcha Tea aur khane se 20 minute pehle Chia Seeds water zaroori hai.</li>
                  <li>Har shakhs ka metabolism mukhtalif hota hai, is liye individualized diet plan sab se taiz nataij deta hai.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Share on WhatsApp or Socials</span>
              <a
                href="https://wa.me/923000000000?text=Khawar%20Khan,%20I%20read%20your%20article%20and%20want%20to%20know%20more"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-brand-500 text-dark-900 font-bold text-xs"
              >
                Discuss with Khawar
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
