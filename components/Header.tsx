
import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, X } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateListing: (type?: string, value?: string) => void;
  onNavigateWishlist: () => void;
  onNavigateCart: () => void;
  wishlistCount: number;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateHome, 
  onNavigateListing, 
  onNavigateWishlist, 
  onNavigateCart,
  wishlistCount,
  cartCount
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const navItems = [
    { label: 'Wall Art', action: () => onNavigateListing('category', 'Abstract') }, // Example mapping
    { label: 'Print & Frame', action: () => onNavigateListing('category', 'Modern') }, // Example mapping
    { label: 'Wallpaper', action: () => onNavigateListing() },
    { label: 'Art For Business', action: () => onNavigateListing('roomType', 'Office') } // Example mapping
  ];

  return (
    <header className="bg-white z-50 shadow-sm sticky top-0">
      {/* Consolidated Premium Header Bar */}
      <div className="border-b border-gray-100 px-6 py-3">
        <div className="max-[1440px] mx-auto flex items-center justify-between gap-4 md:gap-8">
          
          {/* Logo Section */}
          <div 
            onClick={onNavigateHome}
            className="flex flex-col cursor-pointer hover:opacity-90 transition-all shrink-0 select-none"
          >
            <div className="flex items-end">
              <span className="text-[24px] md:text-[32px] font-bold leading-none tracking-tight text-[#600b0b] font-serif pr-1">
                Mahatta
              </span>
              <div className="bg-[#600b0b] text-white px-2 py-1 md:px-2.5 md:py-1.5 flex items-center justify-center leading-none">
                <span className="text-lg md:text-2xl font-bold tracking-tight">ART</span>
              </div>
            </div>
            <div className="mt-1 hidden sm:block">
              <p className="text-[8px] md:text-[11px] uppercase tracking-[0.25em] text-gray-500 font-medium whitespace-nowrap">
                Transform Your <span className="text-[#600b0b]/70">Walls</span>
              </p>
            </div>
          </div>

          {/* Center Navigation - New Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0 relative">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={item.action}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-800 hover:text-[#600b0b] transition-colors whitespace-nowrap py-4"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Dynamic Search & Actions Container */}
          <div className="flex items-center justify-end flex-grow gap-1 md:gap-4 min-w-0">
            
            {/* Search Bar */}
            <div className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] h-11 ${
              isSearchExpanded ? 'flex-grow max-w-md' : 'w-11'
            }`}>
              <div className={`absolute inset-0 flex items-center bg-gray-50 rounded-full border transition-all duration-500 ${
                isSearchExpanded 
                  ? 'px-5 opacity-100 border-gray-200 shadow-sm bg-white' 
                  : 'bg-transparent opacity-0 border-transparent pointer-events-none'
              }`}>
                <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search designs..." 
                  className="w-full bg-transparent border-none text-sm outline-none placeholder:text-gray-400"
                />
                <button 
                  onClick={() => setIsSearchExpanded(false)}
                  className="ml-2 p-1 hover:text-rose-900 transition-colors shrink-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {!isSearchExpanded && (
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-11 h-11 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-gray-50 rounded-full transition-all shrink-0"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Utility Icons */}
            <div className="flex items-center gap-0.5 md:gap-2 shrink-0">
              <button 
                onClick={onNavigateWishlist}
                className="relative w-11 h-11 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-gray-50 rounded-full transition-all"
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#600b0b] text-[#600b0b]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 bg-[#600b0b] text-white text-[8px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-0.5 border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button 
                onClick={onNavigateCart}
                className="relative w-11 h-11 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-gray-50 rounded-full transition-all"
                title="Cart"
              >
                <ShoppingBag className={`w-5 h-5 ${cartCount > 0 ? 'text-[#600b0b]' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 bg-[#600b0b] text-white text-[8px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-0.5 border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1"></div>

              <button 
                className="w-11 h-11 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-gray-50 rounded-full transition-all"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
