import React from 'react';
import { X, User, Sparkles, ShoppingBag, MapPin, Wallet, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Location } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: Location;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, currentLocation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#2b004a] to-purple-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white/20">
              DM
            </div>
            <div>
              <h3 className="font-extrabold text-lg">Divya Mishra</h3>
              <p className="text-xs text-purple-200">+91 98765 43210</p>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-full mt-1">
                <Sparkles className="w-3 h-3" />
                <span>Zepto Pass Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* List Options */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Zepto Cash Wallet */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-600 text-white rounded-xl">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold block">Zepto Cash Balance</span>
                <span className="text-lg font-black text-slate-900">₹150.00</span>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-purple-900 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition-colors">
              Add Money
            </button>
          </div>

          <div className="space-y-1 pt-2">
            <button className="w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 rounded-2xl text-slate-700 font-bold text-xs transition-colors">
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span>Orders & Reorders</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 rounded-2xl text-slate-700 font-bold text-xs transition-colors">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>Saved Addresses ({currentLocation.title})</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 rounded-2xl text-slate-700 font-bold text-xs transition-colors">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Payment Methods & Refunds</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 rounded-2xl text-slate-700 font-bold text-xs transition-colors">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>Customer Support 24/7</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-2xl font-bold text-xs transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
