import React, { useState } from 'react';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { ZeptoPassBanner } from './components/ZeptoPassBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { ZeptoCafeSection } from './components/ZeptoCafeSection';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LocationModal } from './components/LocationModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';

import { Product, CartItem, Location } from './types';
import { PRODUCTS, LOCATIONS, CATEGORIES } from './data/mockData';
import { Zap, Coffee, Apple, Milk, Cookie, CupSoda, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState<Location>(LOCATIONS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Pre-populate with 1 milk and 1 croissant for realistic interactive preview
    { product: PRODUCTS.find((p) => p.id === 'db-1') || PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS.find((p) => p.id === 'zc-2') || PRODUCTS[1], quantity: 1 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals visibility
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Order Success State
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<{ total: number; itemCount: number }>({
    total: 0,
    itemCount: 0,
  });

  // Cart Helper functions
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (product: Product, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === product.id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const cartItemsCount = (productId: string): number => {
    const item = cartItems.find((ci) => ci.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = (orderTotal: number, itemCount: number) => {
    setLastOrderDetails({ total: orderTotal, itemCount });
    setCartItems([]);
    setIsCartDrawerOpen(false);
    setIsOrderSuccessModalOpen(true);
  };

  // Grouped products
  const trendingProducts = PRODUCTS.filter((p) => p.isBestseller || p.discountPercent >= 20);
  const cafeProducts = PRODUCTS.filter((p) => p.category === 'zepto-cafe');
  const mangoSpecialProducts = PRODUCTS.filter((p) => p.subcategory === 'Mango Special' || p.category === 'fruits-veg');
  const dairyProducts = PRODUCTS.filter((p) => p.category === 'dairy-bread');
  const munchiesProducts = PRODUCTS.filter((p) => p.category === 'munchies');
  const drinksProducts = PRODUCTS.filter((p) => p.category === 'cold-drinks');
  const sweetProducts = PRODUCTS.filter((p) => p.category === 'sweet-tooth');

  // Filtered products if a specific category is active
  const activeCategoryProducts = PRODUCTS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900 font-sans flex flex-col justify-between">
      {/* Top Navigation Header */}
      <Header
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
        cartItems={cartItems}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        {selectedCategory === 'all' ? (
          <>
            {/* Promo Carousel */}
            <BannerCarousel onSelectCategory={setSelectedCategory} />

            {/* Zepto Pass Subscription Banner */}
            <ZeptoPassBanner onJoinPass={() => setIsAccountModalOpen(true)} />

            {/* Category Grid */}
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Zepto Cafe Dedicated Showcase */}
            <ZeptoCafeSection
              cafeProducts={cafeProducts}
              onAddToCart={handleAddToCart}
              cartItemsCount={cartItemsCount}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onSelectProduct={setSelectedProductDetail}
            />

            {/* Section 1: Trending Near You */}
            <ProductCarousel
              title="⚡ Trending Near You"
              subtitle="Superfast 8-10 minute dark store picks in Koramangala"
              icon={<Zap className="w-5 h-5 text-[#ff3269] fill-[#ff3269]" />}
              products={trendingProducts}
              onAddToCart={handleAddToCart}
              cartItemsCount={cartItemsCount}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onSelectProduct={setSelectedProductDetail}
            />

            {/* Section 2: Mango Festival */}
            <ProductCarousel
              title="🥭 Mango Festival & Fresh Fruits"
              subtitle="Ratnagiri Alphonso, Kesar & farm-fresh produce"
              icon={<Apple className="w-5 h-5 text-emerald-600" />}
              products={mangoSpecialProducts}
              onAddToCart={handleAddToCart}
              cartItemsCount={cartItemsCount}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onSelectProduct={setSelectedProductDetail}
              onSeeAll={() => setSelectedCategory('fruits-veg')}
            />

            {/* Section 3: Dairy, Bread & Eggs */}
            <ProductCarousel
              title="🥛 Dairy, Bread & Fresh Eggs"
              subtitle="Fresh morning milk, malai paneer & whole wheat loaves"
              icon={<Milk className="w-5 h-5 text-blue-600" />}
              products={dairyProducts}
              onAddToCart={handleAddToCart}
              cartItemsCount={cartItemsCount}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onSelectProduct={setSelectedProductDetail}
              onSeeAll={() => setSelectedCategory('dairy-bread')}
            />

            {/* Section 4: Munchies & Chips */}
            <ProductCarousel
              title="🍿 Munchies, Chips & Nachos"
              subtitle="Lay's magic masala, nachos, movie popcorn & snacks"
              icon={<Cookie className="w-5 h-5 text-amber-600" />}
              products={munchiesProducts}
              onAddToCart={handleAddToCart}
              cartItemsCount={cartItemsCount}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onSelectProduct={setSelectedProductDetail}
              onSeeAll={() => setSelectedCategory('munchies')}
            />

            {/* Section 5: Cold Drinks & Energy */}
            <ProductCarousel
              title="🥤 Cold Drinks, Juices & Red Bull"
              subtitle="Chilled soft drinks, coconut water & energy cans"
              icon={<CupSoda className="w-5 h-5 text-red-600" />}
              products={drinksProducts}
              onAddToCart={handleAddToCart}
              cartItemsCount={cartItemsCount}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onSelectProduct={setSelectedProductDetail}
              onSeeAll={() => setSelectedCategory('cold-drinks')}
            />
          </>
        ) : (
          /* Category Filtered View */
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <div>
                <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider">
                  Category Filter
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-0.5">
                  {activeCategoryObj ? activeCategoryObj.name : selectedCategory}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Showing {activeCategoryProducts.length} items delivered in 10 minutes
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 bg-slate-100 hover:bg-purple-100 text-purple-900 font-bold text-xs rounded-xl transition-colors"
              >
                Clear Filter ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {activeCategoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  quantityInCart={cartItemsCount(product.id)}
                  onUpdateQuantity={(delta) => handleUpdateCartQuantity(product, delta)}
                  onSelectProduct={setSelectedProductDetail}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Mobile Cart Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="w-full bg-[#ff3269] text-white p-3.5 rounded-2xl font-black shadow-2xl flex items-center justify-between border-2 border-white/20 animate-glow"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white text-[#ff3269] rounded-lg flex items-center justify-center font-black text-xs">
                {totalCartCount}
              </div>
              <span className="text-xs font-black uppercase tracking-wider">
                VIEW CART
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm font-black">
              <span>₹{totalCartPrice}</span>
              <span>→</span>
            </div>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Modals & Drawers */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onAddToCart={handleAddToCart}
        cartItemsCount={cartItemsCount}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onSelectProduct={setSelectedProductDetail}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        currentLocation={currentLocation}
      />

      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        quantityInCart={selectedProductDetail ? cartItemsCount(selectedProductDetail.id) : 0}
        onUpdateQuantity={(delta) => {
          if (selectedProductDetail) handleUpdateCartQuantity(selectedProductDetail, delta);
        }}
      />

      <OrderSuccessModal
        isOpen={isOrderSuccessModalOpen}
        onClose={() => setIsOrderSuccessModalOpen(false)}
        orderTotal={lastOrderDetails.total}
        itemCount={lastOrderDetails.itemCount}
        currentLocation={currentLocation}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentLocation={currentLocation}
      />
    </div>
  );
}
