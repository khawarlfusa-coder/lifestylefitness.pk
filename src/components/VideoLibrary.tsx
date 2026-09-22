"use client";

import React, { useState } from "react";
import { VIDEOS, VideoItem } from "@/data/mockData";
import { Play, Youtube, Eye, Clock, CheckCircle2, X } from "lucide-react";

export const VideoLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const categories = ["All", "Weight Loss", "Keto & Fasting", "Belly Fat", "Diet Mistakes", "Workout", "Nutrition Tips"];

  const filteredVideos = selectedCategory === "All"
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <section id="videos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-black mb-3">
            <Youtube className="w-3.5 h-3.5 fill-red-500" />
            Official 317K+ YouTube Channel Videos
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Khawar Khan's <span className="text-brand-400">Weight Loss Video Vault</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Lifestyle Fitness PK YouTube channel ke authentic videos aur thumbnails. Yahan se direct watch karein ya topic search karein.
          </p>
        </div>

        {/* YouTube Channel Subscribe Button with Channel Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/25 hidden sm:block">
            <img
              src="/images/lf-logo.png"
              alt="Lifestyle Fitness Channel"
              className="w-full h-full object-cover rounded-full bg-black"
            />
          </div>
          <a
            href="https://www.youtube.com/@Lifestylefitnesspk?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-xl shadow-red-600/35 transition-all hover:scale-105 font-heading"
          >
            <Youtube className="w-5 h-5 fill-white" />
            <span>Subscribe (317K Subs)</span>
          </a>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all font-heading ${
              selectedCategory === cat
                ? "bg-brand-400 text-dark-950 shadow-lg shadow-brand-400/25"
                : "bg-dark-850/80 text-slate-300 hover:text-white hover:bg-dark-800 border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group glass-card rounded-[28px] overflow-hidden border border-white/10 hover:border-brand-400/50 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            {/* Thumbnail Box */}
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  onError={(e) => {
                    // Fallback to hqdefault if maxres not available
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-brand-400/90 text-dark-950 flex items-center justify-center shadow-xl shadow-brand-400/40 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-dark-950 ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-dark-950/90 px-2.5 py-1 rounded-lg text-[11px] font-black text-white flex items-center gap-1 backdrop-blur-sm border border-white/10 font-mono">
                  <Clock className="w-3 h-3 text-brand-400" />
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-dark-950/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black text-brand-300 backdrop-blur-sm font-heading">
                  {video.category}
                </div>
              </div>

              {/* Video Meta */}
              <div className="p-6 space-y-3">
                <h3 className="text-base font-black text-white group-hover:text-brand-300 transition-colors line-clamp-2 leading-snug font-heading">
                  {video.title}
                </h3>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1 text-brand-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lifestyle Fitness PK</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-dark-900 border border-white/15 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-950">
              <div className="flex items-center gap-2.5">
                <Youtube className="w-5 h-5 text-red-500 fill-red-500" />
                <h4 className="text-sm sm:text-base font-black text-white line-clamp-1 font-heading">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-xl bg-dark-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-dark-950">
              <div>
                <p className="text-xs text-slate-300">Speaker: <strong className="text-white font-heading">Khawar Khan (ISSA USA)</strong></p>
                <p className="text-xs text-brand-400 font-semibold">{activeVideo.category} • {activeVideo.views}</p>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black flex items-center gap-2 font-heading"
              >
                <Youtube className="w-4 h-4 fill-white" /> Open on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
