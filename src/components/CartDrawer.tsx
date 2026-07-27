import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Trash2,
  Tag,
  HeartHandshake,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CartItem, Coupon, Product, Location } from '../types';
import { COUPONS, PRODUCTS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (product: Product, delta: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderTotal: number, itemCount: number) => void;
  currentLocation: Location;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder,
  currentLocation,
}) => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [driverTip, setDriverTip] = useState<number>(30);

  if (!isOpen) return null;

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 149;
  const isFreeDelivery = itemTotal >= freeShippingThreshold || (appliedCoupon && appliedCoupon.code === 'FREESHIP');
  const deliveryFee = itemTotal === 0 ? 0 : isFreeDelivery ? 0 : 25;
  const handlingFee = itemTotal === 0 ? 0 : 2;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (itemTotal >= appliedCoupon.minOrder) {
      couponDiscount = appliedCoupon.discountAmount;
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + handlingFee + driverTip - couponDiscount);

  const handleApplyCoupon = (codeToApply?: string) => {
    const targetCode = (codeToApply || couponInput).trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === targetCode);

    if (!found) {
      setCouponError('Invalid Coupon Code');
      return;
    }

    if (itemTotal < found.minOrder) {
      setCouponError(`Min order ₹${found.minOrder} required for ${found.code}`);
      return;
    }

    setAppliedCoupon(found);
    setCouponInput('');
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Add-on suggestions
  const addOnSuggestions = PRODUCTS.filter(
    (p) => !cartItems.some((ci) => ci.product.id === p.id)
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Dark Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-[#2b004a] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">My Cart</h3>
                <p className="text-xs text-purple-200">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} • Delivering to{' '}
                  <span className="text-amber-300 font-bold">{currentLocation.title}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 10 MIN Delivery Banner */}
          <div className="bg-emerald-900 text-emerald-200 px-4 py-2.5 flex items-center justify-between text-xs font-bold border-b border-emerald-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />
              <span>Superfast Delivery in <span className="text-white">8-10 MINS</span></span>
            </div>
            <span className="text-[10px] bg-emerald-800 text-emerald-300 px-2 py-0.5 rounded">
              Dark Store 0.8 km
            </span>
          </div>

          {/* Progress to Free Delivery */}
          {itemTotal > 0 && !isFreeDelivery && (
            <div className="bg-amber-50 p-3 border-b border-amber-200/80 text-xs text-amber-900">
              <div className="flex items-center justify-between font-bold mb-1">
                <span>Add ₹{freeShippingThreshold - itemTotal} more for FREE Delivery!</span>
                <span>₹{itemTotal}/₹{freeShippingThreshold}</span>
              </div>
              <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (itemTotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto text-purple-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-lg">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add fresh milk, fruits, cold brews, and snacks to experience 10-minute delivery.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#ff3269] text-white font-bold text-xs rounded-xl shadow-md hover:bg-pink-600 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Selected Items
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {cartItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-purple-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h5 className="font-bold text-xs text-slate-900 line-clamp-1 max-w-[160px]">
                            {product.name}
                          </h5>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {product.weight} • ₹{product.price}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#ff3269] text-white font-black text-xs rounded-xl overflow-hidden shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(product, -1)}
                            className="px-2 py-1 hover:bg-pink-700 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product, 1)}
                            className="px-2 py-1 hover:bg-pink-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-extrabold text-xs text-slate-900 min-w-[40px] text-right">
                          ₹{product.price * quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Frequently Bought Together Add-ons */}
                <div className="pt-2">
                  <h5 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Frequently Bought Together</span>
                  </h5>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {addOnSuggestions.map((add) => (
                      <div
                        key={add.id}
                        className="w-32 shrink-0 p-2 bg-white rounded-xl border border-slate-200 text-center flex flex-col justify-between"
                      >
                        <img
                          src={add.image}
                          alt={add.name}
                          className="w-10 h-10 object-cover rounded-lg mx-auto mb-1"
                        />
                        <p className="text-[10px] font-bold text-slate-800 line-clamp-1">{add.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mb-1">₹{add.price}</p>
                        <button
                          onClick={() => onUpdateQuantity(add, 1)}
                          className="w-full py-1 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-[10px] rounded-lg border border-purple-200 transition-colors"
                        >
                          + ADD
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupons Section */}
                <div className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-pink-500" />
                      <span>Coupons & Offers</span>
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>'{appliedCoupon.code}' Applied! (-₹{appliedCoupon.discountAmount})</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-600 hover:underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Enter Coupon (e.g. ZEPTO100)"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold uppercase focus:outline-none focus:ring-1 focus:ring-purple-600"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs rounded-xl transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>
                      )}

                      <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                        {COUPONS.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => handleApplyCoupon(c.code)}
                            className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-200 rounded-lg text-[10px] font-bold text-purple-900 shrink-0"
                          >
                            {c.code} • ₹{c.discountAmount} OFF
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Tip */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-pink-500" />
                      <span>Tip Your Delivery Partner</span>
                    </span>
                    <span className="text-slate-500 font-medium text-[11px]">100% goes to rider</span>
                  </div>
                  <div className="flex gap-2">
                    {[20, 30, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDriverTip(driverTip === amount ? 0 : amount)}
                        className={`flex-1 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                          driverTip === amount
                            ? 'bg-[#ff3269] text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <h5 className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">
                    Bill Details
                  </h5>
                  <div className="flex justify-between text-slate-600">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Handling Fee</span>
                    <span>₹{handlingFee}</span>
                  </div>
                  {driverTip > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Partner Tip</span>
                      <span>₹{driverTip}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-extrabold text-slate-900 text-sm border-t border-slate-200 pt-2">
                    <span>To Pay</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-200 shadow-xl space-y-2">
              <button
                onClick={() => onPlaceOrder(grandTotal, cartItems.length)}
                className="w-full py-4 bg-[#ff3269] hover:bg-pink-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-pink-500/20 flex items-center justify-between px-6 transition-all active:scale-98"
              >
                <div className="text-left">
                  <span className="block font-black text-base">₹{grandTotal}</span>
                  <span className="text-[10px] text-pink-100 uppercase tracking-wider font-bold">
                    TOTAL PAYABLE
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>PROCEED TO PAY</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
