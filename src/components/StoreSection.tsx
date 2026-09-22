"use client";

import React, { useState } from "react";
import { Product, PRODUCTS } from "@/data/mockData";
import { 
  ShoppingBag, 
  Check, 
  Star, 
  ShieldCheck, 
  Flame, 
  Truck, 
  Phone, 
  Info,
  X,
  Sparkles,
  Zap
} from "lucide-react";

interface StoreSectionProps {
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ onAddToCart, onDirectOrder }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section id="store" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-400/15 border border-brand-400/30 text-brand-300 text-xs font-black mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-brand-400" />
            100% Authentic Superfoods & Diet Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Official <span className="text-gradient-emerald">Superfood & Diet Store</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Khawar Khan ke certified Japanese Matcha, Chia Seeds, Camu Camu aur personalized diet plans. Cash on Delivery (COD) ya direct WhatsApp (+92 318 2112122) par order karein.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-dark-950 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all font-heading ${
              filter === "all" ? "bg-brand-400 text-dark-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter("superfood")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all font-heading ${
              filter === "superfood" ? "bg-brand-400 text-dark-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Superfoods
          </button>
          <button
            onClick={() => setFilter("diet_plan")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all font-heading ${
              filter === "diet_plan" ? "bg-brand-400 text-dark-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Diet Plans
          </button>
          <button
            onClick={() => setFilter("ebook")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all font-heading ${
              filter === "ebook" ? "bg-brand-400 text-dark-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Recipe Book
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group glass-card rounded-[28px] overflow-hidden border border-white/10 hover:border-brand-400/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                {product.badge && (
                  <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-brand-400 to-emerald-400 text-dark-950 text-[11px] font-black px-3 py-1 rounded-full shadow-xl font-heading tracking-wide">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-3.5 right-3.5 bg-dark-950/85 backdrop-blur-md text-gold-400 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>4.9 (ISSA USA)</span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-white bg-dark-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Truck className="w-3.5 h-3.5" /> Cash on Delivery (All Pakistan)
                  </span>
                  <span className="text-slate-400 font-semibold">Stock: {product.stock}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-black text-white group-hover:text-brand-300 transition-colors leading-snug font-heading">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Key Features */}
                <div className="space-y-2 pt-2">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-md bg-brand-400/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="p-6 pt-0 space-y-4">
              <div className="flex items-baseline justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-heading">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 line-through ml-2 font-semibold">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-xs text-brand-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" /> Details
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onAddToCart(product)}
                  className="py-3 px-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-white font-black text-xs border border-white/10 hover:border-brand-400/40 transition-all flex items-center justify-center gap-1.5 font-heading"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-400" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => onDirectOrder(product)}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 font-heading"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>WhatsApp Order</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-dark-900 border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-5 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-20 h-20 rounded-2xl object-cover border border-white/10"
              />
              <div>
                <span className="text-xs font-black text-brand-400 uppercase tracking-wider font-heading">
                  {selectedProduct.category.replace("_", " ")}
                </span>
                <h3 className="text-2xl font-black text-white font-heading">{selectedProduct.name}</h3>
                <p className="text-lg font-black text-brand-400 font-heading">
                  Rs. {selectedProduct.price.toLocaleString()}{" "}
                  <span className="text-xs text-slate-500 line-through">
                    Rs. {selectedProduct.originalPrice.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Doctor's Product Description:</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certified Benefits:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProduct.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-800/80 border border-white/5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-brand-400 shrink-0 stroke-[3]" />
                    <span className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-brand-400/30 text-xs text-emerald-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-brand-400 shrink-0" />
              <span>ISSA USA Standard: Pure organic grade with zero added chemicals, artificial flavors or fillers.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-white font-bold text-sm border border-white/10"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  onDirectOrder(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 font-heading"
              >
                <Phone className="w-4 h-4" />
                <span>Order on WhatsApp (+92 318 2112122)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
