import React, { useState, useEffect } from 'react';
import { Search, X, Zap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  cartItemsCount: (productId: string) => number;
  onUpdateCartQuantity: (product: Product, delta: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  cartItemsCount,
  onUpdateCartQuantity,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = ['Mangoes', 'Milk', 'Cold Coffee', 'Paneer', 'Lay\'s', 'Croissant', 'Atta', 'Chocolates', 'Red Bull'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery = query === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(query.toLowerCase()) ||
      (product.tags && product.tags.some(t => t.toLowerCase().includes(query.toLowerCase())));

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Top Search Bar Header */}
      <div className="bg-[#2b004a] text-white p-4 sm:px-8 border-b border-purple-900 sticky top-0 z-10 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for milk, mangoes, iced coffee, chips, chocolates..."
              className="w-full pl-11 pr-10 py-3 bg-white/10 text-white placeholder-purple-200 border border-purple-400/30 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-purple-950/80 transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-purple-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#ff3269] text-white'
                : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#ff3269] text-white'
                  : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f4f6fb] custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          {/* Trending Searches when Query is empty */}
          {!query && (
            <div className="mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm mb-3">
                <TrendingUp className="w-4 h-4 text-pink-500" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-100 rounded-xl text-xs font-medium transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {query ? `Search Results for "${query}"` : 'All Available Items'}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              {filteredProducts.length} Items Delivered in 10 Mins
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-3 animate-bounce" />
              <h4 className="text-lg font-bold text-slate-800 mb-1">No items matching "{query}"</h4>
              <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                We couldn't find exact matches. Try searching for dairy, fruits, beverages, or chips!
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
