
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product, CartItem, AppView } from './types';
import { MOCK_PRODUCTS, CATEGORIES, FALLBACK_IMAGE } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import AIChatAssistant from './components/AIChatAssistant';
import { getCartReview } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [isAiInputFocused, setIsAiInputFocused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartAdvice, setCartAdvice] = useState<string | null>(null);
  const [cartSuggestions, setCartSuggestions] = useState<{ product: Product; reason: string }[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const scrollContainerRef = useRef<HTMLElement>(null);

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll to top when view changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view, selectedProduct]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return MOCK_PRODUCTS;
    const lowerQuery = searchQuery.toLowerCase().trim();
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase().trim();
    return MOCK_PRODUCTS
      .filter(p => p.name.toLowerCase().includes(lowerQuery))
      .slice(0, 4);
  }, [searchQuery]);

  const isConversational = (query: string) => {
    const q = query.toLowerCase();
    const conversationalKeywords = [
      'how', 'make', 'cook', 'recipe', 'best', 'will', 'is', 'for', 
      'suggest', 'should', 'can', 'with', 'help', 'acne', 'safe'
    ];
    return query.split(' ').length > 3 || conversationalKeywords.some(w => q.includes(w));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev[product.id];
      if (existing) {
        return {
          ...prev,
          [product.id]: { ...existing, quantity: existing.quantity + quantity }
        };
      }
      return {
        ...prev,
        [product.id]: { ...product, quantity }
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev[productId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      }
      return {
        ...prev,
        [productId]: { ...existing, quantity: existing.quantity - 1 }
      };
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setView(AppView.HOME);
    } else {
      setView(AppView.SEARCH);
    }
  };

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;

    if (isConversational(query)) {
      setIsAiMode(true);
      return;
    }

    const exactMatch = MOCK_PRODUCTS.find(p => p.name.toLowerCase() === query.toLowerCase().trim());
    if (exactMatch) {
      setSelectedProduct(exactMatch);
      setView(AppView.PDP);
      setSearchQuery('');
      return;
    }

    setView(AppView.SEARCH);
  };

  const handleAIAdd = (items: { product: Product; quantity: number }[]) => {
    items.forEach(item => addToCart(item.product, item.quantity));
    setSearchQuery('');
  };

  const reviewCart = async () => {
    if (cartItems.length === 0) return;
    setIsReviewing(true);
    try {
      const result = await getCartReview(cartItems);
      setCartAdvice(result.advice);
      const mapped = (result.suggestions || [])
        .map((s: any) => ({
          product: MOCK_PRODUCTS.find(p => p.id === s.id),
          reason: s.reason
        }))
        .filter((item: any) => item.product !== undefined && !cart[item.product.id]);
      setCartSuggestions(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleSeeAll = (cat?: string) => {
    if (cat) setSearchQuery(cat);
    else setSearchQuery('');
    setView(AppView.SEARCH);
  };

  const getProductsByCategory = (cat: string, limit: number = 4) => {
    return MOCK_PRODUCTS.filter(p => p.category === cat).slice(0, limit);
  };

  const renderHorizontalShelf = (title: string, category: string, icon: string) => (
    <div className="bg-white p-4 -mx-4">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-black text-gray-900 text-lg tracking-tight flex items-center gap-2">
          <i className={`fa-solid ${icon} text-zepto-purple/20`}></i> {title}
        </h3>
        <span 
          onClick={() => handleSeeAll(category)}
          className="text-zepto-pink text-sm font-bold cursor-pointer hover:underline transition-all"
        >
          See All
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
        {getProductsByCategory(category, 8).map(p => (
           <div key={p.id} className="min-w-[150px] max-w-[150px]">
              <ProductCard
                product={p}
                quantity={cart[p.id]?.quantity || 0}
                onAdd={addToCart}
                onRemove={removeFromCart}
                onClick={(prod) => { setSelectedProduct(prod); setView(AppView.PDP); }}
              />
           </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="iphone-frame">
      <div className="dynamic-island"></div>
      
      <div className="w-full h-full bg-white relative flex flex-col overflow-hidden">
        <Header 
          onSearchChange={handleSearchChange} 
          onSearchSubmit={handleSearchSubmit} 
          onProfileClick={() => setView(AppView.PROFILE)}
          searchQuery={searchQuery} 
        />

        <main 
          ref={scrollContainerRef as any}
          className={`flex-1 overflow-y-auto scrollbar-hide bg-[#f8f9fa] transition-all duration-300 ${totalQuantity > 0 ? 'pb-48' : 'pb-32'}`}
        >
          {view === AppView.HOME && (
            <div className="p-4 space-y-8">
              {/* Main Banner */}
              <div className="bg-gradient-to-br from-zepto-purple to-indigo-900 p-5 rounded-2xl text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                <p className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-80">Flash Offer</p>
                <h2 className="text-2xl font-black mb-3 leading-tight tracking-tight">Summer Essentials Under ₹99!</h2>
                <button 
                  onClick={() => handleSeeAll()}
                  className="bg-zepto-pink hover:bg-zepto-pink-dark text-white font-bold px-5 py-2 rounded-xl text-sm active:scale-95 transition-transform shadow-md uppercase tracking-wider"
                >
                  Shop Deals
                </button>
              </div>

              {/* Shop by Category Grid */}
              <div>
                <div className="flex justify-between items-center mb-4 px-1">
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">Explore Categories</h3>
                  <span 
                    onClick={() => handleSeeAll()}
                    className="text-zepto-pink text-sm font-bold cursor-pointer hover:underline transition-all"
                  >
                    See All
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-y-5 gap-x-3">
                  {CATEGORIES.map(cat => (
                    <CategoryCard 
                      key={cat.name}
                      name={cat.name}
                      image={cat.image}
                      onClick={() => { setSearchQuery(cat.name); setView(AppView.SEARCH); }}
                    />
                  ))}
                </div>
              </div>

              {/* Trending Section */}
              <div>
                <div className="flex justify-between items-center mb-4 px-1">
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">Trending Now</h3>
                  <span 
                    onClick={() => handleSeeAll()}
                    className="text-zepto-pink text-sm font-bold cursor-pointer hover:underline transition-all"
                  >
                    See All
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {MOCK_PRODUCTS.filter(p => ['p1', 'p7', 'p20', 'p13', 'p6', 'p40'].includes(p.id)).slice(0, 4).map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      quantity={cart[p.id]?.quantity || 0}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                      onClick={(prod) => { setSelectedProduct(prod); setView(AppView.PDP); }}
                    />
                  ))}
                </div>
              </div>

              {/* Shelf Sections */}
              {renderHorizontalShelf('Cool Drinks & Sips', 'Beverages', 'fa-wine-glass-empty')}
              {renderHorizontalShelf('Daily Essentials', 'Personal Care', 'fa-soap')}

              {/* Beauty & Care Store */}
              <div>
                <div className="flex justify-between items-center mb-4 px-1">
                  <h3 className="font-black text-gray-900 text-lg tracking-tight">The Beauty Store</h3>
                  <span 
                    onClick={() => handleSeeAll('Beauty')}
                    className="text-zepto-pink text-sm font-bold cursor-pointer hover:underline transition-all"
                  >
                    See All
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {getProductsByCategory('Beauty', 4).map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      quantity={cart[p.id]?.quantity || 0}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                      onClick={(prod) => { setSelectedProduct(prod); setView(AppView.PDP); }}
                    />
                  ))}
                </div>
              </div>
              
              {renderHorizontalShelf('Gadgets & Tech', 'Electronics', 'fa-microchip')}

              {/* Instant Food Section */}
              <div>
                <div className="flex justify-between items-center mb-4 px-1">
                  <h3 className="font-black text-gray-900 text-lg tracking-tight">Instant Cravings</h3>
                  <span 
                    onClick={() => handleSeeAll('Instant Food')}
                    className="text-zepto-pink text-sm font-bold cursor-pointer hover:underline transition-all"
                  >
                    See All
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {getProductsByCategory('Instant Food', 4).map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      quantity={cart[p.id]?.quantity || 0}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                      onClick={(prod) => { setSelectedProduct(prod); setView(AppView.PDP); }}
                    />
                  ))}
                </div>
              </div>

              {renderHorizontalShelf('Health & Fitness', 'Supplements', 'fa-heart-pulse')}
              {renderHorizontalShelf('Wellness & Self Care', 'Self Care', 'fa-spa')}
              
              <div className="h-10"></div>
            </div>
          )}

          {view === AppView.SEARCH && (
            <div className="p-4">
              {searchQuery.trim() && (
                <div className="mb-6 bg-white rounded-2xl zepto-shadow overflow-hidden">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 py-3 bg-gray-50">Suggestions</p>
                  
                  {suggestions.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => { setSelectedProduct(p); setView(AppView.PDP); setSearchQuery(''); }}
                      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-zepto-purple-light active:bg-gray-100 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <i className="fa-solid fa-magnifying-glass text-gray-300 text-xs"></i>
                      <span className="text-sm font-semibold text-gray-700">{p.name}</span>
                    </button>
                  ))}

                  <button 
                    onClick={() => setIsAiMode(true)}
                    className="w-full flex items-center gap-3 px-4 py-5 bg-zepto-purple-light hover:bg-indigo-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-zepto-purple flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-sparkles text-white text-xs"></i>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold text-zepto-purple">Ask Zepto AI about "{searchQuery}"</span>
                      <span className="text-[10px] text-zepto-purple/60 font-medium">Get recipes, advice & expert insights</span>
                    </div>
                    <i className="fa-solid fa-chevron-right ml-auto text-zepto-purple/30 text-xs"></i>
                  </button>
                </div>
              )}

              {filteredProducts.length > 0 && (
                <>
                  <h3 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-list-ul text-zepto-purple"></i> Product Results ({filteredProducts.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredProducts.map(p => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        quantity={cart[p.id]?.quantity || 0}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                        onClick={(prod) => { setSelectedProduct(prod); setView(AppView.PDP); }}
                      />
                    ))}
                  </div>
                </>
              )}

              {filteredProducts.length === 0 && (
                <div className="col-span-2 text-center py-16 flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-magnifying-glass text-gray-300 text-4xl"></i>
                  </div>
                  <p className="text-gray-500 font-bold text-lg">No direct matches</p>
                  <p className="text-sm text-gray-400 mt-1 mb-8 max-w-[200px]">Use the AI suggestion above for personalized help!</p>
                </div>
              )}
            </div>
          )}

          {view === AppView.PDP && selectedProduct && (
            <div className="bg-white min-h-full animate-in fade-in duration-300">
              {/* Product Header & Image */}
              <div className="relative h-72 flex items-center justify-center p-8 bg-gray-50 pt-12">
                <button 
                  onClick={() => setView(AppView.HOME)} 
                  className="absolute top-14 left-4 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center active:scale-90 transition-transform z-10"
                >
                  <i className="fa-solid fa-chevron-left text-zepto-purple"></i>
                </button>
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="h-full object-contain mix-blend-multiply drop-shadow-sm" 
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
              </div>
              
              <div className="p-6 bg-white rounded-t-3xl -mt-6 relative z-10 shadow-2xl shadow-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-xl font-black mb-1 text-gray-900 leading-tight">{selectedProduct.name}</h1>
                    <div className="flex items-center gap-2">
                       <p className="text-gray-400 font-bold text-sm">{selectedProduct.unit}</p>
                       {selectedProduct.isVeg && (
                          <div className="border border-green-600 w-3 h-3 flex items-center justify-center rounded-[2px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                          </div>
                       )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-zepto-purple">₹{selectedProduct.price}</p>
                    {selectedProduct.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">₹{selectedProduct.originalPrice}</p>
                    )}
                  </div>
                </div>

                <div className="h-[1px] bg-gray-50 w-full mb-6"></div>

                <div className="space-y-8">
                  {/* Highlights section */}
                  {selectedProduct.highlights && (
                    <div>
                      <h3 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-wider">Product Highlights</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedProduct.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <i className="fa-solid fa-check-circle text-green-500 text-xs"></i>
                            <span className="text-[11px] font-bold text-gray-700 leading-tight">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Description */}
                  <div>
                      <h3 className="font-black text-gray-900 mb-3 text-sm uppercase tracking-wider">Product Details</h3>
                      <p className="text-gray-600 leading-relaxed text-[13px] font-medium">{selectedProduct.description}</p>
                  </div>

                  {/* Information Grid (Shelf Life, Storage, Ingredients) */}
                  <div className="grid grid-cols-1 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    {selectedProduct.shelfLife && (
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-zepto-purple/40 shadow-sm border border-gray-50">
                           <i className="fa-solid fa-hourglass-half text-sm"></i>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Shelf Life</p>
                           <p className="text-[12px] font-bold text-gray-800">{selectedProduct.shelfLife}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedProduct.storageInfo && (
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-zepto-purple/40 shadow-sm border border-gray-50">
                           <i className="fa-solid fa-box-archive text-sm"></i>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Storage Info</p>
                           <p className="text-[12px] font-bold text-gray-800 leading-snug">{selectedProduct.storageInfo}</p>
                        </div>
                      </div>
                    )}

                    {selectedProduct.ingredients && (
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-zepto-purple/40 shadow-sm border border-gray-50">
                           <i className="fa-solid fa-mortar-pestle text-sm"></i>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Key Ingredients</p>
                           <p className="text-[11px] font-semibold text-zepto-purple leading-relaxed bg-zepto-purple-light px-2 py-0.5 rounded-md mt-1">{selectedProduct.ingredients.join(' • ')}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technical Specifications */}
                  {selectedProduct.specs && (
                     <div>
                        <h3 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-wider">Specifications</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(selectedProduct.specs).map(([key, val]) => (
                            <div key={key} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">{key}</p>
                              <p className="text-[11px] font-black text-gray-700">{val}</p>
                            </div>
                          ))}
                        </div>
                     </div>
                  )}
                </div>
                
                <div className="h-44"></div>
                {/* Floating Action Bar */}
                <div className="absolute bottom-24 left-0 right-0 px-6 z-40 bg-white/90 backdrop-blur-md py-5 border-t border-gray-100 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-gray-400 uppercase">Unit Price</span>
                       <span className="text-lg font-black text-gray-900">₹{selectedProduct.price}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-zepto-pink hover:bg-zepto-pink-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-zepto-pink/20 uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      Add To Cart <i className="fa-solid fa-cart-plus text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === AppView.CART && (
            <div className="p-4 flex flex-col gap-4 pb-32 animate-in fade-in duration-300">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Your Basket</h2>
              
              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-gray-100 zepto-card-shadow">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-contain mix-blend-multiply" 
                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-400 mb-2 font-medium">{item.unit}</p>
                          <p className="text-sm font-black text-zepto-purple">₹{item.price * item.quantity}</p>
                        </div>
                        <div className="flex flex-col items-center bg-zepto-pink-light rounded-2xl px-1 py-1 border border-zepto-pink/10">
                           <button onClick={() => addToCart(item)} className="p-2 text-zepto-pink active:scale-125 transition-transform"><i className="fa-solid fa-plus"></i></button>
                           <span className="font-black text-zepto-pink text-sm w-6 text-center">{item.quantity}</span>
                           <button onClick={() => removeFromCart(item.id)} className="p-2 text-zepto-pink active:scale-125 transition-transform"><i className="fa-solid fa-minus"></i></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-white p-5 rounded-2xl relative shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-zepto-purple font-black text-xs uppercase tracking-widest">
                        <i className="fa-solid fa-wand-magic-sparkles text-zepto-pink animate-pulse"></i> AI Smart Recommendations
                      </div>
                      <button 
                          onClick={reviewCart}
                          disabled={isReviewing}
                          className={`text-[10px] font-black uppercase tracking-widest ${isReviewing ? 'text-gray-300' : 'text-zepto-pink'}`}
                      >
                          {isReviewing ? 'Analyzing...' : (cartSuggestions.length > 0 ? 'Refresh' : 'Scan Cart')}
                      </button>
                    </div>

                    {cartSuggestions.length > 0 ? (
                      <div className="animate-in fade-in slide-in-from-right-4">
                        <p className="text-xs text-gray-400 font-bold mb-4">{cartAdvice}</p>
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2">
                           {cartSuggestions.map(({ product: p, reason }) => (
                             <div key={p.id} className="min-w-[140px] max-w-[140px] bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col items-center">
                                <div className="h-20 w-full flex items-center justify-center mb-2">
                                  <img src={p.imageUrl} className="h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="text-center mb-2">
                                  <p className="text-[11px] font-black text-gray-800 line-clamp-1">{p.name}</p>
                                  <p className="text-[9px] font-bold text-zepto-pink uppercase tracking-tighter mt-0.5">{reason}</p>
                                </div>
                                <button 
                                  onClick={() => addToCart(p)}
                                  className="w-full bg-white border-2 border-zepto-pink text-zepto-pink text-[9px] font-black py-1.5 rounded-xl uppercase active:bg-zepto-pink active:text-white transition-all"
                                >
                                  Add ₹{p.price}
                                </button>
                             </div>
                           ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        {!isReviewing && (
                          <button 
                              onClick={reviewCart}
                              className="text-sm text-gray-500 font-bold flex items-center justify-center gap-2 w-full"
                          >
                              Find what's missing <i className="fa-solid fa-chevron-right text-xs"></i>
                          </button>
                        )}
                        {isReviewing && (
                          <div className="flex flex-col items-center py-4">
                             <div className="w-8 h-8 border-3 border-zepto-purple/20 border-t-zepto-purple rounded-full animate-spin"></div>
                             <p className="text-[10px] font-black text-gray-400 uppercase mt-2 tracking-widest">Checking Pairings...</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-2xl mt-4 border border-gray-100 zepto-card-shadow">
                    <div className="flex justify-between mb-3 text-sm font-semibold text-gray-500">
                      <span>Item Total</span>
                      <span className="text-gray-900">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-sm font-semibold text-gray-500">
                      <span>Delivery Fee</span>
                      <span className="text-green-600 font-black tracking-widest uppercase text-[10px]">FREE</span>
                    </div>
                    <div className="h-[1px] bg-gray-50 my-5"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-gray-900">Total</span>
                      <span className="text-2xl font-black text-zepto-purple">₹{cartTotal}</span>
                    </div>
                    <button className="w-full bg-zepto-purple hover:bg-zepto-purple-dark text-white font-black py-5 rounded-2xl mt-8 shadow-xl shadow-zepto-purple/20 uppercase tracking-widest active:scale-[0.98] transition-all">
                      Pay Now
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-24 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <i className="fa-solid fa-cart-shopping text-4xl text-gray-200"></i>
                  </div>
                  <p className="text-gray-400 font-bold text-lg mb-6">Your basket is empty</p>
                  <button 
                    onClick={() => setView(AppView.HOME)}
                    className="bg-zepto-purple text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          )}

          {view === AppView.PROFILE && (
            <div className="p-8 text-center flex flex-col items-center min-h-full bg-white animate-in fade-in duration-300">
              <div className="w-24 h-24 bg-zepto-purple-light rounded-3xl flex items-center justify-center mb-6 shadow-inner mt-8">
                <i className="fa-solid fa-user text-4xl text-zepto-purple"></i>
              </div>
              <h2 className="text-2xl font-black mb-2 text-gray-900">My Profile</h2>
              <p className="text-sm font-bold text-gray-400 mb-8 max-w-[240px]">Manage your account</p>
              
              <div className="w-full space-y-4 text-left">
                {[
                  { name: 'Addresses', icon: 'fa-location-dot' },
                  { name: 'Order History', icon: 'fa-box-open' },
                  { name: 'Payment Methods', icon: 'fa-credit-card' },
                  { name: 'Support & Help', icon: 'fa-circle-question' }
                ].map(item => (
                  <div key={item.name} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center zepto-card-shadow active:scale-[0.98] transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-zepto-purple/40">
                        <i className={`fa-solid ${item.icon}`}></i>
                      </div>
                      <span className="font-black text-gray-800 tracking-tight">{item.name}</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
                  </div>
                ))}
              </div>

              <button className="mt-12 text-zepto-pink font-black text-xs uppercase tracking-widest">
                Log Out
              </button>
            </div>
          )}
        </main>

        {/* Cart Banner - Dynamic Positioning */}
        {totalQuantity > 0 && view !== AppView.CART && (
          <div 
            onClick={() => setView(AppView.CART)}
            className={`absolute left-4 right-4 bg-zepto-purple text-white rounded-2xl flex items-center justify-between shadow-2xl z-[150] transition-all duration-500 ease-in-out cursor-pointer active:scale-95 ring-1 ring-white/10 ${
              isAiMode 
                ? 'bottom-4 py-3 px-4'
                : 'bottom-24 py-3 px-4'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center relative transition-all">
                <i className="fa-solid fa-cart-shopping text-sm"></i>
                <span className="absolute -top-1 -right-1 bg-zepto-pink text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black ring-2 ring-zepto-purple">
                  {totalQuantity}
                </span>
              </div>
              <div>
                <p className="font-black uppercase tracking-widest opacity-70 leading-none mb-1 transition-all text-[10px]">
                  {totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'} Added
                </p>
                <p className="font-black leading-none transition-all text-sm">₹{cartTotal}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-black uppercase tracking-widest bg-white/10 rounded-xl transition-all text-xs px-4 py-2">
              View Cart <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </div>
          </div>
        )}

        {/* AI FAB Button */}
        {(view === AppView.PDP || view === AppView.CART || view === AppView.HOME || view === AppView.SEARCH) && (
          <div className={`absolute ${totalQuantity > 0 && view !== AppView.CART ? 'bottom-48' : 'bottom-44'} right-6 z-[120] transition-all duration-500 ease-out ${isAiMode ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100'}`}>
            <button 
              onClick={() => { setIsAiMode(!isAiMode); if (isAiMode) setSearchQuery(''); }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl relative transition-all active:scale-90 bg-zepto-purple"
              title="Zepto AI Assistant"
            >
                <div className="relative flex items-center justify-center">
                    <i className="fa-solid fa-headset text-2xl text-white"></i>
                    <span className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></span>
                </div>
            </button>
          </div>
        )}

        {isAiMode && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-zepto-purple/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={() => { setIsAiMode(false); setIsAiInputFocused(false); }}></div>
            <div className="relative z-[110] animate-in slide-in-from-bottom-full duration-500 w-full h-full pt-16">
               <AIChatAssistant 
                  onAddProducts={handleAIAdd} 
                  initialQuery={searchQuery}
                  activeProduct={view === AppView.PDP ? selectedProduct || undefined : undefined}
                  onClose={() => { setIsAiMode(false); setSearchQuery(''); setIsAiInputFocused(false); }}
                  onInputFocusChange={setIsAiInputFocused}
                  hasCartItems={totalQuantity > 0}
               />
            </div>
          </div>
        )}

        <nav className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around p-3 pb-8 z-[90] shadow-2xl">
          <button onClick={() => { setView(AppView.HOME); setSearchQuery(''); }} className={`flex flex-col items-center gap-1 flex-1 py-1.5 rounded-2xl transition-all ${view === AppView.HOME ? 'text-zepto-purple bg-zepto-purple-light' : 'text-gray-400 hover:text-zepto-purple/50'}`}>
            <i className="fa-solid fa-house text-lg"></i>
            <span className="text-[10px] font-black uppercase tracking-tight">Home</span>
          </button>
          <button onClick={() => setView(AppView.SEARCH)} className={`flex flex-col items-center gap-1 flex-1 py-1.5 rounded-2xl transition-all ${view === AppView.SEARCH ? 'text-zepto-purple bg-zepto-purple-light' : 'text-gray-400 hover:text-zepto-purple/50'}`}>
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
            <span className="text-[10px] font-black uppercase tracking-tight">Search</span>
          </button>
          <button onClick={() => setView(AppView.CART)} className={`flex flex-col items-center gap-1 relative flex-1 py-1.5 rounded-2xl transition-all ${view === AppView.CART ? 'text-zepto-purple bg-zepto-purple-light' : 'text-gray-400 hover:text-zepto-purple/50'}`}>
            <i className="fa-solid fa-cart-shopping text-lg"></i>
            {totalQuantity > 0 && (
              <span className="absolute top-1 right-1/4 bg-zepto-pink text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white animate-bounce">
                {totalQuantity}
              </span>
            )}
            <span className="text-[10px] font-black uppercase tracking-tight">Cart</span>
          </button>
          <button onClick={() => setView(AppView.PROFILE)} className={`flex flex-col items-center gap-1 flex-1 py-1.5 rounded-2xl transition-all ${view === AppView.PROFILE ? 'text-zepto-purple bg-zepto-purple-light' : 'text-gray-400 hover:text-zepto-purple/50'}`}>
            <i className="fa-solid fa-user text-lg"></i>
            <span className="text-[10px] font-black uppercase tracking-tight">Account</span>
          </button>
        </nav>

        <div className="home-bar"></div>
      </div>
    </div>
  );
};

export default App;
