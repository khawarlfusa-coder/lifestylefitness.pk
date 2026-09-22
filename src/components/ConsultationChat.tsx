"use client";

import React, { useState, useEffect } from "react";
import { ChatMessage } from "@/data/mockData";
import { 
  MessageSquareText, 
  Send, 
  Lock, 
  Unlock, 
  Play, 
  Sparkles, 
  Phone, 
  CheckCheck, 
  Award, 
  User, 
  X,
  Volume2,
  Tv,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck
} from "lucide-react";
import confetti from "canvas-confetti";

interface ConsultationChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onUnlockMessage: (id: string) => void;
}

export const ConsultationChat: React.FC<ConsultationChatProps> = ({
  messages,
  onSendMessage,
  onUnlockMessage,
}) => {
  const KHAWAR_WHATSAPP = "923182112122";
  const KHAWAR_DISPLAY_PHONE = "+92 318 2112122";

  // Mode: "whatsapp" (Direct to phone) vs "web" (Rewarded Ad mode)
  const [chatMode, setChatMode] = useState<"whatsapp" | "web">("whatsapp");

  // Form State for WhatsApp Direct
  const [waName, setWaName] = useState("");
  const [waWeight, setWaWeight] = useState("");
  const [waGoal, setWaGoal] = useState("Lose 10 Kilo Belly Fat");
  const [waQuestion, setWaQuestion] = useState("");

  // In-App Web Chat State
  const [inputText, setInputText] = useState("");
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    isLoggedIn: boolean;
  }>({
    name: "Client",
    email: "",
    isLoggedIn: false,
  });

  // Rewarded Ad Modal State
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [pendingUnlockId, setPendingUnlockId] = useState<string | null>(null);
  const [adTimer, setAdTimer] = useState(15);
  const [adFinished, setAdFinished] = useState(false);

  // Trigger Direct WhatsApp Message to Khawar Khan
  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waQuestion.trim()) {
      alert("Baraye meherbani apna sawaal likhein.");
      return;
    }

    const message = 
      `Assalam o Alaikum Khawar Khan (ISSA USA Certified Nutritionist)!\n\n` +
      `*Mera Naam:* ${waName || "Client"}\n` +
      `*Mera Wazan:* ${waWeight ? waWeight + " kg" : "Not specified"}\n` +
      `*Mera Goal:* ${waGoal}\n\n` +
      `*Mera Sawaal / Consultation:*\n${waQuestion}\n\n` +
      `_Sent from Lifestyle Fitness PK Official Website_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${KHAWAR_WHATSAPP}?text=${encoded}`, "_blank");
  };

  // Google Login Simulation
  const handleGoogleLogin = () => {
    setUserProfile({
      name: "Ahmed Raza",
      email: "ahmed.raza@gmail.com",
      isLoggedIn: true,
    });
  };

  // Send message on Web
  const handleSendWeb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim());
    setInputText("");
  };

  // Rewarded Ad Timer
  const handleStartRewardAd = (msgId: string) => {
    setPendingUnlockId(msgId);
    setRewardModalOpen(true);
    setAdTimer(15);
    setAdFinished(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rewardModalOpen && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer((prev) => prev - 1);
      }, 1000);
    } else if (rewardModalOpen && adTimer === 0) {
      setAdFinished(true);
    }
    return () => clearInterval(interval);
  }, [rewardModalOpen, adTimer]);

  const handleClaimReward = () => {
    if (pendingUnlockId) {
      onUnlockMessage(pendingUnlockId);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    setRewardModalOpen(false);
    setPendingUnlockId(null);
  };

  return (
    <section id="chat" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-brand-400/30 text-brand-300 text-xs font-black mb-3">
          <MessageSquareText className="w-4 h-4 text-brand-400" />
          Direct 1-on-1 Consultation
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Ask <span className="text-gradient-emerald">Khawar Khan</span> Directly
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Aap apna sawaal seedha Khawar Khan ke **WhatsApp ({KHAWAR_DISPLAY_PHONE})** par bhej sakte hain ya website par poochein aur reply unlock karne ke liye sponsor video ad dekhein.
        </p>

        {/* Dual Mode Switcher */}
        <div className="flex items-center justify-center gap-2 mt-7 p-1.5 bg-dark-950 rounded-2xl border border-white/10 max-w-md mx-auto">
          <button
            onClick={() => setChatMode("whatsapp")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
              chatMode === "whatsapp"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Direct WhatsApp Phone</span>
          </button>
          
          <button
            onClick={() => setChatMode("web")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
              chatMode === "web"
                ? "bg-brand-400 text-dark-950 shadow-lg shadow-brand-400/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Website Ad Consultation</span>
          </button>
        </div>
      </div>

      {/* --- MODE 1: DIRECT WHATSAPP MESSAGE SENDER --- */}
      {chatMode === "whatsapp" && (
        <div className="glass-card rounded-[32px] p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Coach badge */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-dark-900/90 border border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src="/images/khawar-khan.png"
                  alt="Khawar Khan"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-black text-white font-heading">Khawar Khan</h4>
                    <span className="text-[10px] bg-brand-400/20 text-brand-300 px-1.5 py-0.2 rounded font-black border border-brand-400/30">
                      ISSA USA
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    WhatsApp: {KHAWAR_DISPLAY_PHONE}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-xs font-black text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                  Direct to Mobile Phone
                </span>
              </div>
            </div>

            {/* Direct Message Form */}
            <form onSubmit={handleSendToWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Aapka Naam (Your Name)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usman Ali"
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    className="w-full bg-dark-850 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400 placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Current Weight (KG)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 78"
                    value={waWeight}
                    onChange={(e) => setWaWeight(e.target.value)}
                    className="w-full bg-dark-850 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400 placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Aapka Fitness Goal Kya Hai?
                </label>
                <select
                  value={waGoal}
                  onChange={(e) => setWaGoal(e.target.value)}
                  className="w-full bg-dark-850 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400"
                >
                  <option value="Lose 10 Kilo Belly Fat">Lose 10 Kilo Stubborn Belly Fat</option>
                  <option value="Customized Diet Plan Inquiry">Customized 1-on-1 Diet Plan (30 Days)</option>
                  <option value="Matcha & Chia Seeds Usage">Matcha Green Tea & Chia Seeds Order / Usage</option>
                  <option value="PCOS / Thyroid Weight Loss">PCOS / Thyroid / Hormonal Fat Loss</option>
                  <option value="Muscle Gain & Lean Physique">Muscle Gain & Healthy Transformation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Apna Sawaal / Problem Detail Me Likhein:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Khawar bhai, mera wazan 80 kilo hai, office job hai aur pait barh raha hai. Mujhe konsi diet aur products shuru karni chahiye?"
                  value={waQuestion}
                  onChange={(e) => setWaQuestion(e.target.value)}
                  className="w-full bg-dark-850 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-brand-400 placeholder-slate-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <p leading-relaxed>
                  Jab aap button dabayenge to yeh mukammal sawaal format ho kar direct Khawar Khan ke WhatsApp <strong>({KHAWAR_DISPLAY_PHONE})</strong> par chala jaega. Wo aapko seedha WhatsApp par reply karenge!
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2.5 font-heading"
              >
                <Phone className="w-5 h-5" />
                <span>Send Sawaal to Khawar Khan's WhatsApp ({KHAWAR_DISPLAY_PHONE})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* --- MODE 2: IN-APP WEBSITE CONSULTATION & REWARDED AD --- */}
      {chatMode === "web" && (
        <div className="glass-card rounded-[32px] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[650px] bg-dark-900/95 animate-fadeIn">
          
          {/* Chat Top Bar */}
          <div className="p-4 bg-dark-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/khawar-khan.png"
                  alt="Khawar Khan"
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-400"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-400 rounded-full ring-2 ring-dark-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white font-heading">Khawar Khan</h3>
                  <span className="text-[10px] bg-brand-400/20 text-brand-300 px-1.5 py-0.2 rounded font-black border border-brand-400/30">
                    ISSA USA
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online Consultation & Rewarded Ad Unlocking
                </p>
              </div>
            </div>

            {/* Google Login Trigger */}
            <div>
              {userProfile.isLoggedIn ? (
                <div className="flex items-center gap-2 bg-dark-800 px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 flex items-center justify-center text-[10px] font-black">
                    G
                  </div>
                  <span className="hidden sm:inline font-bold">{userProfile.name}</span>
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shadow-md"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Google Sign-In</span>
                </button>
              )}
            </div>
          </div>

          {/* Message Thread List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isKhawar = msg.sender === "khawar";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isKhawar ? "justify-start" : "justify-end"}`}
                >
                  {isKhawar && (
                    <img
                      src="/images/khawar-khan.png"
                      alt="Khawar Khan"
                      className="w-8 h-8 rounded-full object-cover border border-brand-400 shrink-0 mt-1"
                    />
                  )}

                  <div className={`max-w-[85%] sm:max-w-md space-y-1.5`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                        isKhawar
                          ? "bg-dark-800 border border-white/10 text-white rounded-tl-sm"
                          : "bg-brand-500 text-dark-950 font-semibold rounded-tr-sm"
                      }`}
                    >
                      {/* Check if locked behind reward ad */}
                      {isKhawar && msg.isLocked && !msg.unlocked ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gold-400 font-bold text-xs">
                            <Lock className="w-4 h-4 text-gold-400" />
                            <span>Khawar Khan's Personalized Nutritionist Advice (Locked)</span>
                          </div>
                          <p className="text-xs text-slate-300 filter blur-sm select-none">
                            Aapke wazan aur routine ke mutabiq aapko subha khali pait Matcha tea aur dopahar me chia seeds lena chahiye...
                          </p>
                          <div className="pt-1">
                            <button
                              onClick={() => handleStartRewardAd(msg.id)}
                              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-dark-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-gold-400/20 transition-all hover:scale-[1.02] font-heading"
                            >
                              <Tv className="w-3.5 h-3.5" />
                              <span>Watch 15s Sponsor Video Ad to Unlock Reply</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                      <span>{msg.timestamp}</span>
                      {isKhawar && (
                        <span className="text-brand-400 font-bold flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5" /> ISSA USA Verified Advice
                        </span>
                      )}
                    </div>
                  </div>

                  {!isKhawar && (
                    <div className="w-8 h-8 rounded-full bg-brand-400/20 border border-brand-400/30 flex items-center justify-center text-brand-300 shrink-0 mt-1 font-bold">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Web Input Bar */}
          <div className="p-4 bg-dark-950 border-t border-white/10 space-y-3">
            <form onSubmit={handleSendWeb} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Apna sawaal likhein (e.g. Belly fat ke liye chia seeds aur matcha tea kaise use karein?)..."
                className="flex-1 bg-dark-850 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 transition-colors"
              />
              <button
                type="submit"
                className="p-3.5 rounded-2xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-bold shadow-lg shadow-brand-400/20 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">Replies are delivered here or directly to WhatsApp</span>
              <a
                href={`https://wa.me/${KHAWAR_WHATSAPP}?text=Assalam%20o%20Alaikum%20Khawar%20Khan`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-white font-bold flex items-center gap-1 underline"
              >
                <Phone className="w-3 h-3" />
                WhatsApp: {KHAWAR_DISPLAY_PHONE}
              </a>
            </div>
          </div>

        </div>
      )}

      {/* --- REWARDED VIDEO AD MODAL --- */}
      {rewardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-dark-900 border border-gold-400/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
            
            <div className="p-4 bg-dark-950 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gold-400 font-black font-heading">
                <Tv className="w-4 h-4" />
                <span>Sponsored Video Ad (Rewarded Ad)</span>
              </div>
              <div className="bg-dark-800 px-3 py-1 rounded-full text-slate-200 font-mono font-bold">
                {adTimer > 0 ? `Reward in ${adTimer}s` : "Reward Ready!"}
              </div>
            </div>

            {/* Video Ad Screen Simulation */}
            <div className="relative aspect-video w-full bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/70 via-dark-900 to-purple-950/70" />
              
              <div className="relative z-10 space-y-2.5">
                <img 
                  src="/images/matcha-tea.jpg" 
                  alt="Lifestyle Fitness Matcha Green Tea" 
                  className="w-16 h-16 rounded-2xl object-cover border border-brand-400/50 mx-auto shadow-xl"
                />
                <h4 className="text-base font-black text-white font-heading">Lifestyle Fitness Ceremonial Matcha</h4>
                <p className="text-xs text-slate-300 max-w-xs">
                  Boost your resting metabolism by 40% with 100% Ceremonial Grade Organic Matcha (50g).
                </p>
                <span className="inline-block text-[10px] font-black bg-gold-400 text-dark-950 px-2.5 py-0.5 rounded tracking-wide">
                  Google AdMob Partner Sponsor
                </span>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-dark-800">
                <div
                  className="h-full bg-gold-400 transition-all duration-1000"
                  style={{ width: `${((15 - adTimer) / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom Claim Action */}
            <div className="p-5 bg-dark-900 border-t border-white/10 text-center space-y-3">
              {adFinished ? (
                <button
                  onClick={handleClaimReward}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-400 to-emerald-400 text-dark-950 font-black text-sm shadow-xl shadow-brand-400/30 animate-bounce flex items-center justify-center gap-2 font-heading"
                >
                  <Unlock className="w-4 h-4 stroke-[3]" />
                  <span>Reward Granted! Unlock Khawar Khan's Advice</span>
                </button>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-slate-300">
                    Khawar Khan ka reply unlock karne ke liye ad poora dekhein...
                  </p>
                  <p className="text-[11px] text-gold-400 font-bold">
                    Reward unlocks automatically at 0 seconds.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
