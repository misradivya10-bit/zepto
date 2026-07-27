import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Category } from '../types';
import { Coffee, Apple, Milk, Cookie, CupSoda, UtensilsCrossed, Candy, Wheat, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-purple-700" />;
      case 'Apple': return <Apple className="w-5 h-5 text-emerald-700" />;
      case 'Milk': return <Milk className="w-5 h-5 text-blue-700" />;
      case 'Cookie': return <Cookie className="w-5 h-5 text-amber-700" />;
      case 'CupSoda': return <CupSoda className="w-5 h-5 text-red-700" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-orange-700" />;
      case 'Candy': return <Candy className="w-5 h-5 text-pink-700" />;
      case 'Wheat': return <Wheat className="w-5 h-5 text-yellow-800" />;
      default: return <Sparkles className="w-5 h-5 text-purple-700" />;
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">
            Explore Categories
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Superfast delivery of over 10,000+ daily products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between h-36 relative overflow-hidden ${
                isSelected
                  ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-600 shadow-md'
                  : 'border-slate-200/80 hover:border-purple-300 bg-white hover:shadow-lg'
              }`}
            >
              {/* Subtle tint background */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity"
                style={{ backgroundColor: cat.color }}
              />

              <div className="flex items-start justify-between relative z-10">
                <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-100 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat.iconName)}
                </div>
                {cat.id === 'zepto-cafe' && (
                  <span className="bg-[#ff3269] text-white font-black text-[9px] px-1.5 py-0.5 rounded-md uppercase">
                    HOT ☕
                  </span>
                )}
              </div>

              <div className="relative z-10 mt-auto">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-purple-900 transition-colors line-clamp-1">
                  {cat.name}
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {cat.itemCount}+ Items
                </p>
              </div>

              {/* Image thumbnail bottom-right */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300 pointer-events-none border-2 border-white shadow-xs"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
