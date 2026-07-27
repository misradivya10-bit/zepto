import React from 'react';
import { X, Zap, Star, ShieldCheck, Clock, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  quantityInCart: number;
  onUpdateQuantity: (delta: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  quantityInCart,
  onUpdateQuantity,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-4 px-6 bg-[#2b004a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              Delivering in {product.expressTime || '10 MINS'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image display */}
            <div className="relative bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center overflow-hidden">
              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#ff3269] text-white font-black text-xs px-2 py-1 rounded-lg">
                  {product.discountPercent}% OFF
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-center rounded-xl"
              />
            </div>

            {/* Details & CTA */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 leading-snug mt-1">
                  {product.name}
                </h2>
                <p className="text-sm font-semibold text-slate-400 mt-1">
                  Unit / Pack Size: <span className="text-slate-700">{product.weight}</span>
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ml-auto">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Add to Cart Stepper */}
              <div className="pt-2">
                {quantityInCart === 0 ? (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-3.5 bg-[#ff3269] hover:bg-pink-600 text-white font-extrabold rounded-2xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD TO CART • ₹{product.price}</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-[#ff3269] text-white rounded-2xl font-black shadow-md">
                    <span className="pl-4 text-xs">IN YOUR CART</span>
                    <div className="flex items-center gap-3 bg-white/20 px-3 py-1.5 rounded-xl">
                      <button
                        onClick={() => onUpdateQuantity(-1)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-base font-extrabold">{quantityInCart}</span>
                      <button
                        onClick={() => onUpdateQuantity(1)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 pt-2">
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Quality Assured</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Fresh Stock Picked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Specs */}
          {product.description && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Product Description</h4>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl">
                {product.description}
              </p>
            </div>
          )}

          {/* Nutrition info if available */}
          {product.nutritionInfo && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="font-bold text-slate-800 text-sm mb-3">Nutritional Information</h4>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                  <span className="block font-bold text-amber-900">{product.nutritionInfo.energy}</span>
                  <span className="text-amber-600 text-[10px]">Energy</span>
                </div>
                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="block font-bold text-blue-900">{product.nutritionInfo.protein}</span>
                  <span className="text-blue-600 text-[10px]">Protein</span>
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <span className="block font-bold text-emerald-900">{product.nutritionInfo.carbs}</span>
                  <span className="text-emerald-600 text-[10px]">Carbs</span>
                </div>
                <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl">
                  <span className="block font-bold text-purple-900">{product.nutritionInfo.fat}</span>
                  <span className="text-purple-600 text-[10px]">Fat</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
