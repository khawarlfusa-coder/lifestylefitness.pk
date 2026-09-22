"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Scale, 
  Flame, 
  Activity, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  TrendingDown,
  Phone
} from "lucide-react";

interface HealthCalculatorsProps {
  onConsultClick: () => void;
}

export const HealthCalculators: React.FC<HealthCalculatorsProps> = ({ onConsultClick }) => {
  const [activeTab, setActiveTab] = useState<"bmi" | "ideal" | "calorie">("bmi");

  // --- BMI State ---
  const [bmiGender, setBmiGender] = useState<"male" | "female">("male");
  const [bmiHeight, setBmiHeight] = useState<string>("170");
  const [bmiWeight, setBmiWeight] = useState<string>("75");
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    minHealthyWeight: number;
    maxHealthyWeight: number;
    advice: string;
  } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    if (!h || !w || h <= 0 || w <= 0) return;

    const bmi = parseFloat((w / (h * h)).toFixed(1));
    const minHealthy = parseFloat((18.5 * h * h).toFixed(1));
    const maxHealthy = parseFloat((24.9 * h * h).toFixed(1));

    let cat = "Normal Healthy Weight";
    let col = "text-emerald-400";
    let advice = "Aapka wazan ideal range me hai! Isko maintain rakhne ke liye protein rich diet aur daily walk jari rakhein.";

    if (bmi < 18.5) {
      cat = "Underweight";
      col = "text-sky-400";
      advice = "Aapka wazan kam hai. Healthy muscle mass barhane ke liye calorie surplus, nuts, eggs, aur peanut butter shamil karein.";
    } else if (bmi >= 25 && bmi < 29.9) {
      cat = "Overweight";
      col = "text-amber-400";
      advice = `Aapko taqreeban ${(w - maxHealthy).toFixed(1)} kilo wazan kam karne ki zaroorat hai. Matcha Green Tea, Chia Seeds aur 500 kcal deficit ka diet plan shuru karein.`;
    } else if (bmi >= 30) {
      cat = "Obese (High Risk)";
      col = "text-rose-400";
      advice = `Aapka wazan health risk zone me hai. Fatty liver aur insulin resistance se bachne ke liye foran Khawar Khan ka 1-on-1 Customized Diet Plan shuru karein.`;
    }

    setBmiResult({
      bmi,
      category: cat,
      color: col,
      minHealthyWeight: minHealthy,
      maxHealthyWeight: maxHealthy,
      advice
    });
  };

  // --- Ideal Weight State ---
  const [iwGender, setIwGender] = useState<"male" | "female">("male");
  const [iwHeightFeet, setIwHeightFeet] = useState<string>("5");
  const [iwHeightInches, setIwHeightInches] = useState<string>("8");
  const [iwFrame, setIwFrame] = useState<"small" | "medium" | "large">("medium");
  const [iwResult, setIwResult] = useState<{
    idealKg: number;
    idealLbs: number;
    rangeKg: string;
  } | null>(null);

  const calculateIdealWeight = () => {
    const feet = parseInt(iwHeightFeet) || 5;
    const inches = parseInt(iwHeightInches) || 0;
    const totalInches = feet * 12 + inches;
    const inchesOver5ft = Math.max(0, totalInches - 60);

    let baseKg = 0;
    if (iwGender === "male") {
      baseKg = 50 + 2.3 * inchesOver5ft;
    } else {
      baseKg = 45.5 + 2.3 * inchesOver5ft;
    }

    if (iwFrame === "small") baseKg *= 0.95;
    if (iwFrame === "large") baseKg *= 1.05;

    const finalKg = parseFloat(baseKg.toFixed(1));
    const finalLbs = parseFloat((finalKg * 2.20462).toFixed(1));
    const range = `${(finalKg - 3.5).toFixed(1)} kg - ${(finalKg + 3.5).toFixed(1)} kg`;

    setIwResult({
      idealKg: finalKg,
      idealLbs: finalLbs,
      rangeKg: range,
    });
  };

  // --- Calorie Meter State ---
  const [calAge, setCalAge] = useState<string>("28");
  const [calGender, setCalGender] = useState<"male" | "female">("female");
  const [calHeight, setCalHeight] = useState<string>("162");
  const [calWeight, setCalWeight] = useState<string>("68");
  const [calActivity, setCalActivity] = useState<string>("1.375");
  const [calResult, setCalResult] = useState<{
    bmr: number;
    tdee: number;
    mildDeficit: number;
    fatLossDeficit: number;
    proteinGrams: number;
    carbGrams: number;
    fatGrams: number;
  } | null>(null);

  const calculateCalories = () => {
    const age = parseInt(calAge) || 25;
    const weight = parseFloat(calWeight) || 70;
    const height = parseFloat(calHeight) || 165;
    const mult = parseFloat(calActivity) || 1.375;

    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (calGender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = Math.round(bmr * mult);
    const mild = Math.max(1200, tdee - 250);
    const fatLoss = Math.max(1200, tdee - 500);

    const proteinCal = fatLoss * 0.30;
    const carbCal = fatLoss * 0.40;
    const fatCal = fatLoss * 0.30;

    setCalResult({
      bmr: Math.round(bmr),
      tdee,
      mildDeficit: mild,
      fatLossDeficit: fatLoss,
      proteinGrams: Math.round(proteinCal / 4),
      carbGrams: Math.round(carbCal / 4),
      fatGrams: Math.round(fatCal / 9),
    });
  };

  const handleShareOnWhatsApp = (toolName: string, details: string) => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Khawar Khan (+92 318 2112122)!\nMaine aapki website par ${toolName} calculate kiya hai:\n\n${details}\n\nKya aap mujhe iske mutabiq personalized diet guide kar sakte hain?`
    );
    window.open(`https://wa.me/923182112122?text=${text}`, "_blank");
  };

  return (
    <section id="calculators" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-400/15 border border-brand-400/30 text-brand-300 text-xs font-black mb-3">
          <Activity className="w-4 h-4 text-brand-400" />
          Scientifically Validated Health Tools
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Interactive <span className="text-gradient-emerald">Health & Calorie Suite</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Apna body mass index (BMI), ideal wazan, aur wazan kam karne ke liye daily calories ka accurate hisab lagayein aur WhatsApp par discuss karein.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-dark-950 rounded-2xl border border-white/10 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("bmi")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
              activeTab === "bmi"
                ? "bg-brand-400 text-dark-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>BMI Check</span>
          </button>
          <button
            onClick={() => setActiveTab("ideal")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
              activeTab === "ideal"
                ? "bg-brand-400 text-dark-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Ideal Weight</span>
          </button>
          <button
            onClick={() => setActiveTab("calorie")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all font-heading ${
              activeTab === "calorie"
                ? "bg-brand-400 text-dark-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Calorie Meter</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: BMI CALCULATOR --- */}
      {activeTab === "bmi" && (
        <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-5">
              <h3 className="text-2xl font-black text-white flex items-center gap-2 font-heading">
                <Activity className="w-5 h-5 text-brand-400" />
                BMI Calculator
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBmiGender("male")}
                    className={`py-2.5 rounded-xl text-xs font-black border transition-all ${
                      bmiGender === "male"
                        ? "bg-brand-400/20 border-brand-400 text-brand-300"
                        : "bg-dark-800 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Male (Mard)
                  </button>
                  <button
                    onClick={() => setBmiGender("female")}
                    className={`py-2.5 rounded-xl text-xs font-black border transition-all ${
                      bmiGender === "female"
                        ? "bg-brand-400/20 border-brand-400 text-brand-300"
                        : "bg-dark-800 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Female (Khatoon)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-bold">
                  <span>Height (Qadd)</span>
                  <span className="text-brand-400">{bmiHeight} cm ({((parseFloat(bmiHeight) || 0) / 30.48).toFixed(1)} ft)</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="215"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  className="w-full accent-brand-400 h-2 bg-dark-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-bold">
                  <span>Current Weight (Wazan)</span>
                  <span className="text-brand-400">{bmiWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  className="w-full accent-brand-400 h-2 bg-dark-800 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={calculateBMI}
                className="w-full py-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm shadow-lg shadow-brand-400/25 transition-all hover:scale-[1.01] font-heading"
              >
                Calculate My BMI
              </button>
            </div>

            {/* Result View */}
            <div className="md:col-span-6 flex flex-col justify-center bg-dark-950/80 p-6 sm:p-8 rounded-2xl border border-white/10">
              {bmiResult ? (
                <div className="space-y-4 text-center">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider font-heading">Your Body Mass Index</p>
                  
                  <div className="inline-block px-7 py-3.5 rounded-2xl bg-dark-900 border border-white/10">
                    <span className={`text-5xl font-black ${bmiResult.color} font-heading`}>
                      {bmiResult.bmi}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-semibold">kg/m²</span>
                  </div>

                  <p className={`text-xl font-black ${bmiResult.color} font-heading`}>
                    {bmiResult.category}
                  </p>

                  <div className="bg-dark-850 p-4 rounded-xl text-left border border-white/5 space-y-1">
                    <p className="text-xs text-slate-400">Ideal Wazan Target:</p>
                    <p className="text-sm font-black text-white font-heading">
                      {bmiResult.minHealthyWeight} kg — {bmiResult.maxHealthyWeight} kg
                    </p>
                  </div>

                  <div className="bg-emerald-950/50 border border-brand-400/30 p-4 rounded-xl text-left">
                    <p className="text-xs font-black text-brand-300 flex items-center gap-1.5 mb-1 font-heading">
                      <Info className="w-4 h-4 text-brand-400 shrink-0" />
                      Khawar Khan's Nutritionist Advice:
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {bmiResult.advice}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={onConsultClick}
                      className="py-3 px-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10"
                    >
                      <span>Custom Diet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <button
                      onClick={() => handleShareOnWhatsApp("BMI", `BMI Score: ${bmiResult.bmi} (${bmiResult.category}), Wazan: ${bmiWeight}kg, Height: ${bmiHeight}cm`)}
                      className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 font-heading"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Khawar</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-brand-400/15 text-brand-400 mx-auto flex items-center justify-center">
                    <Activity className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-black text-white font-heading">Check Your BMI Score</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Apna qadd aur wazan select karein aur calculate button daba kar apna accurate status dekhein.
                  </p>
                  <button
                    onClick={calculateBMI}
                    className="px-6 py-2.5 rounded-xl bg-brand-400 text-dark-950 text-xs font-black font-heading shadow-md"
                  >
                    Calculate Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: IDEAL WEIGHT CALCULATOR --- */}
      {activeTab === "ideal" && (
        <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-5">
              <h3 className="text-2xl font-black text-white flex items-center gap-2 font-heading">
                <Scale className="w-5 h-5 text-brand-400" />
                Ideal Body Weight (IBW)
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIwGender("male")}
                    className={`py-2.5 rounded-xl text-xs font-black border transition-all ${
                      iwGender === "male"
                        ? "bg-brand-400/20 border-brand-400 text-brand-300"
                        : "bg-dark-800 border-white/5 text-slate-400"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setIwGender("female")}
                    className={`py-2.5 rounded-xl text-xs font-black border transition-all ${
                      iwGender === "female"
                        ? "bg-brand-400/20 border-brand-400 text-brand-300"
                        : "bg-dark-800 border-white/5 text-slate-400"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Height (Feet & Inches)</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Feet</span>
                    <select
                      value={iwHeightFeet}
                      onChange={(e) => setIwHeightFeet(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                    >
                      {[4, 5, 6, 7].map((f) => (
                        <option key={f} value={f}>{f} Feet</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Inches</span>
                    <select
                      value={iwHeightInches}
                      onChange={(e) => setIwHeightInches(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                        <option key={i} value={i}>{i} Inches</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Body Frame (Haddi Ka Size)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["small", "medium", "large"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setIwFrame(f)}
                      className={`py-2 rounded-xl text-xs font-black capitalize border transition-all ${
                        iwFrame === f
                          ? "bg-brand-400/20 border-brand-400 text-brand-300"
                          : "bg-dark-800 border-white/5 text-slate-400"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculateIdealWeight}
                className="w-full py-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm shadow-lg shadow-brand-400/25 font-heading"
              >
                Calculate Ideal Target Weight
              </button>
            </div>

            {/* Results */}
            <div className="md:col-span-6 flex flex-col justify-center bg-dark-950/80 p-6 sm:p-8 rounded-2xl border border-white/10">
              {iwResult ? (
                <div className="space-y-4 text-center">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider font-heading">Aapka Accurate Target Wazan</p>
                  
                  <div className="p-6 rounded-2xl bg-dark-900 border border-white/10">
                    <span className="text-5xl font-black text-brand-400 font-heading">
                      {iwResult.idealKg}
                    </span>
                    <span className="text-lg text-slate-400 ml-2 font-black font-heading">KG</span>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">({iwResult.idealLbs} lbs)</p>
                  </div>

                  <div className="bg-dark-850 p-3.5 rounded-xl text-left border border-white/5">
                    <p className="text-xs text-slate-400">Recommended Healthy Range:</p>
                    <p className="text-sm font-black text-white font-heading">{iwResult.rangeKg}</p>
                  </div>

                  <button
                    onClick={() => handleShareOnWhatsApp("Ideal Weight", `Mera Ideal Target Wazan ${iwResult.idealKg} kg hai.`)}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 font-heading"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Khawar Khan (+92 318 2112122)</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-brand-400/15 text-brand-400 mx-auto flex items-center justify-center">
                    <Scale className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-black text-white font-heading">Hamwi & Devine Formula</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Apni height aur bone frame select karein taake doctor certified ideal wazan maloom ho sakay.
                  </p>
                  <button
                    onClick={calculateIdealWeight}
                    className="px-6 py-2.5 rounded-xl bg-brand-400 text-dark-950 text-xs font-black font-heading shadow-md"
                  >
                    Calculate Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: CALORIE METER & TDEE --- */}
      {activeTab === "calorie" && (
        <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-2xl font-black text-white flex items-center gap-2 font-heading">
                <Flame className="w-5 h-5 text-brand-400" />
                Daily Calorie Meter (TDEE)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Age (Umar)</label>
                  <input
                    type="number"
                    value={calAge}
                    onChange={(e) => setCalAge(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gender</label>
                  <select
                    value={calGender}
                    onChange={(e) => setCalGender(e.target.value as "male" | "female")}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-400"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={calHeight}
                    onChange={(e) => setCalHeight(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={calWeight}
                    onChange={(e) => setCalWeight(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Daily Activity Level</label>
                <select
                  value={calActivity}
                  onChange={(e) => setCalActivity(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-400"
                >
                  <option value="1.2">Sedentary (Little or no exercise, desk job)</option>
                  <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
                  <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
                  <option value="1.725">Very Active (Heavy workouts 6-7 days/week)</option>
                </select>
              </div>

              <button
                onClick={calculateCalories}
                className="w-full py-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm shadow-lg shadow-brand-400/25 font-heading"
              >
                Calculate Daily Calories & Macros
              </button>
            </div>

            {/* Calorie Results */}
            <div className="md:col-span-6 flex flex-col justify-center bg-dark-950/80 p-6 sm:p-8 rounded-2xl border border-white/10">
              {calResult ? (
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-white/10">
                    <p className="text-xs text-slate-400">Maintenance Calories:</p>
                    <p className="text-3xl font-black text-white font-heading">{calResult.tdee} kcal / din</p>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-brand-400/10 border border-brand-400/30 p-3.5 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-brand-300 font-heading">Fat Loss Target (-500 kcal)</p>
                        <p className="text-[11px] text-slate-400 font-medium">Safe 2 to 4 kilo fat loss monthly</p>
                      </div>
                      <span className="text-2xl font-black text-brand-400 font-heading">{calResult.fatLossDeficit} kcal</span>
                    </div>

                    <div className="bg-dark-850 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-300">Mild Deficit (-250 kcal)</p>
                        <p className="text-[11px] text-slate-500 font-medium">Slow fat loss</p>
                      </div>
                      <span className="text-base font-bold text-slate-300 font-heading">{calResult.mildDeficit} kcal</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black text-slate-400 mb-2 font-heading">Recommended Fat Loss Macros:</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-dark-850 p-2.5 rounded-xl border border-white/5">
                        <p className="text-[11px] font-black text-sky-400 font-heading">Protein</p>
                        <p className="text-lg font-black text-white font-heading">{calResult.proteinGrams}g</p>
                        <p className="text-[10px] text-slate-500">Eggs/Chicken</p>
                      </div>
                      <div className="bg-dark-850 p-2.5 rounded-xl border border-white/5">
                        <p className="text-[11px] font-black text-amber-400 font-heading">Carbs</p>
                        <p className="text-lg font-black text-white font-heading">{calResult.carbGrams}g</p>
                        <p className="text-[10px] text-slate-500">Roti/Chawal</p>
                      </div>
                      <div className="bg-dark-850 p-2.5 rounded-xl border border-white/5">
                        <p className="text-[11px] font-black text-teal-400 font-heading">Fats</p>
                        <p className="text-lg font-black text-white font-heading">{calResult.fatGrams}g</p>
                        <p className="text-[10px] text-slate-500">Chia/Nuts</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-brand-400/15 text-brand-400 mx-auto flex items-center justify-center">
                    <Flame className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-black text-white font-heading">Daily Calorie & Macro Meter</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Apni activity level aur umar enter karein taake exact calories aur protein ka target mil sake.
                  </p>
                  <button
                    onClick={calculateCalories}
                    className="px-6 py-2.5 rounded-xl bg-brand-400 text-dark-950 text-xs font-black font-heading shadow-md"
                  >
                    Calculate Calories
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
