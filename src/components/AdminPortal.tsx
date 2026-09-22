"use client";

import React, { useState } from "react";
import { VideoItem, Article, Order } from "@/data/mockData";
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
  Tv,
  Phone,
  Truck,
  Search,
  Check,
  Clock,
  PackageCheck,
  AlertCircle,
  ExternalLink,
  MapPin,
  Calendar
} from "lucide-react";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
  onReplyToChat: (replyText: string, requireRewardedAd: boolean) => void;
  onAddVideo: (video: VideoItem) => void;
  onAddArticle: (article: Article) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  onReplyToChat,
  onAddVideo,
  onAddArticle,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "chat" | "video" | "article">("orders");

  // Orders Filter & Search
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");

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
      thumbnail: `https://img.youtube.com/vi/${youtubeId.includes("v=") ? youtubeId.split("v=")[1]?.substring(0, 11) : youtubeId}/hqdefault.jpg`
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

  // Filtered orders list
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-dark-900 border border-white/15 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-dark-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-400/20 text-brand-400 flex items-center justify-center border border-brand-400/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white font-heading">
                  Khawar Khan Admin Dashboard
                </h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Customer Orders • WhatsApp Chat • Video Publishing • Articles
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-dark-800 text-slate-400 hover:text-white transition-colors"
            title="Close Admin Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAuthenticated ? (
            /* Login Screen */
            <div className="max-w-md mx-auto py-10 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 mx-auto flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white font-heading">Admin Verification</h3>
                <p className="text-xs text-slate-400">
                  Enter your credentials to manage incoming orders and consultation chat.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 bg-dark-850 p-6 rounded-3xl border border-white/10">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Username / ID
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

                <div className="p-3 bg-dark-900 rounded-xl border border-white/5 text-[11px] text-slate-400 space-y-1">
                  <p><strong>Direct Login Access:</strong></p>
                  <p>• Username: <span className="text-white font-mono">khawar</span></p>
                  <p>• Password: <span className="text-brand-400 font-mono font-bold">khawar123</span></p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm shadow-lg shadow-brand-400/20 transition-all font-heading"
                >
                  Unlock Admin Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Dashboard */
            <div className="space-y-6">
              
              {/* Top Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-dark-950 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all font-heading ${
                    activeTab === "orders" 
                      ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Customer Orders</span>
                  {pendingCount > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      activeTab === "orders" ? "bg-dark-950 text-white" : "bg-brand-400 text-dark-950"
                    }`}>
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all font-heading ${
                    activeTab === "chat" 
                      ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultations & Replies</span>
                </button>

                <button
                  onClick={() => setActiveTab("video")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all font-heading ${
                    activeTab === "video" 
                      ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Add Video</span>
                </button>

                <button
                  onClick={() => setActiveTab("article")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all font-heading ${
                    activeTab === "article" 
                      ? "bg-brand-400 text-dark-950 shadow-md shadow-brand-400/20" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Post Article</span>
                </button>
              </div>

              {/* --- TAB 1: CUSTOMER ORDERS (COD & WHATSAPP) --- */}
              {activeTab === "orders" && (
                <div className="space-y-5">
                  
                  {/* Revenue & Stats Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-1">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Orders</span>
                      <p className="text-2xl font-black text-white font-heading">{orders.length}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-dark-850 border border-brand-400/30 space-y-1">
                      <span className="text-[11px] text-brand-300 font-bold uppercase tracking-wider">Pending Confirmation</span>
                      <p className="text-2xl font-black text-brand-400 font-heading">{pendingCount} New</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-1">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Order Volume</span>
                      <p className="text-2xl font-black text-emerald-400 font-heading">Rs. {totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Filters & Search Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search name, phone, city, or ID..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-400"
                      />
                    </div>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                      {["All", "Pending", "Confirmed", "Dispatched", "Delivered"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setOrderStatusFilter(status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                            orderStatusFilter === status
                              ? "bg-white/15 text-white border border-brand-400/50"
                              : "bg-dark-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders Cards List */}
                  <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-16 bg-dark-850 rounded-3xl border border-white/10 space-y-2">
                        <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                        <p className="text-sm font-bold text-slate-300">Koi order nahi mila</p>
                        <p className="text-xs text-slate-500">Jab bhi koi customer order karega wo yahan dastyab hoga.</p>
                      </div>
                    ) : (
                      filteredOrders.map((order) => {
                        const cleanPhone = order.phone.replace(/[^0-9]/g, "");
                        const waPhone = cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone;
                        
                        return (
                          <div 
                            key={order.id} 
                            className="p-5 rounded-3xl bg-dark-850 border border-white/10 hover:border-brand-400/40 transition-all space-y-4 shadow-lg"
                          >
                            {/* Card Top: ID, Date, Status */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                              <div className="flex items-center gap-2.5">
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

                                <span className="text-xs font-bold text-slate-400 bg-dark-900 px-2.5 py-1 rounded-lg border border-white/5">
                                  {order.paymentMethod}
                                </span>
                              </div>
                            </div>

                            {/* Customer & Delivery Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5 text-xs">
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Customer Details</p>
                                <p className="text-sm font-black text-white font-heading">{order.customerName}</p>
                                <p className="text-slate-300 flex items-center gap-1.5 font-mono">
                                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                                  <span>{order.phone}</span>
                                </p>
                                <p className="text-slate-400 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                                  <span>{order.city}</span>
                                </p>
                              </div>

                              <div className="space-y-1.5 text-xs bg-dark-900/80 p-3 rounded-2xl border border-white/5">
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Delivery Address</p>
                                <p className="text-slate-200 leading-relaxed font-medium">
                                  {order.address}
                                </p>
                              </div>
                            </div>

                            {/* Ordered Items List */}
                            <div className="bg-dark-950/60 p-3.5 rounded-2xl border border-white/5 space-y-2">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ordered Products</p>
                              <div className="space-y-1.5 divide-y divide-white/5">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="pt-1.5 first:pt-0 flex items-center justify-between text-xs">
                                    <span className="text-white font-medium">
                                      {item.productName} <strong className="text-brand-300">× {item.quantity}</strong>
                                    </span>
                                    <span className="font-mono text-slate-300 font-bold">
                                      Rs. {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-black">
                                <span className="text-slate-300">Total COD Payable:</span>
                                <span className="text-brand-400 font-heading text-sm">
                                  Rs. {order.total.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons: Status Changer + WhatsApp Customer */}
                            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                              {/* Status Controls */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 font-medium">Change Status:</span>
                                <select
                                  value={order.status}
                                  onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                                  className="bg-dark-800 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-400 font-bold"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                              </div>

                              {/* 1-Click WhatsApp Customer Button */}
                              <a
                                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                                  `Assalam o Alaikum ${order.customerName}! Khawar Khan (ISSA USA Certified Nutritionist / Lifestyle Fitness PK) yahan.\n\nAapka order (${order.id}) Rs. ${order.total.toLocaleString()} hamare paas receive ho chuka hai. Delivery address:\n"${order.address}, ${order.city}".\n\nOrder dispatch confirm karne ke liye baraye meherbani reply karein.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs shadow-md transition-all font-heading"
                              >
                                <Phone className="w-3.5 h-3.5 fill-dark-950" />
                                <span>WhatsApp Customer Directly</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              )}

              {/* --- TAB 2: CONSULTATIONS & REPLIES --- */}
              {activeTab === "chat" && (
                <form onSubmit={handleSendReply} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-2">
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
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Khawar Khan's Personalized Nutritionist Reply:
                    </label>
                    <textarea
                      rows={4}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="e.g. Aap subha nihar munh 1 cup garam pani me 1 tsp Matcha Green Tea shamil karein. Roti ko 1 par limit karein aur sham ko chia seed drink lein..."
                      className="w-full bg-dark-800 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-400"
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
                      className="w-5 h-5 accent-brand-400 cursor-pointer"
                    />
                  </div>

                  {replySentSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-950 border border-brand-400 text-brand-300 text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Reply user ki chat me kamyabi se send ho gaya!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-400/20 font-heading"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Reply to User</span>
                  </button>
                </form>
              )}

              {/* --- TAB 3: ADD YOUTUBE VIDEO --- */}
              {activeTab === "video" && (
                <form onSubmit={handleCreateVideo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Video Title</label>
                    <input
                      type="text"
                      required
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
                        required
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
                      <span>Naya video library me shamil ho gaya!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm flex items-center justify-center gap-2 font-heading"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Video to Website</span>
                  </button>
                </form>
              )}

              {/* --- TAB 4: POST DIET ARTICLE --- */}
              {activeTab === "article" && (
                <form onSubmit={handleCreateArticle} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Intermittent Fasting Me Chia Seeds Ka Istemal"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Excerpt (Summary)</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief 1-2 sentence preview"
                      value={articleExcerpt}
                      onChange={(e) => setArticleExcerpt(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Detailed Content</label>
                    <textarea
                      rows={4}
                      placeholder="Detailed scientific article content..."
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
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm flex items-center justify-center gap-2 font-heading"
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
    </div>
  );
};
