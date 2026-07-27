import React, { useState, useEffect } from 'react';
import { CheckCircle2, Zap, Clock, MapPin, Phone, ShieldCheck, X } from 'lucide-react';
import { Location } from '../types';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  itemCount: number;
  currentLocation: Location;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderTotal,
  itemCount,
  currentLocation,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(599); // 09:59
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const step1 = setTimeout(() => setStep(2), 3000);
    const step2 = setTimeout(() => setStep(3), 7000);

    return () => {
      clearInterval(timer);
      clearTimeout(step1);
      clearTimeout(step2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSecs = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#2b004a] via-purple-900 to-[#ff3269] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-emerald-400 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-black">Order Placed Successfully!</h3>
          <p className="text-xs text-purple-200 mt-1">
            Zepto Dark Store #104 is packing your {itemCount} items now
          </p>

          {/* Delivery Timer Card */}
          <div className="mt-4 p-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 inline-flex items-center gap-3">
            <div className="p-2 bg-emerald-400 text-slate-950 rounded-xl">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                Estimated Delivery In
              </span>
              <span className="text-2xl font-black tracking-wider text-white font-mono">
                {formattedTime} MINS
              </span>
            </div>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Live Delivery Status
            </h4>

            {/* Steps */}
            <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="flex items-center gap-3 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  1
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Order Confirmed & Paid</h5>
                  <p className="text-xs text-slate-500">₹{orderTotal} received via UPI Instant Pay</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step >= 2 ? 'bg-purple-600 text-white animate-pulse' : 'bg-slate-200 text-slate-500'
                }`}>
                  2
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Packing at Dark Store</h5>
                  <p className="text-xs text-slate-500">Koramangala Hub (0.8 km away from you)</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step >= 3 ? 'bg-[#ff3269] text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  3
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Delivery Partner Assigned</h5>
                  <p className="text-xs text-slate-500">Ramesh K. on Electric Scooter 🛵</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs">
            <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">{currentLocation.title}</span>
              <p className="text-slate-500">{currentLocation.address}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-purple-900 hover:bg-purple-800 text-white font-bold text-sm rounded-2xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
