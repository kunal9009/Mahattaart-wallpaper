
import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, X, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateListing: (type?: string, value?: string) => void;
  onNavigateWishlist: () => void;
  onNavigateCart: () => void;
  onBack: () => void;
  canGoBack: boolean;
  wishlistCount: number;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateHome, 
  onNavigateListing, 
  onNavigateWishlist, 
  onNavigateCart,
  onBack,
  canGoBack,
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
    { label: 'Wall Art', action: () => onNavigateListing('category', 'Abstract') },
    { label: 'Print & Frame', action: () => onNavigateListing('category', 'Modern') },
    { label: 'Wallpaper', action: () => onNavigateListing() },
    { label: 'Art For Business', action: () => onNavigateListing('roomType', 'Office') }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md z-50 shadow-sm sticky top-0 border-b border-gray-100 font-serif">
      <div className="px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 md:gap-10">
          
          {/* Back Button & Logo Section */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            {canGoBack && (
              <button 
                onClick={onBack}
                className="p-2.5 hover:bg-rose-50 rounded-full text-[#600b0b] transition-all group/back border border-transparent hover:border-rose-100"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-6 h-6 group-hover/back:-translate-x-1 transition-transform" />
              </button>
            )}
            
            <div 
              onClick={onNavigateHome}
              className="flex items-center cursor-pointer hover:opacity-90 transition-all select-none gap-0.5"
            >
              <span className="text-2xl md:text-3xl font-medium tracking-tight text-[#600b0b] font-serif">
                Mahatta
              </span>
              <div className="bg-[#600b0b] text-white px-2 py-1 flex items-center justify-center leading-none ml-1">
                <span className="text-xl md:text-2xl font-medium tracking-tight">ART</span>
              </div>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 shrink-0">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={item.action}
                className="text-base font-normal text-gray-800 hover:text-[#600b0b] transition-colors whitespace-nowrap italic py-2 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#600b0b] transition-all duration-500 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Actions Container */}
          <div className="flex items-center justify-end flex-grow gap-2 md:gap-5">
            <div className={`relative flex items-center transition-all duration-700 h-12 ${
              isSearchExpanded ? 'flex-grow max-w-lg' : 'w-12'
            }`}>
              <div className={`absolute inset-0 flex items-center bg-gray-50 rounded-full border transition-all duration-500 ${
                isSearchExpanded 
                  ? 'px-6 opacity-100 border-gray-200 shadow-xl bg-white' 
                  : 'bg-transparent opacity-0 border-transparent pointer-events-none'
              }`}>
                <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search masterpieces..." 
                  className="w-full bg-transparent border-none text-base outline-none placeholder:text-gray-300 italic font-serif"
                />
                <button 
                  onClick={() => setIsSearchExpanded(false)}
                  className="ml-2 p-1 hover:text-rose-900 transition-colors shrink-0"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {!isSearchExpanded && (
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-rose-50 rounded-full transition-all shrink-0"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 md:gap-3 shrink-0">
              <button 
                onClick={onNavigateWishlist}
                className="relative w-12 h-12 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-rose-50 rounded-full transition-all"
              >
                <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'fill-[#600b0b] text-[#600b0b]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 bg-[#600b0b] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button 
                onClick={onNavigateCart}
                className="relative w-12 h-12 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-rose-50 rounded-full transition-all"
              >
                <ShoppingBag className={`w-6 h-6 ${cartCount > 0 ? 'text-[#600b0b]' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 bg-[#600b0b] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="hidden sm:block w-px h-8 bg-gray-100 mx-2"></div>

              <button 
                className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-[#600b0b] hover:bg-rose-50 rounded-full transition-all"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
