
import React from 'react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onSearchSubmit, searchQuery }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <div className="bg-zepto-purple text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-black text-lg tracking-tight">
            Delivery in 10-15 Mins <i className="fa-solid fa-chevron-down text-[10px] mt-1"></i>
          </div>
          <div className="text-[11px] font-bold opacity-60 truncate max-w-[220px]">
            HSR Layout, Bangalore - 560102
          </div>
        </div>
        <button className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/5 active:scale-95 transition-transform">
          <i className="fa-solid fa-user text-white text-sm"></i>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-zepto-purple transition-colors">
          <i className="fa-solid fa-magnifying-glass text-sm"></i>
        </div>
        <input
          type="text"
          placeholder='Try "make pasta for 2" or "acne wash"'
          className="w-full h-13 pl-11 pr-12 rounded-2xl text-black font-semibold text-sm outline-none border-2 border-transparent focus:border-zepto-pink transition-all shadow-xl bg-white placeholder:text-gray-400 placeholder:font-medium"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
          {searchQuery && (
            <button type="submit" className="bg-zepto-pink hover:bg-zepto-pink-dark text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-all">
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          )}
          <button type="button" className="text-zepto-purple/40 hover:text-zepto-purple active:scale-90 transition-all">
            <i className="fa-solid fa-microphone"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
