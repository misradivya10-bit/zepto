import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  ShoppingBag,
  User,
  Zap,
  Sparkles,
  Coffee,
  Apple,
  Milk,
  Cookie,
  CupSoda,
  UtensilsCrossed,
  Candy,
  Wheat,
  SlidersHorizontal,
} from 'lucide-react';
import { Location, CartItem } from '../types';
import { CATEGORIES } from '../data/mockData';

interface HeaderProps {
  currentLocation: Location;
  onOpenLocationModal: () => void;
  onOpenSearchModal: () => void;
  onOpenCartDrawer: () => void;
  onOpenAccountModal: () => void;
  cartItems: CartItem[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenSearchModal,
  onOpenCartDrawer,
  onOpenAccountModal,
  cartItems,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);

  const placeholders = [
    "Search 'milk'",
    "Search 'fresh mangoes'",
    "Search 'iced coffee'",
    "Search 'Lay's magic masala'",
    "Search 'paneer'",
    "Search 'butter croissant'",
    "Search 'chocolates'",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-40 bg-[#2b004a] text-white shadow-xl">
      {/* Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Delivery Time Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-1.5 focus:outline-none group"
            >
              <div className="relative">
                <span className="text-3xl font-black tracking-tight text-white font-sans lowercase group-hover:text-pink-400 transition-colors">
                  zepto
                </span>
                <span className="absolute -top-1 -right-2 text-[10px] font-black bg-[#ff3269] text-white px-1.5 py-0.2 rounded-full uppercase">
                  10m
                </span>
              </div>
            </button>

            {/* Delivery Timer Badge */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1a0030] border border-purple-800/80 px-2.5 py-1 rounded-full text-xs font-black">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
              <span className="text-emerald-400">10 MINS</span>
            </div>
          </div>

          {/* Location Selector */}
          <button
            onClick={onOpenLocationModal}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/10 text-left border border-purple-800/60 max-w-[260px] transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-100">
                <span>{currentLocation.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
              </div>
              <p className="text-[11px] text-purple-200 truncate">
                {currentLocation.address}
              </p>
            </div>
          </button>

          {/* Search Trigger Bar */}
          <div className="flex-1 max-w-xl mx-2">
            <button
              onClick={onOpenSearchModal}
              className="w-full flex items-center justify-between px-4 py-3 bg-white text-slate-800 rounded-2xl shadow-inner hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-slate-500 transition-all">
                  {placeholders[searchPlaceholderIndex]}
                </span>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md">
                SEARCH
              </span>
            </button>
          </div>

          {/* Right Action Icons: Zepto Pass, Account & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Zepto Pass Badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 rounded-xl text-xs font-extrabold text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zepto Pass</span>
            </div>

            {/* Account / Profile Button */}
            <button
              onClick={onOpenAccountModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={onOpenCartDrawer}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md ${
                totalCartCount > 0
                  ? 'bg-[#ff3269] hover:bg-pink-600 text-white animate-glow'
                  : 'bg-purple-900/80 hover:bg-purple-800 text-white'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-pink-600 w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span>My Cart</span>
              {totalCartPrice > 0 && (
                <span className="bg-black/20 px-2 py-0.5 rounded-md font-extrabold">
                  ₹{totalCartPrice}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Sub-Header */}
      <div className="bg-[#1c0033] border-t border-purple-900/60 overflow-x-auto no-scrollbar py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#ff3269] text-white shadow-md'
                : 'text-purple-200 hover:bg-white/10'
            }`}
          >
            All Categories
          </button>

          {/* Zepto Cafe highlighted shortcut */}
          <button
            onClick={() => onSelectCategory('zepto-cafe')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
              selectedCategory === 'zepto-cafe'
                ? 'bg-[#ff3269] text-white border-pink-400'
                : 'bg-purple-900/60 text-amber-300 border-amber-400/40 hover:bg-purple-800'
            }`}
          >
            <Coffee className="w-4 h-4 text-amber-300" />
            <span>Zepto Cafe ☕</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#ff3269] text-white shadow-md'
                  : 'text-purple-200 hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
