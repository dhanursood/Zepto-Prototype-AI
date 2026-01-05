
import React from 'react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  onProfileClick?: () => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onSearchSubmit, onProfileClick, searchQuery }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <div className="bg-zepto-purple text-white p-4 pt-14 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-black text-sm tracking-tight cursor-pointer active:opacity-70 transition-opacity">
            10-15 Mins Delivery <i className="fa-solid fa-chevron-down text-[9px] mt-0.5"></i>
          </div>
          <div className="text-[10px] font-bold opacity-60 truncate max-w-[180px]">
            HSR Layout, Bangalore - 560102
          </div>
        </div>
        <button 
          onClick={onProfileClick}
          className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/5 active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-user text-white text-xs"></i>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-zepto-purple transition-colors">
          <i className="fa-solid fa-magnifying-glass text-xs"></i>
        </div>
        <input
          type="text"
          placeholder='Try "make pasta" or "iPhone cable"'
          className="w-full h-11 pl-10 pr-12 rounded-2xl text-black font-semibold text-[13px] outline-none border-2 border-transparent focus:border-zepto-pink transition-all shadow-md bg-white placeholder:text-gray-400 placeholder:font-medium"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button type="submit" className="bg-zepto-pink hover:bg-zepto-pink-dark text-white w-7 h-7 rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-all">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          )}
          <button type="button" className="text-zepto-purple/30 w-7 h-7 flex items-center justify-center hover:text-zepto-purple active:scale-90 transition-all">
            <i className="fa-solid fa-microphone text-xs"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
