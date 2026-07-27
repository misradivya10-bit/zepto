import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartItemsCount: (productId: string) => number;
  onUpdateCartQuantity: (product: Product, delta: number) => void;
  onSelectProduct: (product: Product) => void;
  seeAllCategory?: string;
  onSeeAll?: () => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  icon,
  products,
  onAddToCart,
  cartItemsCount,
  onUpdateCartQuantity,
  onSelectProduct,
  onSeeAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            {icon || <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />}
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="text-xs font-bold text-[#ff3269] hover:text-purple-900 transition-colors mr-2"
            >
              See All →
            </button>
          )}
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors hidden sm:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors hidden sm:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5 -mx-1"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[170px] sm:w-[210px] shrink-0">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              quantityInCart={cartItemsCount(product.id)}
              onUpdateQuantity={(delta) => onUpdateCartQuantity(product, delta)}
              onSelectProduct={onSelectProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
