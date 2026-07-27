import React from 'react';
import { ShieldCheck, RefreshCw, Zap, Headphones } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#1a0030] text-purple-200 pt-12 pb-8 border-t border-purple-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-purple-950/60 rounded-3xl border border-purple-900/80">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-2xl shrink-0">
              <Zap className="w-6 h-6 fill-pink-400" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">10 Min Delivery</h5>
              <p className="text-xs text-purple-300">Nearest darkstore packing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">100% Quality</h5>
              <p className="text-xs text-purple-300">Farm fresh & certified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">Instant Refunds</h5>
              <p className="text-xs text-purple-300">Zero hassle return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">24/7 Support</h5>
              <p className="text-xs text-purple-300">Customer care on call</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-black text-white font-sans lowercase">
                zepto
              </span>
              <span className="text-[10px] font-black bg-[#ff3269] text-white px-1.5 py-0.2 rounded-full uppercase">
                10m
              </span>
            </div>
            <p className="text-xs text-purple-300 leading-relaxed">
              Zepto is India's fastest growing instant delivery service, bringing fresh fruits, vegetables, dairy, coffee, and daily groceries right to your doorstep in 10 minutes.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-extrabold text-sm text-white mb-3">Categories</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-pink-400 transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Categories */}
          <div>
            <h5 className="font-extrabold text-sm text-white mb-3">Popular Stores</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-pink-400 transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectCategory('zepto-cafe')}
                  className="text-amber-300 font-bold hover:underline"
                >
                  Zepto Cafe Specials ☕
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: App Download */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-sm text-white">Download App</h5>
            <p className="text-xs text-purple-300">
              Get the full Zepto experience with real-time darkstore tracking.
            </p>
            <div className="space-y-2">
              <div className="p-2.5 bg-white/10 hover:bg-white/20 border border-purple-800 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer transition-colors">
                <span> App Store</span>
              </div>
              <div className="p-2.5 bg-white/10 hover:bg-white/20 border border-purple-800 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer transition-colors">
                <span>▶ Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400 gap-4">
          <p>© 2026 Kiranakart Technologies Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">FSSAI Certified</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
