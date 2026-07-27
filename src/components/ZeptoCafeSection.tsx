import React from 'react';
import { Coffee, Flame, Zap, Award, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ZeptoCafeSectionProps {
  cafeProducts: Product[];
  onAddToCart: (product: Product) => void;
  cartItemsCount: (productId: string) => number;
  onUpdateCartQuantity: (product: Product, delta: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ZeptoCafeSection: React.FC<ZeptoCafeSectionProps> = ({
  cafeProducts,
  onAddToCart,
  cartItemsCount,
  onUpdateCartQuantity,
  onSelectProduct,
}) => {
  return (
    <div className="mb-10 rounded-3xl bg-gradient-to-br from-[#20003b] via-[#3b0066] to-[#1a0030] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-purple-800">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-purple-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider mb-2">
            <Coffee className="w-3.5 h-3.5" />
            <span>Artisanal Cafe • Brewed Fresh</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            Zepto Cafe ☕🥐
          </h2>

          <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            Double shot espresso brews, cold frappes, warm croissants, and gourmet paninis delivered steaming hot or ice cold in 10 minutes!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-bold text-amber-300">
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Hot & Fresh Guarantee</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>8 MIN Express</span>
          </div>
        </div>
      </div>

      {/* Cafe Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cafeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            quantityInCart={cartItemsCount(product.id)}
            onUpdateQuantity={(delta) => onUpdateCartQuantity(product, delta)}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
