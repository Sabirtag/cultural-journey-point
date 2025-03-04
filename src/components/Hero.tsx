
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../lib/animations';

const Hero = () => {
  const [containerRef, isInView] = useInView({ threshold: 0.1 });
  
  return (
    <section 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
          alt="Indian heritage monument"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-6 pt-10 pb-20 relative z-10">
        <div className="max-w-3xl">
          <div className={`transition-all duration-1000 ease-apple ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white/90 mb-6">
              Explore India's Rich Heritage
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Discover the Architectural Marvels of India
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Experience seamless ticketing, certified guides, and immersive cultural journeys at UNESCO World Heritage Sites and ASI protected monuments.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/monuments"
                className="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-apple inline-flex items-center justify-center active:scale-95"
              >
                Explore Monuments
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/booking"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium border border-white/30 inline-flex items-center justify-center transition-all duration-300 ease-apple active:scale-95"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
