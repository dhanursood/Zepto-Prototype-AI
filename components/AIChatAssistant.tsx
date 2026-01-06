
import React, { useState, useEffect, useRef } from 'react';
import { getUnifiedAIResponse, UnifiedAIResponse } from '../services/geminiService';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AIChatAssistantProps {
  onAddProducts: (products: { product: Product; quantity: number }[]) => void;
  initialQuery?: string;
  activeProduct?: Product;
  onClose?: () => void;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ onAddProducts, initialQuery, activeProduct: initialActiveProduct, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | undefined>(initialActiveProduct);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; text: string; data?: UnifiedAIResponse }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  useEffect(() => {
    if (initialQuery) {
      setInputValue(initialQuery);
      handleSearch(initialQuery);
    } else if (activeProduct) {
      setChatHistory([{ 
        type: 'ai', 
        text: `Hi! I'm ready to help with **${activeProduct.name}** or anything else in the catalog. What's on your mind?` 
      }]);
    } else {
      setChatHistory([{ 
        type: 'ai', 
        text: "Hi! I'm your Zepto Assistant. Ask me for recipes, product advice, or finding the best deals!" 
      }]);
    }
  }, [initialQuery, activeProduct?.id]);

  const handleSearch = async (query: string) => {
    if (!query.trim() || loading) return;
    const currentQuery = query.trim();
    setLoading(true);
    setError(null);
    setChatHistory(prev => [...prev, { type: 'user', text: currentQuery }]);
    setInputValue('');

    try {
      const result = await getUnifiedAIResponse(currentQuery, activeProduct);
      if (result) {
        setChatHistory(prev => [...prev, { 
          type: 'ai', 
          text: result.answer,
          data: result 
        }]);
      } else {
        setError("I'm having trouble connecting right now. Please try again.");
      }
    } catch (err) {
      setError("AI service encountered an error.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action: { label: string; quantity: number; productId?: string } | undefined, products?: { id: string; quantity: number }[]) => {
    const itemsToAdd: { product: Product; quantity: number }[] = [];

    // 1. Handle explicit single action
    if (action) {
      const targetId = action.productId || activeProduct?.id;
      if (targetId) {
        const p = MOCK_PRODUCTS.find(prod => prod.id === targetId);
        if (p) itemsToAdd.push({ product: p, quantity: action.quantity });
      }
    }

    // 2. Handle suggested product list (common for recipes or search)
    if (products && products.length > 0) {
      products.forEach(item => {
        const p = MOCK_PRODUCTS.find(prod => prod.id === item.id);
        if (p) itemsToAdd.push({ product: p, quantity: item.quantity });
      });
    }

    if (itemsToAdd.length > 0) {
      onAddProducts(itemsToAdd);
    }
  };

  const suggestions = activeProduct 
    ? ['Is it fresh?', 'Servings for 4?', 'Storage tips?', 'Show me milk']
    : ['Healthy snacks', 'iPhone 15 cable', 'Dinner recipe', 'Beauty deals'];

  const lastAiMessage = [...chatHistory].reverse().find(m => m.type === 'ai');
  const followUps = lastAiMessage?.data?.followUps || suggestions;

  return (
    <div className="bg-white rounded-t-[2.5rem] zepto-shadow flex flex-col h-full overflow-hidden border-t border-gray-100 relative">
      {/* Header */}
      <div className="flex flex-col p-6 pb-4 border-b border-gray-50 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zepto-purple flex items-center justify-center shadow-lg shadow-zepto-purple/20">
              <i className="fa-solid fa-sparkles text-white text-sm"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-zepto-purple tracking-tight leading-none mb-1">Zepto Assistant</h2>
              <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Always Learning</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 transition-colors p-2">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {activeProduct && (
          <div className="flex items-center gap-2 animate-in slide-in-from-top-2">
            <div className="flex-1 flex items-center gap-3 bg-zepto-purple-light p-2 rounded-2xl border border-zepto-purple/10">
              <div className="w-8 h-8 bg-white rounded-lg p-1 shadow-sm">
                <img src={activeProduct.imageUrl} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] font-bold text-zepto-purple truncate">Context: {activeProduct.name}</p>
              </div>
              <button 
                onClick={() => setActiveProduct(undefined)}
                className="w-6 h-6 flex items-center justify-center text-zepto-purple/40 hover:text-zepto-purple transition-colors"
                title="Clear product context"
              >
                <i className="fa-solid fa-circle-xmark text-xs"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6 bg-gray-50/40 pb-40">
        {chatHistory.map((chat, idx) => (
          <div key={idx} className={`flex flex-col ${chat.type === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`px-4 py-3 rounded-2xl text-[13px] font-semibold max-w-[85%] ${
              chat.type === 'user' 
                ? 'bg-zepto-purple text-white rounded-tr-none shadow-md' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
            }`}>
              {chat.text}
            </div>

            {/* AI Data Rich Response */}
            {chat.type === 'ai' && chat.data && (
              <div className="mt-3 w-full max-w-[90%] space-y-3">
                {/* Product List from AI */}
                {chat.data.products && chat.data.products.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Suggested Items</p>
                    {chat.data.products.map(item => {
                      const p = MOCK_PRODUCTS.find(prod => prod.id === item.id);
                      if (!p) return null;
                      return (
                        <div key={p.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                          <img src={p.imageUrl} className="w-8 h-8 object-contain mix-blend-multiply" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold truncate">{p.name}</p>
                            <p className="text-[10px] font-black text-zepto-purple">₹{p.price}</p>
                          </div>
                          <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg border border-gray-100">x{item.quantity}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Primary CTA */}
                {chat.data.action && (
                  <button 
                    onClick={() => handleAction(chat.data?.action, chat.data?.products)}
                    className="w-full bg-zepto-pink hover:bg-zepto-pink-dark text-white text-[11px] font-black py-3 rounded-xl shadow-lg shadow-zepto-pink/20 uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-cart-plus"></i> {chat.data.action.label}
                  </button>
                )}
                
                {/* Secondary Button if products exist but no action */}
                {!chat.data.action && chat.data.products && chat.data.products.length > 0 && (
                  <button 
                    onClick={() => handleAction(undefined, chat.data?.products)}
                    className="w-full bg-zepto-purple text-white text-[11px] font-black py-3 rounded-xl uppercase tracking-widest active:scale-[0.98] transition-all"
                  >
                    Add All To Cart
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 py-2">
             <div className="w-1.5 h-1.5 bg-zepto-purple rounded-full animate-bounce"></div>
             <div className="w-1.5 h-1.5 bg-zepto-purple rounded-full animate-bounce delay-100"></div>
             <div className="w-1.5 h-1.5 bg-zepto-purple rounded-full animate-bounce delay-200"></div>
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Thinking...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-bold border border-red-100 animate-shake">
            <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-6 pt-4 bg-white border-t border-gray-100 pb-12 absolute bottom-0 left-0 right-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 -mx-1 px-1">
            {followUps.map((tag, i) => (
                <button 
                    key={i}
                    onClick={() => handleSearch(tag)}
                    className="whitespace-nowrap bg-gray-50 border border-gray-100 px-4 py-2 rounded-full text-[10px] font-bold text-gray-500 hover:border-zepto-purple hover:text-zepto-purple hover:bg-white transition-all active:scale-95"
                >
                    {tag}
                </button>
            ))}
        </div>

        <div className="relative">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={activeProduct ? `Ask about this ${activeProduct.category.toLowerCase()}...` : "Find recipes, products..."}
                className="w-full py-4 pl-5 pr-14 rounded-2xl bg-gray-100 border-2 border-transparent outline-none focus:bg-white focus:border-zepto-purple transition-all text-sm font-semibold placeholder:text-gray-400"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch(inputValue);
                    }
                }}
            />
            <button 
                onClick={() => handleSearch(inputValue)}
                disabled={!inputValue.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-zepto-purple text-white rounded-xl flex items-center justify-center disabled:opacity-30 active:scale-90 transition-all shadow-md shadow-zepto-purple/30"
            >
                <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;
