
import React, { useRef } from 'react';
import { CATEGORIES, SPACES, MOODS, MOCK_WALLPAPERS, PROMISES, REVIEWS } from '../constants.tsx';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Zap, Palette, Ruler, ShieldCheck, Leaf, Award, Sparkles, Star } from 'lucide-react';

interface HomeProps {
  onNavigateListing: (type: string, value: string) => void;
}

// Precise SVG Icons matching the user's screenshot for "Why Mahatta Art"
const WhyEasyIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 68L38 48M28 73L43 53" stroke="#444" strokeWidth="8" strokeLinecap="round"/>
    <path d="M42 32L72 52L62 62L32 42L42 32Z" fill="#444"/>
    <path d="M48 76H78" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
    <path d="M68 76L58 61" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const WhyExpertIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="58" y="38" width="30" height="22" fill="none" stroke="#444" strokeWidth="3"/>
    <path d="M63 51L72 43L78 48L83 43" stroke="#444" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="36" cy="42" r="11" fill="#444"/>
    <path d="M22 78V73C22 65 29 61 36 61C43 61 50 65 50 73V78H22Z" fill="#444"/>
  </svg>
);

const WhyFitIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="68" cy="46" r="21" stroke="#444" strokeWidth="6"/>
    <circle cx="68" cy="46" r="6" fill="#444"/>
    <path d="M28 69H78" stroke="#444" strokeWidth="10" strokeLinecap="round"/>
    <rect x="34" y="59" width="3" height="10" fill="white"/>
    <rect x="44" y="59" width="3" height="7" fill="white"/>
    <rect x="54" y="59" width="3" height="7" fill="white"/>
  </svg>
);

const WhyScratchIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 22C50 22 22 25 22 50C22 75 50 85 50 85C50 85 78 75 78 50C78 25 50 22 50 22Z" stroke="#444" strokeWidth="7" fill="none"/>
    <path d="M40 52L48 60L62 44" stroke="#444" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Navigation Icons
const StyleIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="25" width="70" height="60" rx="2" stroke="#8c1c1c" strokeWidth="3" fill="#fcfcfc"/>
    <path d="M50 15L55 25H45L50 15Z" fill="#333"/>
    <path d="M25 75L45 50L60 65L75 55V75H25Z" fill="#f5f5f5" stroke="#8c1c1c" strokeWidth="1.5"/>
    <circle cx="70" cy="45" r="5" fill="#8c1c1c"/>
  </svg>
);

const MeasurementIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="50" r="25" fill="#8c1c1c"/>
    <circle cx="40" cy="50" r="18" fill="#e5e5e5" stroke="#333" strokeWidth="1"/>
    <rect x="55" y="55" width="35" height="15" fill="white" stroke="#333" strokeWidth="1.5"/>
    <text x="60" y="66" fontSize="8" fontWeight="bold" fill="#333" fontFamily="sans-serif">120 cm</text>
    <path d="M55 55V70M62 55V60M69 55V60M76 55V60M83 55V60" stroke="#333" strokeWidth="1"/>
    <circle cx="40" cy="50" r="5" fill="white" stroke="#333"/>
  </svg>
);

const PrintingIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="35" width="50" height="25" rx="4" fill="#8c1c1c"/>
    <rect x="35" y="25" width="30" height="10" fill="#e5e5e5"/>
    <rect x="35" y="55" width="30" height="25" fill="white" stroke="#333" strokeWidth="1"/>
    <path d="M40 60C45 60 45 75 50 75C55 75 55 60 60 60" stroke="#2d5a27" strokeWidth="1.5" fill="none"/>
    <path d="M42 65L40 70M58 65L60 70" stroke="#2d5a27" strokeWidth="1"/>
    <circle cx="32" cy="47" r="1.5" fill="white"/>
    <circle cx="37" cy="47" r="1.5" fill="white"/>
  </svg>
);

const InstallationIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 10H80V90H20V10Z" fill="#fff9f0"/>
    <path d="M45 40C45 35 55 35 55 40V45H45V40Z" fill="#333"/>
    <rect x="42" y="32" width="16" height="6" rx="3" fill="#8c1c1c"/>
    <path d="M45 45L40 70H60L55 45H45Z" fill="#8c1c1c"/>
    <path d="M40 70L42 90H58L60 70H40Z" fill="#2b4a6d"/>
    <rect x="65" y="40" width="15" height="10" rx="1" fill="#333" stroke="#2b4a6d"/>
    <path d="M55 48L68 45" stroke="#f3a683" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

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

  const SectionHeader = ({ title, subtitle, onClick, icon: HeaderIcon }: { title: string; subtitle?: string; onClick?: () => void; icon?: React.ReactNode }) => (
    <div 
      className={`flex flex-col items-center mb-8 md:mb-12 ${onClick ? 'cursor-pointer group/title' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-1">
        {HeaderIcon && <div className="text-[#600b0b]">{HeaderIcon}</div>}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 tracking-tight text-center group-hover/title:text-[#600b0b] transition-colors duration-300 italic">
          {title}
        </h2>
      </div>
      <div className="w-12 h-[1px] bg-[#600b0b]/30 mt-3"></div>
      {subtitle && (
        <p className="mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.45em] opacity-0 group-hover/title:opacity-100 transition-opacity duration-300 font-serif italic">
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col font-serif">
      {/* SECTION 1: Shop by Categories */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 w-full">
        <SectionHeader 
          title="Shop by Categories" 
          subtitle="View All Designs" 
          onClick={() => onNavigateListing('all', 'all')} 
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div 
              key={cat.name}
              onClick={() => onNavigateListing('category', cat.name)}
              className="group cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:border-[#600b0b] transition-all duration-700">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <span className="text-gray-900 font-serif font-medium text-sm md:text-xl tracking-tight group-hover:text-[#600b0b] transition-colors text-center leading-snug italic">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Shop by Space - Standard 400x300 Tiles */}
      <section className="bg-rose-50/20 py-12 md:py-20 border-y border-rose-100/50 group/space">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Shop by Space" 
            subtitle="Explore All Rooms" 
            onClick={() => onNavigateListing('all', 'all')} 
          />
          <div className="relative">
            <button 
              onClick={() => scrollNav(spaceScrollRef, 'left')}
              className="absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl p-3.5 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/space:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollNav(spaceScrollRef, 'right')}
              className="absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl p-3.5 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/space:opacity-100 hidden md:flex items-center justify-center border border-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div 
              ref={spaceScrollRef}
              className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth px-2"
            >
              {SPACES.map((space) => (
                <div 
                  key={space.name}
                  onClick={() => onNavigateListing('roomType', space.name)}
                  className="flex-shrink-0 flex flex-col items-center gap-5 group cursor-pointer w-[320px] md:w-[400px]"
                >
                  <div className="w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white shadow-md group-hover:border-[#600b0b] transition-all duration-700">
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <span className="font-serif font-medium text-gray-900 text-xl md:text-3xl italic group-hover:text-[#600b0b] transition-colors text-center">
                    {space.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Design Picks for the Month - Enforced 400x300 Tiles */}
      <section className="py-12 md:py-20 group/picks overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
           <SectionHeader 
            title="Design Picks for the Month" 
            icon={<Sparkles className="w-7 h-7 md:w-10 md:h-10" />}
          />
        </div>
        
        <div className="relative px-6 max-w-[1600px] mx-auto">
          <button 
            onClick={() => scrollNav(picksScrollRef, 'left')}
            className="absolute left-12 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md shadow-xl p-6 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/picks:opacity-100 hidden lg:flex items-center justify-center"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={() => scrollNav(picksScrollRef, 'right')}
            className="absolute right-12 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md shadow-xl p-6 rounded-full hover:bg-[#600b0b] hover:text-white transition-all opacity-0 group-hover/picks:opacity-100 hidden lg:flex items-center justify-center"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div 
            ref={picksScrollRef}
            className="flex gap-10 overflow-x-auto no-scrollbar scroll-smooth pb-8 px-10 snap-x snap-mandatory"
          >
            {MOODS.map((mood) => (
              <div 
                key={mood.name}
                onClick={() => onNavigateListing('mood', mood.name)}
                className="relative flex-shrink-0 w-[320px] md:w-[400px] aspect-[4/3] group overflow-hidden rounded-[2.5rem] cursor-pointer shadow-xl snap-center"
              >
                <img src={mood.image} alt={mood.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="uppercase text-[10px] tracking-[0.45em] font-bold text-rose-200 font-serif italic">Atmosphere</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight mb-2 italic">{mood.name}</h3>
                  <p className="text-[13px] text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 leading-relaxed font-serif italic line-clamp-2">
                    {mood.description}
                  </p>
                  <button className="flex items-center gap-3 font-serif font-medium text-xs translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 bg-white text-black py-3 px-8 rounded-full shadow-lg italic">
                    Explore <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: If you are starting out - Enforced 400x300 Tiles */}
      <section className="bg-white py-12 md:py-20 px-6 overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 tracking-tight italic">
              If you are starting out
            </h2>
            <div className="w-12 h-[1px] bg-[#600b0b]/30 mt-4 mb-10"></div>
            <div className="flex gap-5">
              <button onClick={() => scrollTrending('left')} className="p-5 border border-gray-100 rounded-full hover:bg-[#600b0b] hover:text-white transition-all shadow-sm"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={() => scrollTrending('right')} className="p-5 border border-gray-100 rounded-full hover:bg-[#600b0b] hover:text-white transition-all shadow-sm"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
          <div ref={trendingRef} className="flex gap-10 overflow-x-auto snap-x no-scrollbar pb-6">
            {MOCK_WALLPAPERS.map((wp) => (
              <div key={wp.id} className="min-w-[320px] md:min-w-[400px] snap-start group cursor-pointer flex flex-col">
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 relative shadow-md border border-gray-100">
                  <img src={wp.image} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <h3 className="font-serif font-medium text-2xl md:text-3xl text-gray-900 tracking-tight px-1 italic">{wp.name}</h3>
                <p className="text-[#600b0b] font-serif font-medium mt-1 tracking-[0.25em] text-sm px-1 uppercase">₹{wp.price}/sq ft</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Bespoke Production - Enforced 500x400 px image size */}
      <section className="py-16 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col md:flex-row min-h-[550px]">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 md:w-3.5 bg-[#8c1c1c]"></div>
          
          <div className="p-14 md:p-24 lg:p-28 flex flex-col justify-center flex-grow">
            <span className="text-[12px] md:text-base font-bold text-[#c49a6c] uppercase tracking-[0.55em] mb-10">Bespoke Production</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-gray-900 leading-[1.05] mb-10 tracking-tight italic">
              Your vision, <br/>
              <span className="text-[#8c1c1c]">on the wall.</span>
            </h2>
            <p className="text-gray-500 text-xl md:text-3xl font-serif font-light leading-relaxed max-w-2xl mb-14 italic">
              Transform your unique concepts into high-fidelity wall coverings. Precision, artistry, and museum-grade quality in every roll.
            </p>
            <div className="flex items-center gap-8">
              <button className="bg-[#1a1a1a] text-white px-14 py-7 rounded-sm font-serif font-medium uppercase tracking-[0.35em] text-[12px] hover:bg-black transition-all shadow-2xl active:scale-95">
                Begin Commission
              </button>
            </div>
          </div>
          
          {/* 500x400 Image Tile (Aspect 5:4) */}
          <div className="hidden lg:block w-[500px] aspect-[5/4] shrink-0 bg-gray-50 overflow-hidden group self-center mr-16 rounded-[2rem] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover grayscale brightness-95 opacity-80 group-hover:scale-105 transition-transform duration-[6s]" 
              alt="Bespoke Visual"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: How It Works */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif font-medium text-gray-900 tracking-tight italic">
            How It Works
          </h2>
          <p className="text-gray-500 mt-5 text-xl md:text-3xl font-serif italic">Wallpaper made easy.</p>
          <div className="w-16 h-[1px] bg-[#600b0b]/30 mt-8"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
          {[
            { icon: <StyleIcon />, title: 'Find Your Style', desc: 'Browse our signature collections or share your vision.' },
            { icon: <MeasurementIcon />, title: 'Measurements', desc: 'Our experts ensure a perfect fit for every unique wall.' },
            { icon: <PrintingIcon />, title: 'Perfect Printing', desc: 'Museum-grade printing using sustainable materials.' },
            { icon: <InstallationIcon />, title: 'Pro Installation', desc: 'Masterful installation by our skilled craftsmen.' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-48 h-48 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-3xl font-serif font-medium mb-4 text-gray-900 italic tracking-tight">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-serif italic text-lg px-8">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Why Mahatta Art - MATCHING USER SCREENSHOT EXACTLY */}
      <section className="py-20 md:py-32 bg-gray-50/20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Why Mahatta Art" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mt-16">
            {[
              { name: 'Easy Choices & Installation', icon: <WhyEasyIcon /> },
              { name: 'Design Expert Curated', icon: <WhyExpertIcon /> },
              { name: 'Perfectly Made to Fit', icon: <WhyFitIcon /> },
              { name: 'Scratch-resistant', icon: <WhyScratchIcon /> },
            ].map((promise) => (
              <div key={promise.name} className="flex flex-col items-center gap-10 group">
                {/* Circular Icon Container */}
                <div className="w-36 h-36 md:w-48 md:h-48 bg-white border border-gray-100 rounded-full flex items-center justify-center group-hover:shadow-2xl transition-all duration-700 shadow-sm">
                  <div className="w-[90%] h-[90%] rounded-full border border-gray-50 flex items-center justify-center bg-gray-50/10">
                    {promise.icon}
                  </div>
                </div>
                {/* Text Styling matching the screenshot */}
                <div className="flex flex-col items-center text-center min-h-[60px] justify-start">
                  <span className="font-serif font-black text-[#1a2b3c] text-xs md:text-sm lg:text-base uppercase tracking-[0.2em] leading-[1.6] max-w-[200px]">
                    {promise.name.split(' & ').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}{i < arr.length - 1 && <><br />& </>}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Customer Reviews - Enforced 400x300 Tiles */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Customer Reviews" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="flex flex-col md:flex-row gap-10 bg-gray-50/20 p-10 md:p-14 rounded-[3.5rem] shadow-md border border-gray-100 group hover:shadow-2xl transition-all duration-700">
                <div className="w-full md:w-[45%] aspect-[4/3] rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl relative">
                  <img src={rev.image} alt="Installation" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[11px] font-serif font-bold text-[#600b0b] italic tracking-[0.35em] uppercase">Real Result</div>
                </div>
                <div className="flex flex-col justify-center gap-8">
                  <Quote className="w-12 h-12 text-rose-200" />
                  <p className="italic text-gray-700 leading-relaxed text-xl md:text-2xl font-serif font-light">"{rev.text}"</p>
                  <div className="pt-8 border-t border-rose-100">
                    <span className="font-serif font-medium text-[#600b0b] text-lg md:text-xl italic">— {rev.customerName}</span>
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
