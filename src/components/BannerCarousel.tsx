import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { BANNERS } from '../data/mockData';

interface BannerCarouselProps {
  onSelectCategory: (catId: string) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ onSelectCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[activeIndex];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 border border-purple-900/20">
      <div className={`relative min-h-[220px] sm:min-h-[280px] bg-gradient-to-r ${banner.bgGradient} p-6 sm:p-10 flex flex-col justify-between transition-all duration-700`}>
        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-lg space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-amber-300 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{banner.highlight}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
            {banner.title}
          </h2>

          <p className="text-sm sm:text-base text-purple-100 font-medium leading-normal">
            {banner.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={() => onSelectCategory(banner.categoryLink)}
              className="px-6 py-3 bg-[#ff3269] hover:bg-pink-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-pink-500/30 flex items-center gap-2 transition-all active:scale-95 group"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Banner Right Image */}
        <div className="absolute right-4 bottom-4 top-4 w-1/3 hidden md:block rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Carousel Indicators & Controls */}
        <div className="relative z-10 flex items-center justify-between pt-4">
          <div className="flex gap-2">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % BANNERS.length)}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
