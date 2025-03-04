
import { Link } from 'react-router-dom';
import { Monument } from '../lib/types';
import { useInView } from '../lib/animations';
import { ChevronRight } from 'lucide-react';

interface MonumentCardProps {
  monument: Monument;
  index: number;
}

const MonumentCard = ({ monument, index }: MonumentCardProps) => {
  const [cardRef, isInView] = useInView({ threshold: 0.1 });
  
  return (
    <div 
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={`bg-white rounded-2xl shadow-elevation-2 overflow-hidden card-hover transition-all duration-500 ease-apple ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={monument.image} 
          alt={monument.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-apple hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2 px-2 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur-sm text-primary-800">
          {monument.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-1">
              {monument.name}
            </h3>
            <p className="text-sm text-neutral-500 mb-3">
              {monument.location}, {monument.state}
            </p>
          </div>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {monument.shortDescription}
        </p>
        
        <div className="border-t border-neutral-100 pt-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-neutral-500">Entry from </span>
              <span className="font-semibold text-neutral-900">₹{monument.ticketPrices.indian}</span>
            </div>
            
            <Link 
              to={`/booking?monument=${monument.id}`}
              className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors"
            >
              Book Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonumentCard;
