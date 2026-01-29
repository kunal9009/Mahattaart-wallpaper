
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Wallpaper, CartItem } from './types.ts';
import Home from './pages/Home.tsx';
import Listing from './pages/Listing.tsx';
import Wishlist from './pages/Wishlist.tsx';
import Cart from './pages/Cart.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

interface PageState {
  page: Page;
  filter: { type: string; value: string } | null;
}

const App: React.FC = () => {
  // History stack to track navigation
  const [history, setHistory] = useState<PageState[]>([{ page: Page.Home, filter: null }]);
  
  // Computed current state
  const currentState = history[history.length - 1];
  const currentPage = currentState.page;
  const selectedFilter = currentState.filter;

  // E-commerce State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigateTo = useCallback((page: Page, filter: { type: string; value: string } | null = null) => {
    setHistory(prev => [...prev, { page, filter }]);
  }, []);

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history]);

  const navigateToListing = (type: string, value: string) => {
    navigateTo(Page.Listing, { type, value });
  };

  const navigateToHome = () => {
    // If we're going "Home" via a logo click, we usually want to clear history or just jump to home
    // Here we jump to home as a new entry to the stack, or we could reset. Let's push for simplicity.
    navigateTo(Page.Home, null);
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (wallpaper: Wallpaper) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === wallpaper.id);
      if (existing) {
        return prev.map(item => 
          item.id === wallpaper.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...wallpaper, quantity: 1 }];
    });
    navigateTo(Page.Cart, null);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onNavigateListing={navigateToListing} />;
      case Page.Listing:
        return (
          <Listing 
            initialFilter={selectedFilter} 
            onToggleWishlist={toggleWishlist}
            wishlistIds={wishlistIds}
            onAddToCart={addToCart}
            onBack={handleBack}
          />
        );
      case Page.Wishlist:
        return (
          <Wishlist 
            wishlistIds={wishlistIds} 
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
            onNavigateListing={() => navigateToListing('all', 'all')}
            onBack={handleBack}
          />
        );
      case Page.Cart:
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onRemoveItem={removeFromCart}
            onNavigateListing={() => navigateToListing('all', 'all')}
            onBack={handleBack}
          />
        );
      default:
        return <Home onNavigateListing={navigateToListing} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Promotional Discount Band */}
      <div className="bg-rose-900 text-white text-[9px] font-black uppercase tracking-[0.3em] py-1 px-4 text-center z-50 border-b border-rose-800 shadow-sm leading-none flex items-center justify-center gap-1 h-5">
        Get 10% off on your first wallpaper order! Use code: <span className="bg-white text-rose-900 px-1.5 rounded-[1px] ml-1 font-mono leading-none py-0.5">FIRST10</span>
      </div>

      <Header 
        onNavigateHome={navigateToHome} 
        onNavigateListing={() => navigateToListing('all', 'all')} 
        onNavigateWishlist={() => navigateTo(Page.Wishlist, null)}
        onNavigateCart={() => navigateTo(Page.Cart, null)}
        onBack={handleBack}
        canGoBack={history.length > 1 && currentPage !== Page.Home}
        wishlistCount={wishlistIds.size}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
