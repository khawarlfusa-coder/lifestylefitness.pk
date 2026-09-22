"use client";

import React, { useState, useEffect } from "react";
import { 
  PRODUCTS, 
  VIDEOS, 
  ARTICLES, 
  INITIAL_CHAT, 
  INITIAL_ORDERS,
  Product, 
  VideoItem, 
  Article, 
  ChatMessage,
  Order 
} from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VideoLibrary } from "@/components/VideoLibrary";
import { HealthCalculators } from "@/components/HealthCalculators";
import { AIFoodScanner } from "@/components/AIFoodScanner";
import { StoreSection } from "@/components/StoreSection";
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import { ConsultationChat } from "@/components/ConsultationChat";
import { AdminPortal } from "@/components/AdminPortal";
import { ArticlesSection } from "@/components/ArticlesSection";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Phone } from "lucide-react";

export default function Home() {
  const KHAWAR_PHONE = "923182112122";
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Data states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [videoList, setVideoList] = useState<VideoItem[]>(VIDEOS);
  const [articleList, setArticleList] = useState<Article[]>(ARTICLES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Sync orders with localStorage
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

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem("lifestyle_orders", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status } : o));
      try {
        localStorage.setItem("lifestyle_orders", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectOrder = (product: Product) => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Khawar Khan (+92 318 2112122)! Mujhe "${product.name}" (Rs. ${product.price.toLocaleString()}) order karna hai. Baraye meherbani delivery aur payment details share karein.`
    );
    window.open(`https://wa.me/${KHAWAR_PHONE}?text=${text}`, "_blank");
  };

  // Chat & Rewarded Ad operations
  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated automated acknowledgement
    setTimeout(() => {
      const ackMsg: ChatMessage = {
        id: "msg-ack-" + Date.now(),
        sender: "khawar",
        text: "Shukriya aapka sawaal mil gaya hai! Khawar Khan is waqt online hain aur aapka personalized diet analysis jald hi yahan share karenge. Reply unlock karne ke liye sponsor video ad dastyab hoga.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLocked: false,
        unlocked: true,
      };
      setMessages((prev) => [...prev, ackMsg]);
    }, 1500);
  };

  const handleReplyFromAdmin = (replyText: string, requireRewardedAd: boolean) => {
    const newReply: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "khawar",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isLocked: requireRewardedAd,
      unlocked: !requireRewardedAd,
    };

    setMessages((prev) => [...prev, newReply]);
  };

  const handleUnlockMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unlocked: true } : m))
    );
  };

  const handleAddVideo = (video: VideoItem) => {
    setVideoList((prev) => [video, ...prev]);
  };

  const handleAddArticle = (article: Article) => {
    setArticleList((prev) => [article, ...prev]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-dark-900 relative selection:bg-brand-400 selection:text-dark-950">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Views Container */}
      {activeTab === "home" && (
        <>
          <Hero setActiveTab={setActiveTab} />
          <StatsBar />
          
          {/* Client Transformations Section */}
          <TestimonialsSection onConsultClick={() => setActiveTab("chat")} />

          {/* Superfood Store Section */}
          <div className="py-6">
            <StoreSection
              onAddToCart={handleAddToCart}
              onDirectOrder={handleDirectOrder}
            />
          </div>

          <HealthCalculators onConsultClick={() => setActiveTab("chat")} />
          <AIFoodScanner onAskKhawar={() => setActiveTab("chat")} />
          <VideoLibrary />
          <ArticlesSection articles={articleList} />
          <ConsultationChat
            messages={messages}
            onSendMessage={handleSendMessage}
            onUnlockMessage={handleUnlockMessage}
          />
        </>
      )}

      {activeTab === "transformations" && (
        <TestimonialsSection onConsultClick={() => setActiveTab("chat")} />
      )}

      {activeTab === "videos" && <VideoLibrary />}
      
      {activeTab === "calculators" && (
        <HealthCalculators onConsultClick={() => setActiveTab("chat")} />
      )}

      {activeTab === "ai-scanner" && (
        <AIFoodScanner onAskKhawar={() => setActiveTab("chat")} />
      )}

      {activeTab === "store" && (
        <StoreSection
          onAddToCart={handleAddToCart}
          onDirectOrder={handleDirectOrder}
        />
      )}

      {activeTab === "chat" && (
        <ConsultationChat
          messages={messages}
          onSendMessage={handleSendMessage}
          onUnlockMessage={handleUnlockMessage}
        />
      )}

      {activeTab === "articles" && <ArticlesSection articles={articleList} />}

      {/* Cart Drawer with onPlaceOrder hook */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Admin Portal Modal with Orders Management */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onReplyToChat={handleReplyFromAdmin}
        onAddVideo={handleAddVideo}
        onAddArticle={handleAddArticle}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${KHAWAR_PHONE}?text=Assalam%20o%20Alaikum%20Khawar%20Khan,%20I%20want%20to%20consult%20regarding%20weight%20loss`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-8 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-dark-950 shadow-2xl shadow-emerald-500/30 hover:scale-110 transition-all flex items-center justify-center group"
        title="Direct WhatsApp: +92 318 2112122"
      >
        <Phone className="w-6 h-6 fill-dark-950" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-black pl-0 group-hover:pl-2.5 font-heading text-dark-950">
          WhatsApp: +92 318 2112122
        </span>
      </a>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
      />

    </main>
  );
}
