"use client";

import React, { useState } from "react";
import { Product, Order } from "@/data/mockData";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Phone, 
  CheckCircle, 
  Truck,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder?: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
}) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [placedOrderDetails, setPlacedOrderDetails] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 4000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shippingFee;

  const handleWhatsAppCheckout = () => {
    const orderId = "LF-" + Math.floor(1000 + Math.random() * 9000);
    
    const newOrder: Order = {
      id: orderId,
      customerName: name || "WhatsApp Customer",
      phone: phone || "Direct WhatsApp",
      city: city || "Pakistan",
      address: address || "Shared via WhatsApp",
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      shippingFee,
      total,
      paymentMethod: "WhatsApp Order",
      status: "Confirmed",
      createdAt: "Just now"
    };

    if (onPlaceOrder) onPlaceOrder(newOrder);

    let message = `Assalam o Alaikum Khawar Khan (+92 318 2112122)!\nMujhe Lifestyle Fitness PK store se order karna hai:\n`;
    message += `Order Reference: ${orderId}\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} x ${item.quantity} = Rs. ${(item.product.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\nSubtotal: Rs. ${subtotal.toLocaleString()}`;
    message += `\nDelivery: ${shippingFee === 0 ? "FREE" : "Rs. 250"}`;
    message += `\nTotal: Rs. ${total.toLocaleString()}`;
    if (name) message += `\n\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nAddress: ${address}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923182112122?text=${encoded}`, "_blank");
  };

  const handleCODSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Baraye meherbani apna name, phone number aur delivery address mukammal enter karein.");
      return;
    }

    const orderId = "LF-" + Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: orderId,
      customerName: name,
      phone: phone,
      city: city || "Pakistan",
      address: address,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      shippingFee,
      total,
      paymentMethod: "Cash on Delivery (COD)",
      status: "Pending",
      createdAt: "Just now"
    };

    if (onPlaceOrder) onPlaceOrder(newOrder);
    setPlacedOrderDetails(newOrder);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-dark-900 border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-dark-950">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-400/20 text-brand-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white font-heading">
                  Your Cart {placedOrderDetails ? "(Completed)" : `(${items.length})`}
                </h2>
                <p className="text-[11px] text-slate-400">Cash on Delivery & WhatsApp</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {placedOrderDetails ? (
              /* Order Confirmation Card with direct WhatsApp copy button */
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-brand-400/20 text-brand-400 mx-auto flex items-center justify-center border border-brand-400/30">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white font-heading">Shukriya! Order Received</h3>
                  <div className="inline-block px-3 py-1 bg-dark-800 rounded-lg text-xs font-mono font-bold text-brand-400 border border-brand-400/30">
                    Order ID: {placedOrderDetails.id}
                  </div>
                </div>

                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Aapka Cash on Delivery order hamare system me darj ho chuka hai. Khawar Khan ki team 24 ghante ke andar verification ke liye rabta karegi.
                </p>

                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Customer:</span>
                    <strong className="text-white">{placedOrderDetails.customerName}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Phone:</span>
                    <strong className="text-white font-mono">{placedOrderDetails.phone}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>City:</span>
                    <strong className="text-white">{placedOrderDetails.city}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                    <span>Total COD Payable:</span>
                    <strong className="text-brand-400 font-heading text-sm">
                      Rs. {placedOrderDetails.total.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Direct WhatsApp receipt to Khawar Khan */}
                <a
                  href={`https://wa.me/923182112122?text=${encodeURIComponent(
                    `Assalam o Alaikum Khawar Khan (+92 318 2112122)!\nMaine Lifestyle Fitness website se Cash on Delivery order place kiya hai:\n\nOrder ID: ${placedOrderDetails.id}\nName: ${placedOrderDetails.customerName}\nPhone: ${placedOrderDetails.phone}\nCity: ${placedOrderDetails.city}\nAddress: ${placedOrderDetails.address}\n\nTotal Payable: Rs. ${placedOrderDetails.total.toLocaleString()}\n\nBaraye meherbani delivery process shuru karein.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all font-heading"
                >
                  <Phone className="w-4 h-4 fill-dark-950" />
                  <span>Send Order Copy to Khawar on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setPlacedOrderDetails(null);
                    setShowCheckoutForm(false);
                    onClose();
                  }}
                  className="text-xs text-slate-400 hover:text-white underline font-semibold"
                >
                  Close & Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 text-slate-500 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-dark-800 text-slate-600 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-300 font-heading">Aapki cart abhi khali hai</p>
                <p className="text-xs text-slate-500">Matcha tea, chia seeds ya customized diet plan shamil karein.</p>
              </div>
            ) : showCheckoutForm ? (
              <form onSubmit={handleCODSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="text-sm font-black text-white flex items-center gap-2 font-heading">
                    <Truck className="w-4 h-4 text-brand-400" />
                    Delivery Details (Cash on Delivery)
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="text-xs text-brand-400 hover:text-white underline font-semibold"
                  >
                    Back to Cart
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Poora Naam (Full Name)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ali Ahmed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Sheher (City)</label>
                  <input
                    type="text"
                    required
                    placeholder="Karachi / Lahore / Islamabad etc."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Ghar Ka Pata (Complete Address)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House number, Street, Area address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div className="p-3.5 bg-brand-400/10 rounded-2xl border border-brand-400/30 text-xs text-slate-200">
                  Total Payable on Delivery: <strong className="text-brand-400 font-bold font-heading text-sm ml-1">Rs. {total.toLocaleString()}</strong>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-sm shadow-lg shadow-brand-400/30 transition-all font-heading"
                >
                  Confirm Cash on Delivery Order
                </button>
              </form>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-dark-850/80 border border-white/5 flex gap-3 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-white truncate font-heading">{item.product.name}</h4>
                    <p className="text-xs font-black text-brand-400 font-heading">
                      Rs. {item.product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-dark-700 text-slate-300 hover:text-white flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-dark-700 text-slate-300 hover:text-white flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {!placedOrderDetails && items.length > 0 && !showCheckoutForm && (
            <div className="p-6 border-t border-white/10 bg-dark-950 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery (All Pakistan)</span>
                  <span className="text-emerald-400 font-bold">
                    {shippingFee === 0 ? "FREE" : "Rs. 250"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10 font-heading">
                  <span>Total Amount</span>
                  <span className="text-brand-400">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-dark-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-400/25 transition-all font-heading"
                >
                  <Truck className="w-4 h-4" />
                  <span>Order Cash on Delivery (COD)</span>
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all font-heading"
                >
                  <Phone className="w-4 h-4 fill-dark-950" />
                  <span>Order via WhatsApp (+92 318 2112122)</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                100% Genuine ISSA USA Guaranteed Formulation
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
