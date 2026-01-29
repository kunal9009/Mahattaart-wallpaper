
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
      <section className="relative h-[400px] md:h-[500px] w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <img 
          src={categoryContext?.image} 
          alt="Context" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-transform duration-[10s] hover:scale-110" 
        />
        <div className="relative z-10 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-xl">
            {activeFilters.category === 'all' ? 'The Collection' : activeFilters.category}
          </h1>
          <p className="text-rose-100/80 text-lg md:text-xl font-light italic mb-10 max-w-xl mx-auto drop-shadow-md">
            Artisan-curated wall coverings designed to breathe life into sophisticated interiors.
          </p>
          
          <div className="flex items-center justify-center gap-4 overflow-x-auto no-scrollbar py-4 px-10">
            <button 
              onClick={() => setActiveFilters(prev => ({ ...prev, subCategory: 'all' }))}
              className="flex-shrink-0"
            >
              <div className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeFilters.subCategory === 'all' ? 'bg-white text-rose-900 border-white shadow-xl scale-105' : 'bg-black/20 backdrop-blur-md text-white border-white/30 hover:bg-white/10'}`}>
                All Designs
              </div>
            </button>
            {subCategories.map(sub => (
              <button 
                key={sub}
                onClick={() => setActiveFilters(prev => ({ ...prev, subCategory: sub }))}
                className="flex-shrink-0"
              >
                <div className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeFilters.subCategory === sub ? 'bg-white text-rose-900 border-white shadow-xl scale-105' : 'bg-black/20 backdrop-blur-md text-white border-white/30 hover:bg-white/10'}`}>
                  {sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb & Count */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 hover:text-rose-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span className="w-px h-3 bg-gray-200"></span>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveFilters(p => ({...p, category: 'all'}))} className="hover:text-rose-900 transition-colors">Collections</button>
            <ChevronRight className="w-3 h-3 text-rose-300" />
            <span className="text-rose-900">{activeFilters.category === 'all' ? 'All Wallpapers' : activeFilters.category}</span>
          </div>
        </div>
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest italic">
          Showing {filteredWallpapers.length} Wallpapers
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col">
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => setFilterDrawerOpen(true)}
            className="bg-white border-2 border-rose-900 text-rose-900 px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-rose-900 hover:text-white transition-all shadow-sm"
          >
            <Filter className="w-4 h-4" /> Refine Collection
          </button>

          <div className="relative group">
            <button className="flex items-center gap-8 px-6 py-3.5 border-b-2 border-rose-900 text-[11px] font-black uppercase tracking-widest text-gray-800 bg-gray-50/50 hover:bg-gray-100 transition-colors">
              Sort By: {sortBy} <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 shadow-2xl z-40 w-64 hidden group-hover:block divide-y divide-gray-50 rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {['Relevance', 'Newest Arrivals', 'Price: Low → High', 'Price: High → Low'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className="w-full text-left px-6 py-4 hover:bg-rose-50 text-[10px] font-bold uppercase tracking-widest text-gray-600 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {filteredWallpapers.map((wp) => (
            <div key={wp.id} className="group relative cursor-pointer flex flex-col">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 relative shadow-md border border-gray-100">
                <img src={wp.image} alt={wp.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(wp.id); }}
                    className={`bg-white/95 backdrop-blur-sm p-3.5 rounded-full shadow-xl transition-all hover:scale-110 ${wishlistIds.has(wp.id) ? 'text-rose-800' : 'text-gray-400 hover:text-rose-800'}`}
                  >
                    <Heart className={`w-5 h-5 ${wishlistIds.has(wp.id) ? 'fill-rose-800' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(wp); }}
                    className="bg-rose-900 text-white p-3.5 rounded-full shadow-xl hover:bg-rose-800 transition-all hover:scale-110"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                   <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-1">{wp.mood} Experience</p>
                   <button className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">View Details <ArrowLeft className="w-3 h-3 rotate-180" /></button>
                </div>
              </div>

              <div className="flex flex-col gap-1 px-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-rose-900 transition-colors truncate pr-6">{wp.name}</h3>
                  <p className="text-xl font-serif font-black text-rose-900">₹{wp.price}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 italic">
                  <span>{wp.collection}</span>
                  <span className="w-1.5 h-1.5 bg-rose-100 rounded-full"></span>
                  <span>{wp.surface}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setFilterDrawerOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-10 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-800">Refine Selection</h2>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-rose-900 mb-6 border-b border-rose-50 pb-2">Category</h3>
                <div className="grid grid-cols-1 gap-3">
                  {['Modern', 'Florals', 'Abstract', 'Classic & Vintage'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setActiveFilters(p => ({...p, category: c}))}
                      className={`text-left px-5 py-3 rounded-xl border-2 text-[11px] font-black uppercase tracking-widest transition-all ${activeFilters.category === c ? 'bg-rose-900 text-white border-rose-900' : 'border-gray-50 hover:border-rose-100'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-rose-900 mb-6 border-b border-rose-50 pb-2">Mood & Atmosphere</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Calm', 'Bold', 'Playful', 'Sophisticated'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setActiveFilters(p => ({...p, mood: m}))} 
                      className={`px-4 py-3.5 rounded-xl border-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeFilters.mood === m ? 'bg-rose-900 text-white border-rose-900 shadow-lg' : 'border-gray-50 hover:border-rose-100'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setFilterDrawerOpen(false)}
              className="mt-16 w-full bg-rose-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-rose-800 transition-all scale-100 hover:scale-[1.02] active:scale-95"
            >
              Apply Filter Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
