
import React, { useState, useEffect, useRef } from 'react';
import { getAIRecommendations } from '../services/geminiService';
import { Product, AIResponse } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AIChatAssistantProps {
  onAddProducts: (products: { product: Product; quantity: number }[]) => void;
  initialQuery?: string;
  onClose?: () => void;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ onAddProducts, initialQuery, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (initialQuery) {
      setInputValue(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getAIRecommendations(query);
      if (result) {
        setResponse(result);
      } else {
        setError("I couldn't find matches. Try something like 'acne care' or 'make paneer butter masala'.");
      }
    } catch (err) {
      setError("AI is currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAll = () => {
    if (!response) return;
    const itemsToAdd = response.products
      .map(item => {
        const product = MOCK_PRODUCTS.find(p => p.id === item.id);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((item): item is { product: Product; quantity: number } => item !== null);
    
    onAddProducts(itemsToAdd);
    onClose?.();
  };

  return (
    <div className="bg-white rounded-t-[2.5rem] zepto-shadow flex flex-col max-h-[92vh] overflow-hidden border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-50 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zepto-purple flex items-center justify-center shadow-lg shadow-zepto-purple/20">
            <i className="fa-solid fa-sparkles text-white text-sm"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-zepto-purple tracking-tight leading-none mb-1">Zepto AI</h2>
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expert Active</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-times"></i>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8 bg-gray-50/30">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-zepto-purple/10 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-zepto-purple border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-zepto-purple font-black mt-6 tracking-tight">Thinking like an expert...</p>
            <p className="text-gray-400 text-xs mt-2 font-medium">Analyzing catalog for {inputValue}</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
            <i className="fa-solid fa-circle-exclamation text-lg"></i>
            {error}
          </div>
        ) : response ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-gradient-to-br from-zepto-purple to-zepto-purple-dark p-6 rounded-3xl mb-8 shadow-xl shadow-zepto-purple/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <h3 className="font-black text-white mb-3 text-lg leading-tight flex items-center gap-2">
                ✨ {response.summary}
              </h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed whitespace-pre-wrap">{response.explanation}</p>
            </div>

            <div className="mb-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2">
                <i className="fa-solid fa-shopping-bag text-zepto-purple/40"></i> Recommended Essentials
              </h4>
              <div className="space-y-3">
                {response.products.map((item) => {
                  const p = MOCK_PRODUCTS.find(prod => prod.id === item.id);
                  if (!p) return null;
                  return (
                    <div key={p.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 zepto-card-shadow group hover:border-zepto-purple transition-all">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-gray-900 leading-tight mb-1">{p.name}</p>
                        <p className="text-[11px] text-gray-400 font-bold">{p.unit} • <span className="text-zepto-purple">₹{p.price}</span></p>
                      </div>
                      <div className="text-zepto-pink font-black text-sm bg-zepto-pink-light w-10 h-10 rounded-xl flex items-center justify-center border border-zepto-pink/10 shadow-sm">
                        x{item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleAddAll}
              className="w-full bg-zepto-pink hover:bg-zepto-pink-dark text-white font-black py-5 rounded-2xl shadow-xl shadow-zepto-pink/20 active:scale-95 transition-all mb-8 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              Add Everything To Basket <i className="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400 flex flex-col items-center">
              <div className="w-20 h-20 bg-zepto-purple-light rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                <i className="fa-solid fa-magic-wand-sparkles text-3xl text-zepto-purple opacity-40"></i>
              </div>
              <h3 className="text-gray-900 font-black text-lg mb-2">How can I help you today?</h3>
              <p className="text-sm font-medium text-gray-400 max-w-[240px]">Ask about recipes, hair types, skin ailments, or vitamins.</p>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-6 pt-4 bg-white border-t border-gray-50 pb-10">
        <div className="relative">
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Write your message..."
                className="w-full p-5 pr-14 rounded-[1.5rem] bg-gray-100 border-2 border-transparent outline-none focus:bg-white focus:border-zepto-purple transition-all resize-none h-28 text-sm font-semibold placeholder:text-gray-400"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSearch(inputValue);
                    }
                }}
            />
            <button 
                onClick={() => handleSearch(inputValue)}
                disabled={!inputValue.trim() || loading}
                className="absolute right-4 bottom-4 w-11 h-11 bg-zepto-purple text-white rounded-2xl flex items-center justify-center disabled:opacity-30 active:scale-90 transition-all shadow-lg shadow-zepto-purple/30"
            >
                <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {['Shampoo for dandruff', 'Rash on skin', 'Best Biotin', 'Acne wash'].map(tag => (
                <button 
                    key={tag}
                    onClick={() => { setInputValue(tag); handleSearch(tag); }}
                    className="whitespace-nowrap bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest hover:border-zepto-purple hover:text-zepto-purple transition-all"
                >
                    {tag}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;
