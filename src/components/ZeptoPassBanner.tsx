import React from 'react';
import { Sparkles, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

interface ZeptoPassBannerProps {
  onJoinPass: () => void;
}

export const ZeptoPassBanner: React.FC<ZeptoPassBannerProps> = ({ onJoinPass }) => {
  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#3b0066] via-purple-900 to-[#ff3269] p-6 text-white shadow-xl relative overflow-hidden border border-purple-800">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zepto Pass • Super Saver</span>
          </div>

          <h3 className="text-2xl font-black tracking-tight leading-tight">
            Save extra ₹120 every month with Zepto Pass!
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-semibold text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>FREE Delivery on orders above ₹99</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Up to 20% Extra OFF on 1000+ Staples</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Priority 10-Minute Darkstore Packing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No Surge Fee during rain / high demand</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center w-full md:w-auto">
          <div className="text-xs text-purple-200 font-bold">1 Month Pass</div>
          <div className="text-2xl font-black text-white my-0.5">
            ₹19 <span className="text-xs line-through text-purple-300 font-normal">₹99</span>
          </div>
          <button
            onClick={onJoinPass}
            className="w-full mt-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>JOIN PASS FOR ₹19</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
