"use client";

import React, { useState } from "react";
import { VideoItem, Article, Product } from "@/data/mockData";
import { 
  Lock, 
  MessageSquare, 
  Video, 
  FileText, 
  ShoppingBag, 
  Send, 
  Plus, 
  CheckCircle, 
  X, 
  ShieldCheck,
  Tv
} from "lucide-react";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplyToChat: (replyText: string, requireRewardedAd: boolean) => void;
  onAddVideo: (video: VideoItem) => void;
  onAddArticle: (article: Article) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onReplyToChat,
  onAddVideo,
  onAddArticle,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "video" | "article">("chat");

  // Chat reply state
  const [replyText, setReplyText] = useState("");
  const [requireAd, setRequireAd] = useState(true);
  const [replySentSuccess, setReplySentSuccess] = useState(false);

  // New Video Form
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCategory, setVideoCategory] = useState<VideoItem["category"]>("Weight Loss");
  const [youtubeId, setYoutubeId] = useState("");
  const [videoDuration, setVideoDuration] = useState("12:30");
  const [videoSuccess, setVideoSuccess] = useState(false);

  // New Article Form
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("Nutrition Science");
  const [articleExcerpt, setArticleExcerpt] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleSuccess, setArticleSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "khawar123" || password === "admin") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Ghalat password! (Default password: khawar123)");
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onReplyToChat(replyText.trim(), requireAd);
    setReplyText("");
    setReplySentSuccess(true);
    setTimeout(() => setReplySentSuccess(false), 3000);
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle || !youtubeId) return;

    const newVid: VideoItem = {
      id: "v-" + Date.now(),
      title: videoTitle,
      category: videoCategory,
      youtubeId: youtubeId.includes("v=") ? youtubeId.split("v=")[1]?.substring(0, 11) : youtubeId,
      duration: videoDuration,
      views: "1.2K views",
      thumbnail: `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800`
    };

    onAddVideo(newVid);
    setVideoTitle("");
    setYoutubeId("");
    setVideoSuccess(true);
    setTimeout(() => setVideoSuccess(false), 3000);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle || !articleExcerpt) return;

    const newArt: Article = {
      id: "art-" + Date.now(),
      title: articleTitle,
      category: articleCategory,
      readTime: "4 min read",
      date: "Sep 2026",
      excerpt: articleExcerpt,
      content: articleContent || articleExcerpt,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
    };

    onAddArticle(newArt);
    setArticleTitle("");
    setArticleExcerpt("");
    setArticleContent("");
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              Khawar Khan Admin CMS Portal
              <ShieldCheck className="w-5 h-5 text-brand-400" />
            </h2>
            <p className="text-xs text-slate-400">
              Manage client consultation replies, post videos, and publish nutrition articles.
            </p>
          </div>
        </div>

        {/* Authentication Form */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto py-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Security Password
              </label>
              <input
                type="password"
                placeholder="Enter password (default: khawar123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              />
              {errorMsg && <p className="text-xs text-rose-400 mt-1">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-900 font-bold text-sm shadow-lg shadow-brand-500/20"
            >
              Login to Admin Portal
            </button>
            <p className="text-[11px] text-center text-slate-500">Default password: khawar123</p>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Admin Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "chat" ? "bg-brand-500 text-dark-900" : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Client Consultations & Replies</span>
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "video" ? "bg-brand-500 text-dark-900" : "text-slate-400 hover:text-white"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Add YouTube Video</span>
              </button>

              <button
                onClick={() => setActiveTab("article")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "article" ? "bg-brand-500 text-dark-900" : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Post Diet Article</span>
              </button>
            </div>

            {/* --- TAB 1: REPLY TO CHAT WITH REWARDED AD --- */}
            {activeTab === "chat" && (
              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Live Consultation Inbox</span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Channel
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Aap jo bhi message likhenge wo user ki chat screen par deliver hoga.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Khawar Khan's Personalized Nutritionist Reply:
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="e.g. Aap subha nihar munh 1 cup garam pani me 1 tsp Matcha Green Tea shamil karein. Roti ko 1 par limit karein aur sham ko chia seed drink lein..."
                    className="w-full bg-slate-800 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Rewarded Ad Lock Checkbox */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <Tv className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Require Rewarded Video Ad to View Message</p>
                      <p className="text-[11px] text-slate-400">
                        User ko message parhne se pehle 15 second ka sponsor reward ad dekhna hoga.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireAd}
                    onChange={(e) => setRequireAd(e.target.checked)}
                    className="w-5 h-5 accent-brand-500 cursor-pointer"
                  />
                </div>

                {replySentSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-brand-500 text-brand-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Reply user ki chat me kamyabi se send ho gaya (Reward Ad Protected)!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-900 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Reply to User</span>
                </button>
              </form>
            )}

            {/* --- TAB 2: ADD YOUTUBE VIDEO --- */}
            {activeTab === "video" && (
              <form onSubmit={handleCreateVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Video Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Desi Foods Jo Belly Fat Barhate Hain"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Video ID / URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. vBsqiY7t_C4"
                      value={youtubeId}
                      onChange={(e) => setYoutubeId(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value as any)}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Keto & Fasting">Keto & Fasting</option>
                      <option value="Belly Fat">Belly Fat</option>
                      <option value="Diet Mistakes">Diet Mistakes</option>
                      <option value="Workout">Workout</option>
                    </select>
                  </div>
                </div>

                {videoSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-brand-500 text-brand-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Naya video library me shamil ho gaya!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-900 font-black text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Video to Website</span>
                </button>
              </form>
            )}

            {/* --- TAB 3: POST DIET ARTICLE --- */}
            {activeTab === "article" && (
              <form onSubmit={handleCreateArticle} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Intermittent Fasting Me Chia Seeds Ka Istemal"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Short Excerpt (Summary)</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief 1-2 sentence preview"
                    value={articleExcerpt}
                    onChange={(e) => setArticleExcerpt(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Content</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed scientific article content..."
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {articleSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-brand-500 text-brand-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Article successfully published!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-900 font-black text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
