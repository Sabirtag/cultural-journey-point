
import React from 'react';
import { Link } from 'react-router-dom';
import { monuments } from '@/lib/data';
import { Monument } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Info } from 'lucide-react';

const MonumentCard: React.FC<{ monument: Monument }> = ({ monument }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={monument.image} 
          alt={monument.name} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{monument.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {monument.location}, {monument.state}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">{monument.shortDescription}</p>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{monument.visitDuration}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          <div className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
            {monument.category}
          </div>
          {monument.guideServiceAvailable && (
            <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Guide Available
            </div>
          )}
          {monument.audioGuideAvailable && (
            <div className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
              Audio Guide
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-sm font-medium">From ₹{monument.ticketPrices.indian}</p>
            <p className="text-xs text-muted-foreground">Indian Nationals</p>
          </div>
          <Link to={`/booking/${monument.id}`}>
            <Button size="sm">Book Tickets</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

const Monuments: React.FC = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Indian Heritage Monuments</h1>
        <p className="mt-2 text-muted-foreground">
          Discover and book tickets for India's most magnificent monuments and heritage sites
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {monuments.map((monument) => (
          <MonumentCard key={monument.id} monument={monument} />
        ))}
      </div>
    </div>
  );
};

export default Monuments;
