import React, { useState } from 'react';
import { MapPin, Search, Navigation, Home, Briefcase, Building, Check, X } from 'lucide-react';
import { Location } from '../types';
import { LOCATIONS } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: Location;
  onSelectLocation: (location: Location) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isOpen) return null;

  const popularCities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      onSelectLocation(LOCATIONS[0]);
      onClose();
    }, 1200);
  };

  const handleCustomPincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      const customLoc: Location = {
        id: `custom-${Date.now()}`,
        title: `Pincode ${pincodeInput}`,
        address: `Custom Pincode Sector, ${pincodeInput}`,
        pincode: pincodeInput,
        city: 'Current City',
        deliveryTime: '8-10 Mins',
        isAvailable: true,
        type: 'Other',
      };
      onSelectLocation(customLoc);
      onClose();
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'Home': return <Home className="w-5 h-5 text-purple-600" />;
      case 'Work': return <Briefcase className="w-5 h-5 text-purple-600" />;
      default: return <Building className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#2b004a] text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Select Delivery Location</h3>
              <p className="text-xs text-purple-200">Delivering fresh groceries in <span className="text-emerald-400 font-semibold">10 Mins ⚡</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* GPS Location Button */}
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl text-purple-900 hover:border-purple-300 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600 text-white group-hover:bg-purple-700 transition-colors">
                <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Use Current Location</p>
                <p className="text-xs text-purple-600 font-medium">
                  {isDetecting ? 'Detecting via GPS...' : 'Using device GPS for instant pin'}
                </p>
              </div>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
              Fastest ⚡
            </span>
          </button>

          {/* Search Location Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area, street name, apartment..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>

          {/* Pincode Search */}
          <form onSubmit={handleCustomPincodeSubmit} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit Pincode (e.g. 560095)"
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={pincodeInput.length !== 6}
              className="px-4 py-2.5 bg-[#ff3269] text-white font-semibold text-sm rounded-xl hover:bg-pink-600 disabled:opacity-50 transition-colors"
            >
              Check
            </button>
          </form>

          {/* Saved Addresses */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Saved Addresses
            </h4>
            <div className="space-y-2">
              {LOCATIONS.map((loc) => {
                const isSelected = currentLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      onSelectLocation(loc);
                      onClose();
                    }}
                    className={`w-full flex items-start justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-purple-100 rounded-lg">
                        {getLocationIcon(loc.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-800">{loc.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded">
                            {loc.deliveryTime}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{loc.address}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Delivery Cities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Popular Cities Delivered In 10 Mins
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    const cityLoc = LOCATIONS.find((l) => l.city === city) || LOCATIONS[0];
                    onSelectLocation(cityLoc);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
