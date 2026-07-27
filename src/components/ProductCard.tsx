import React from 'react';
import { Plus, Minus, Zap, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  quantityInCart: number;
  onUpdateQuantity: (delta: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  quantityInCart,
  onUpdateQuantity,
  onSelectProduct,
}) => {
  return (
    <div className="group bg-white rounded-2xl p-3 flex flex-col justify-between border border-slate-200/80 hover:border-purple-300 hover:shadow-xl transition-all duration-200 relative overflow-hidden">
      {/* Top Badges: Express Time & Discount */}
      <div className="flex items-center justify-between w-full absolute top-2.5 left-0 px-2.5 z-10 pointer-events-none">
        {product.isExpress && (
          <span className="flex items-center gap-1 bg-[#1a0030]/90 text-emerald-400 font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm">
            <Zap className="w-3 h-3 fill-emerald-400" />
            {product.expressTime || '10 MINS'}
          </span>
        )}
        {product.discountPercent > 0 && (
          <span className="ml-auto bg-[#ff3269] text-white font-black text-[10px] px-1.5 py-0.5 rounded-md shadow-sm">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="cursor-pointer relative w-full pt-[85%] bg-slate-50/50 rounded-xl overflow-hidden mb-2 mt-4 group-hover:bg-purple-50/30 transition-colors"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.isBestseller && (
          <span className="absolute bottom-1 left-1 bg-amber-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
            Bestseller
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col">
        {/* Weight / Pack size */}
        <span className="text-[11px] font-semibold text-slate-400 mb-0.5">
          {product.weight}
        </span>

        {/* Product Name */}
        <h4
          onClick={() => onSelectProduct(product)}
          className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 cursor-pointer group-hover:text-purple-900 transition-colors leading-snug mb-2 min-h-[36px]"
        >
          {product.name}
        </h4>

        {/* Ratings if available */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] px-1.5 py-0.2 rounded border border-emerald-200">
              <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
              <span>{product.rating}</span>
            </div>
            {product.reviewCount && (
              <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* Footer: Price & Add Button */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-1 border-t border-slate-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Cart Stepper OR Add Button */}
          {quantityInCart === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-[#ff3269] hover:text-white hover:border-[#ff3269] font-black text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1"
            >
              <span>ADD</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center bg-[#ff3269] text-white font-extrabold text-xs rounded-xl overflow-hidden shadow-md">
              <button
                onClick={() => onUpdateQuantity(-1)}
                className="px-2 py-1.5 hover:bg-pink-700 transition-colors active:scale-90"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 min-w-[20px] text-center">{quantityInCart}</span>
              <button
                onClick={() => onUpdateQuantity(1)}
                className="px-2 py-1.5 hover:bg-pink-700 transition-colors active:scale-90"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
