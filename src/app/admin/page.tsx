"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  INITIAL_ORDERS, 
  INITIAL_CHAT, 
  VIDEOS, 
  ARTICLES, 
  Order, 
  ChatMessage, 
  VideoItem, 
  Article 
} from "@/data/mockData";
import { 
  Lock, 
  ShoppingBag, 
  MessageSquare, 
  Video, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  MapPin, 
  Search, 
  Plus, 
  CheckCircle, 
  Send, 
  ExternalLink,
  ArrowLeft,
  Tv
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "chat" | "video" | "article">("orders");

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");

  // Chat State
  const [replyText, setReplyText] = useState("");
  const [requireAd, setRequireAd] = useState(true);
  const [replySentSuccess, setReplySentSuccess] = useState(false);

  // Video State
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCategory, setVideoCategory] = useState<VideoItem["category"]>("Weight Loss");
  const [youtubeId, setYoutubeId] = useState("");
  const [videoDuration, setVideoDuration] = useState("12:30");
  const [videoSuccess, setVideoSuccess] = useState(false);

  // Article State
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("Nutrition Science");
  const [articleExcerpt, setArticleExcerpt] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleSuccess, setArticleSuccess] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("lifestyle_orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (password === "khawar123" || password === "admin") ||
      (username.toLowerCase() === "khawar" && password === "khawar123")
    ) {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Ghalat password! Baraye meherbani 'khawar123' use karein.");
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem("lifestyle_orders", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch) ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.city.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 selection:bg-brand-400 selection:text-dark-950">
      
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-dark-900/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2.5 rounded-xl bg-dark-800 text-slate-400 hover:text-white border border-white/5 transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Website</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-md">
                <img
                  src="/images/lf-logo.png"
                  alt="Lifestyle Fitness"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-white font-heading">
                  Lifestyle Fitness PK • Admin CMS
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">Khawar Khan (ISSA USA Nutritionist)</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923182112122"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+92 318 2112122</span>
            </a>

            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-300 hover:text-rose-400 border border-white/5 text-xs font-bold transition-colors"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          /* Login Card */
          <div className="max-w-md mx-auto py-12 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-yellow-400/10">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-white font-heading">Admin Login</h2>
              <p className="text-xs text-slate-400">
                Log in to view incoming customer orders, manage diet consultation messages, and upload videos.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 bg-dark-900 p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  placeholder="khawar"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Security Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password (default: khawar123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400 font-medium"
                />
                {errorMsg && <p className="text-xs text-rose-400 mt-1.5">{errorMsg}</p>}
              </div>

              <div className="p-3.5 bg-dark-800/60 rounded-xl border border-white/5 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Default Access Details:</p>
                <p>• Login URL: <span className="text-brand-300 font-mono">/admin</span></p>
                <p>• Username: <span className="text-white font-mono">khawar</span></p>
                <p>• Password: <span className="text-brand-400 font-mono font-black">khawar123</span></p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm shadow-xl shadow-brand-400/20 transition-all font-heading"
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Container */
          <div className="space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-2 bg-dark-900 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
                  activeTab === "orders" 
                    ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Customer Orders</span>
                {pendingCount > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    activeTab === "orders" ? "bg-dark-950 text-white" : "bg-brand-400 text-dark-950"
                  }`}>
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
                  activeTab === "chat" 
                    ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultations</span>
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
                  activeTab === "video" 
                    ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Add YouTube Video</span>
              </button>

              <button
                onClick={() => setActiveTab("article")}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
                  activeTab === "article" 
                    ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Post Diet Article</span>
              </button>
            </div>

            {/* TAB 1: ORDERS DASHBOARD */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Received Orders</span>
                    <p className="text-3xl font-black text-white font-heading">{orders.length}</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-dark-900 border border-brand-400/30 space-y-1">
                    <span className="text-xs text-brand-300 font-bold uppercase tracking-wider">Pending Confirmation</span>
                    <p className="text-3xl font-black text-brand-400 font-heading">{pendingCount} Action Needed</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Order Revenue</span>
                    <p className="text-3xl font-black text-emerald-400 font-heading">Rs. {totalRevenue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search customer, phone, city, or ID..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-400"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                    {["All", "Pending", "Confirmed", "Dispatched", "Delivered"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                          orderStatusFilter === status
                            ? "bg-white/15 text-white border border-brand-400/50"
                            : "bg-dark-900 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-20 bg-dark-900 rounded-3xl border border-white/10 space-y-3">
                      <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="text-base font-bold text-slate-300">Koi order nahi mila</p>
                      <p className="text-xs text-slate-500">Jab customer website se checkout karega to order yahan show hoga.</p>
                    </div>
                  ) : (
                    filteredOrders.map((order) => {
                      const cleanPhone = order.phone.replace(/[^0-9]/g, "");
                      const waPhone = cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone;

                      return (
                        <div 
                          key={order.id}
                          className="p-6 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-400/40 transition-all space-y-4 shadow-xl"
                        >
                          {/* Top Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-white font-mono bg-dark-950 px-3 py-1 rounded-xl border border-white/10">
                                {order.id}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                {order.createdAt}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 ${
                                order.status === "Pending"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : order.status === "Confirmed"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : order.status === "Dispatched"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                <span>{order.status}</span>
                              </span>

                              <span className="text-xs font-bold text-slate-400 bg-dark-950 px-3 py-1 rounded-xl border border-white/5">
                                {order.paymentMethod}
                              </span>
                            </div>
                          </div>

                          {/* Customer & Address */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 text-xs">
                              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Customer Contact</p>
                              <p className="text-base font-black text-white font-heading">{order.customerName}</p>
                              <p className="text-slate-300 flex items-center gap-1.5 font-mono text-sm">
                                <Phone className="w-4 h-4 text-brand-400" />
                                <span>{order.phone}</span>
                              </p>
                              <p className="text-slate-400 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                                <span>{order.city}</span>
                              </p>
                            </div>

                            <div className="space-y-1.5 text-xs bg-dark-950/80 p-4 rounded-2xl border border-white/5">
                              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Complete Delivery Address</p>
                              <p className="text-slate-200 leading-relaxed font-medium">
                                {order.address}
                              </p>
                            </div>
                          </div>

                          {/* Products */}
                          <div className="bg-dark-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ordered Products</p>
                            <div className="space-y-2 divide-y divide-white/5">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                                  <span className="text-white font-semibold">
                                    {item.productName} <strong className="text-brand-300 ml-1">× {item.quantity}</strong>
                                  </span>
                                  <span className="font-mono text-slate-200 font-bold">
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-black">
                              <span className="text-slate-300">Total COD Amount:</span>
                              <span className="text-brand-400 font-heading text-base">
                                Rs. {order.total.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 font-medium">Update Status:</span>
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                                className="bg-dark-800 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-400 font-bold"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>

                            <a
                              href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                                `Assalam o Alaikum ${order.customerName}! Khawar Khan (ISSA USA Certified Nutritionist / Lifestyle Fitness PK) yahan.\n\nAapka order (${order.id}) Rs. ${order.total.toLocaleString()} hamare paas receive ho chuka hai. Delivery address:\n"${order.address}, ${order.city}".\n\nOrder dispatch confirm karne ke liye baraye meherbani reply karein.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all font-heading"
                            >
                              <Phone className="w-3.5 h-3.5 fill-dark-950" />
                              <span>WhatsApp Customer Directly</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: CHAT CONSULTATIONS */}
            {activeTab === "chat" && (
              <div className="bg-dark-900 p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-1">
                  <h3 className="text-sm font-bold text-white">Live Consultation Inbox</h3>
                  <p className="text-xs text-slate-400">
                    Aapka reply user ke screen par deliver hoga aur user 15-second reward video ad dekh kar reply parh sakega.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Nutritionist Reply Message
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="e.g. Assalam o Alaikum! Subha 1 pinch Lifestyle Fitness Matcha Green Tea garam pani me lein..."
                    className="w-full bg-dark-800 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <Tv className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Require Rewarded Ad</p>
                      <p className="text-[11px] text-slate-400">User must view 15s sponsor video ad to unlock reply.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireAd}
                    onChange={(e) => setRequireAd(e.target.checked)}
                    className="w-5 h-5 accent-brand-400 cursor-pointer"
                  />
                </div>

                {replySentSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-brand-400 text-brand-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Reply sent successfully!</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!replyText.trim()) return;
                    setReplySentSuccess(true);
                    setReplyText("");
                    setTimeout(() => setReplySentSuccess(false), 3000);
                  }}
                  className="w-full py-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-400/20 font-heading"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Reply to User</span>
                </button>
              </div>
            )}

            {/* TAB 3: ADD VIDEO */}
            {activeTab === "video" && (
              <div className="bg-dark-900 p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-black text-white font-heading">Add New YouTube Video</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Video Title</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Desi Foods Jo Belly Fat Barhate Hain"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">YouTube Video ID / URL</label>
                    <input
                      type="text"
                      placeholder="e.g. ULTwk4MqEoU"
                      value={youtubeId}
                      onChange={(e) => setYoutubeId(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
                    <select
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value as any)}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
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
                  <div className="p-3 rounded-xl bg-emerald-950 border border-brand-400 text-brand-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Video published to library!</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!videoTitle || !youtubeId) return;
                    setVideoSuccess(true);
                    setVideoTitle("");
                    setYoutubeId("");
                    setTimeout(() => setVideoSuccess(false), 3000);
                  }}
                  className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm flex items-center justify-center gap-2 font-heading"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Video</span>
                </button>
              </div>
            )}

            {/* TAB 4: POST ARTICLE */}
            {activeTab === "article" && (
              <div className="bg-dark-900 p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-black text-white font-heading">Post New Diet Article</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Article Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Intermittent Fasting Me Chia Seeds Ka Istemal"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Summary</label>
                  <input
                    type="text"
                    placeholder="Brief 1-2 sentence preview"
                    value={articleExcerpt}
                    onChange={(e) => setArticleExcerpt(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Content</label>
                  <textarea
                    rows={4}
                    placeholder="Full nutrition guidance article content..."
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                {articleSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-brand-400 text-brand-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Article successfully published!</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!articleTitle || !articleExcerpt) return;
                    setArticleSuccess(true);
                    setArticleTitle("");
                    setArticleExcerpt("");
                    setArticleContent("");
                    setTimeout(() => setArticleSuccess(false), 3000);
                  }}
                  className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm flex items-center justify-center gap-2 font-heading"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>
            )}

          </div>
        )}
      </main>

    </div>
  );
}
