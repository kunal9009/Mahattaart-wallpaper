
import React, { useRef } from 'react';
import { CATEGORIES, SPACES, MOODS, MOCK_WALLPAPERS, PROMISES, REVIEWS } from '../constants.tsx';
import { ArrowRight, ChevronLeft, ChevronRight, Upload, CheckCircle, Quote, Zap, Palette, Ruler, ShieldCheck, Leaf, Award, Droplets, Sparkles, Star } from 'lucide-react';

interface HomeProps {
  onNavigateListing: (type: string, value: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateListing }) => {
  const trendingRef = useRef<HTMLDivElement>(null);
  const spaceScrollRef = useRef<HTMLDivElement>(null);
  const picksScrollRef = useRef<HTMLDivElement>(null);

  const scrollTrending = (direction: 'left' | 'right') => {
    if (trendingRef.current) {
      const { scrollLeft, clientWidth } = trendingRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      trendingRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const scrollNav = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  // Standard Section Header Component
  const SectionHeader = ({ title, subtitle, onClick, icon: HeaderIcon }: { title: string; subtitle?: string; onClick?: () => void; icon?: React.ReactNode }) => (
    <div 
      className={`flex flex-col items-center mb-6 md:mb-8 ${onClick ? 'cursor-pointer group/title' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-1">
        {HeaderIcon && <div className="text-[#600b0b]">{HeaderIcon}</div>}
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 uppercase tracking-tight text-center group-hover/title:text-[#600b0b] transition-colors duration-300">
          {title}
        </h2>
      </div>
      <div className="w-12 h-1 bg-[#600b0b] mt-2"></div>
      {subtitle && (
        <p className="mt-2 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] opacity-0 group-hover/title:opacity-100 transition-opacity duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );

  const getMoodIcon = (idx: number) => {
    const icons = [
      <Leaf className="w-3 h-3 text-white" />,
      <Zap className="w-3 h-3 text-white" />,
      <Star className="w-3 h-3 text-white" />,
      <Award className="w-3 h-3 text-white" />,
      <ShieldCheck className="w-3 h-3 text-white" />,
      <Sparkles className="w-3 h-3 text-white" />
    ];
    return icons[idx % icons.length];
  };

  return (
    <div className="flex flex-col">
      {/* SECTION 1: Shop by Categories */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6 w-full">
        <SectionHeader 
          title="Shop by Categories" 
          subtitle="View All Designs" 
          onClick={() => onNavigateListing('all', 'all')} 
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div 
              key={cat.name}
              onClick={() => onNavigateListing('category', cat.name)}
              className="group cursor-pointer flex flex-col items-center gap-3"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-[#600b0b] group-hover:shadow-lg transition-all duration-500">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <span className="text-gray-900 font-black text-[10px] md:text-[11px] tracking-widest uppercase group-hover:text-[#600b0b] transition-colors text-center leading-snug">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Shop by Space */}
      <section className="bg-rose-50/20 py-12 md:py-16 border-y border-rose-100/50 group/space">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Shop by Space" 
            subtitle="Explore All Rooms" 
            onClick={() => onNavigateListing('all', 'all')} 
          />
          <div className="relative px-4">
            <button 
              onClick={() => scrollNav(spaceScrollRef, 'left')}
              className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/space:opacity-100 hidden md:block"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollNav(spaceScrollRef, 'right')}
              className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/space:opacity-100 hidden md:block"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div 
              ref={spaceScrollRef}
              className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-2"
            >
              {SPACES.map((space) => (
                <div 
                  key={space.name}
                  onClick={() => onNavigateListing('roomType', space.name)}
                  className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer w-44 md:w-60"
                >
                  <div className="w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-white shadow-sm group-hover:border-[#600b0b] transition-all duration-700">
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <span className="font-black text-gray-900 uppercase tracking-[0.2em] text-[10px] md:text-[11px] group-hover:text-[#600b0b] transition-colors text-center">
                    {space.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Design Picks for the Month - HORIZONTAL SCROLL VERSION */}
      <section className="py-12 md:py-16 group/picks">
        <div className="max-w-7xl mx-auto px-6 mb-8">
           <SectionHeader 
            title="Design Picks for the Month" 
            icon={<Sparkles className="w-6 h-6 md:w-8 md:h-8" />}
          />
        </div>
        
        <div className="relative px-6 max-w-[1600px] mx-auto">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scrollNav(picksScrollRef, 'left')}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-md shadow-2xl p-4 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/picks:opacity-100 hidden lg:flex items-center justify-center border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scrollNav(picksScrollRef, 'right')}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-md shadow-2xl p-4 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/picks:opacity-100 hidden lg:flex items-center justify-center border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={picksScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 px-4 snap-x snap-mandatory"
          >
            {MOODS.map((mood, idx) => (
              <div 
                key={mood.name}
                onClick={() => onNavigateListing('mood', mood.name)}
                className="relative flex-shrink-0 w-[300px] md:w-[420px] h-[400px] md:h-[540px] group overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl snap-center"
              >
                <img src={mood.image} alt={mood.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                
                {/* Feature Icons at Top Right */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30" title="Eco Friendly">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30" title="Durable">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                    <span className="uppercase text-[10px] tracking-[0.5em] font-black text-rose-200">Atmosphere</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">{mood.name}</h3>
                    <div className="p-2.5 bg-rose-900/40 backdrop-blur-md rounded-full border border-rose-400/30">
                      {getMoodIcon(idx)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 leading-relaxed font-light line-clamp-2">
                    {mood.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 font-black uppercase tracking-[0.3em] text-[10px] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black py-3 px-8 rounded-full shadow-xl">
                      Explore <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      <Award className="w-5 h-5 text-rose-200" />
                      <Sparkles className="w-5 h-5 text-rose-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: If you are starting out */}
      <section className="bg-white py-12 md:py-16 px-6 overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 uppercase tracking-tight">
              If you are starting out
            </h2>
            <div className="w-12 h-1 bg-[#600b0b] mt-2 mb-6"></div>
            <div className="flex gap-3">
              <button onClick={() => scrollTrending('left')} className="p-3 border border-gray-100 rounded-full hover:bg-[#600b0b] hover:text-white transition-all shadow-sm active:scale-95"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => scrollTrending('right')} className="p-3 border border-gray-100 rounded-full hover:bg-[#600b0b] hover:text-white transition-all shadow-sm active:scale-95"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div ref={trendingRef} className="flex gap-6 overflow-x-auto snap-x no-scrollbar pb-4">
            {MOCK_WALLPAPERS.map((wp) => (
              <div key={wp.id} className="min-w-[260px] md:min-w-[320px] snap-start group cursor-pointer flex flex-col">
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm border border-gray-100">
                  <img src={wp.image} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 right-4 bg-[#600b0b] text-white px-3 py-1 rounded-full text-[8px] font-black shadow-lg uppercase tracking-[0.1em]">
                    Premium
                  </div>
                </div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 tracking-tight px-1">{wp.name}</h3>
                <p className="text-[#600b0b] font-black mt-1 tracking-[0.2em] text-[11px] uppercase px-1">₹{wp.price}/sq ft</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Custom Design Section */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6">
        <div className="bg-[#111] rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-xl min-h-[400px]">
          <div className="w-full md:w-1/2 p-8 lg:p-14 flex flex-col justify-center text-white">
            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-6 leading-tight">
              Have a design in mind? <br/>We'll make it wallpaper-ready.
            </h2>
            <div className="space-y-3 mb-8">
              <p className="flex items-center gap-3 text-gray-400 text-xs md:text-sm"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Let users upload their own image.</p>
              <p className="flex items-center gap-3 text-gray-400 text-xs md:text-sm"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Wall fit validation included.</p>
              <p className="flex items-center gap-3 text-rose-400 font-bold italic text-xs md:text-sm"><CheckCircle className="w-4 h-4 text-rose-500 shrink-0" /> 3-day designer turnaround.</p>
            </div>
            <label className="bg-white text-black px-8 py-3.5 rounded-full font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-50 transition-all w-fit shadow-lg text-[10px] active:scale-95">
              <Upload className="w-4 h-4" />
              Upload Design
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="w-full md:w-1/2 bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40"></div>
        </div>
      </section>

      {/* SECTION 6: How It Works */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 uppercase tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base font-light italic">Wallpaper made easy.</p>
          <div className="w-12 h-1 bg-[#600b0b] mt-3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {[
            { step: 1, title: 'Find Your Style', desc: 'Browse our curated collections or upload a design.' },
            { step: 2, title: 'Measurements', desc: 'Share approximate size — our experts verify everything.' },
            { step: 3, title: 'Perfect Printing', desc: 'Custom-printed using eco-friendly materials.' },
            { step: 4, title: 'Pro Installation', desc: 'Seamless finishing by our experts.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#600b0b] flex items-center justify-center text-2xl font-black mb-4 group-hover:bg-[#600b0b] group-hover:text-white transition-all duration-500 shadow-sm border border-rose-100/50">
                {item.step}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 tracking-tight uppercase leading-tight px-1">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-xs px-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Why Mahatta Art */}
      <section className="py-12 md:py-16 bg-gray-50/30 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Why Mahatta Art" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              { name: 'Easy Choices & Installation', icon: <Zap className="w-8 h-8 md:w-10 md:h-10" /> },
              { name: 'Design Expert Curated', icon: <Palette className="w-8 h-8 md:w-10 md:h-10" /> },
              { name: 'Perfectly Made to Fit', icon: <Ruler className="w-8 h-8 md:w-10 md:h-10" /> },
              { name: 'Scratch-resistant', icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" /> },
            ].map((promise) => (
              <div key={promise.name} className="flex flex-col items-center gap-4 group">
                <div className="bg-white p-6 md:p-8 rounded-full group-hover:bg-[#600b0b] transition-all duration-700 shadow-sm border border-gray-100">
                  {React.cloneElement(promise.icon as React.ReactElement, { className: "text-[#600b0b] group-hover:text-white transition-colors" })}
                </div>
                <span className="font-black text-gray-900 uppercase tracking-[0.2em] text-[9px] md:text-[10px] text-center max-w-[160px] leading-relaxed">{promise.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Customer Reviews */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Customer Reviews" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="flex flex-col md:flex-row gap-6 bg-gray-50/50 p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-700">
                <div className="w-full md:w-[40%] aspect-[4/5] rounded-[1rem] overflow-hidden shrink-0 shadow-sm relative">
                  <img src={rev.image} alt="Installation" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] font-black text-[#600b0b] uppercase tracking-widest">Real Result</div>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <Quote className="w-8 h-8 text-rose-100" />
                  <p className="italic text-gray-700 leading-relaxed text-base md:text-lg font-light">"{rev.text}"</p>
                  <div className="pt-4 border-t border-rose-100">
                    <span className="font-black text-[#600b0b] uppercase tracking-[0.3em] text-[10px] md:text-[11px]">— {rev.customerName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
