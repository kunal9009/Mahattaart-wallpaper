
import React, { useState, useMemo } from 'react';
import { MOCK_WALLPAPERS, CATEGORIES, SPACES, SUB_CATEGORIES } from '../constants.tsx';
import { Filter, ChevronDown, Heart, Plus, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { Wallpaper } from '../types.ts';

interface ListingProps {
  initialFilter: { type: string; value: string } | null;
  onToggleWishlist: (id: string) => void;
  wishlistIds: Set<string>;
  onAddToCart: (item: Wallpaper) => void;
  onBack: () => void;
}

const Listing: React.FC<ListingProps> = ({ 
  initialFilter, 
  onToggleWishlist, 
  wishlistIds,
  onAddToCart,
  onBack
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Relevance');
  const [activeFilters, setActiveFilters] = useState({
    category: initialFilter?.type === 'category' ? initialFilter.value : 'all',
    roomType: initialFilter?.type === 'roomType' ? initialFilter.value : 'all',
    mood: initialFilter?.type === 'mood' ? initialFilter.value : 'all',
    subCategory: 'all'
  });

  const categoryContext = useMemo(() => {
    if (activeFilters.category !== 'all') {
      return CATEGORIES.find(c => c.name === activeFilters.category);
    }
    return CATEGORIES[0];
  }, [activeFilters.category]);

  const subCategories = useMemo(() => {
    if (activeFilters.category !== 'all' && SUB_CATEGORIES[activeFilters.category]) {
      return SUB_CATEGORIES[activeFilters.category];
    }
    return ['Patterns', 'Abstract', 'Minimalist', 'Artisan'];
  }, [activeFilters.category]);

  const filteredWallpapers = useMemo(() => {
    return MOCK_WALLPAPERS.filter(wp => {
      if (activeFilters.category !== 'all' && wp.category !== activeFilters.category) return false;
      if (activeFilters.roomType !== 'all' && wp.roomType !== activeFilters.roomType) return false;
      if (activeFilters.mood !== 'all' && wp.mood !== activeFilters.mood) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low → High') return a.price - b.price;
      if (sortBy === 'Price: High → Low') return b.price - a.price;
      return 0;
    });
  }, [activeFilters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero */}
      <section className="relative h-[300px] md:h-[400px] w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <img 
          src={categoryContext?.image} 
          alt="Context" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-transform duration-[10s] hover:scale-110" 
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-2 tracking-tight">
            {activeFilters.category === 'all' ? 'The Collection' : activeFilters.category}
          </h1>
          <p className="text-rose-100/80 text-base md:text-lg font-light italic mb-6 max-w-xl mx-auto">
            Artisan-curated wall coverings designed to breathe life into sophisticated interiors.
          </p>
          
          <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-2">
            <button 
              onClick={() => setActiveFilters(prev => ({ ...prev, subCategory: 'all' }))}
              className="flex-shrink-0"
            >
              <div className={`px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-[0.2em] transition-all ${activeFilters.subCategory === 'all' ? 'bg-white text-rose-900 border-white' : 'bg-black/20 text-white border-white/30 hover:bg-white/10'}`}>
                All Designs
              </div>
            </button>
            {subCategories.map(sub => (
              <button 
                key={sub}
                onClick={() => setActiveFilters(prev => ({ ...prev, subCategory: sub }))}
                className="flex-shrink-0"
              >
                <div className={`px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-[0.2em] transition-all ${activeFilters.subCategory === sub ? 'bg-white text-rose-900 border-white' : 'bg-black/20 text-white border-white/30 hover:bg-white/10'}`}>
                  {sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <button onClick={onBack} className="flex items-center gap-1.5 hover:text-rose-900 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <span className="w-px h-3 bg-gray-200"></span>
          <div className="flex items-center gap-2">
            <span className="text-rose-900">{activeFilters.category === 'all' ? 'All Wallpapers' : activeFilters.category}</span>
          </div>
        </div>
        <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest italic">
          {filteredWallpapers.length} Designs
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 md:py-10 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setFilterDrawerOpen(true)}
            className="bg-white border-2 border-rose-900 text-rose-900 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-rose-900 hover:text-white transition-all shadow-sm"
          >
            <Filter className="w-3.5 h-3.5" /> Refine Collection
          </button>

          <div className="relative group">
            <button className="flex items-center gap-6 px-5 py-3 border-b border-rose-900 text-[10px] font-bold uppercase tracking-widest text-gray-800 bg-gray-50/50">
              Sort: {sortBy} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-100 shadow-xl z-40 w-56 hidden group-hover:block rounded-lg overflow-hidden">
              {['Relevance', 'Newest Arrivals', 'Price: Low → High', 'Price: High → Low'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className="w-full text-left px-5 py-3 hover:bg-rose-50 text-[9px] font-medium uppercase tracking-widest text-gray-600"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredWallpapers.map((wp) => (
            <div key={wp.id} className="group flex flex-col">
              {/* Standardized Aspect Ratio updated to 4:3 (400x300) */}
              <div className="aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm border border-gray-100">
                <img src={wp.image} alt={wp.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(wp.id); }}
                    className={`bg-white/95 p-2.5 rounded-full shadow-lg ${wishlistIds.has(wp.id) ? 'text-rose-800' : 'text-gray-400'}`}
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.has(wp.id) ? 'fill-rose-800' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(wp); }}
                    className="bg-rose-900 text-white p-2.5 rounded-full shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-gray-800 group-hover:text-rose-900 truncate pr-4 italic">{wp.name}</h3>
                  <p className="text-lg font-serif font-medium text-rose-900">₹{wp.price}</p>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 italic">
                  <span>{wp.collection}</span>
                  <span className="w-1 h-1 bg-rose-100 rounded-full"></span>
                  <span>{wp.surface}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
