
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MonumentCard } from '@/components/MonumentCard';
import { monuments } from '@/lib/data';
import { Search, MapPin, Info, Ticket } from 'lucide-react';

const Index = () => {
  const featuredMonuments = monuments.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-800 to-primary-900 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Experience India's Heritage
            </h1>
            <p className="mb-8 text-lg text-primary-100 md:text-xl">
              Book tickets to India's most magnificent monuments and historical sites.
              Skip the queues, secure certified guides, and immerse yourself in our rich cultural heritage.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/monuments">
                <Button size="lg" className="w-full sm:w-auto">
                  <Ticket className="mr-2 h-5 w-5" />
                  Book Tickets
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full border-primary-400 text-primary-50 hover:bg-primary-800 sm:w-auto">
                <Info className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524613032530-449a5d94c285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
      </section>
      
      {/* Featured Monuments */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Featured Monuments</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore some of India's most iconic heritage sites and book your visit with ease
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredMonuments.map((monument) => (
              <div key={monument.id} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-3">
                <Link to={`/booking/${monument.id}`}>
                  <div className="overflow-hidden rounded-lg border">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={monument.image} 
                        alt={monument.name} 
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-1 text-xl font-semibold">{monument.name}</h3>
                      <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{monument.location}, {monument.state}</span>
                      </div>
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{monument.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">From ₹{monument.ticketPrices.indian}</p>
                          <p className="text-xs text-muted-foreground">Indian Nationals</p>
                        </div>
                        <Button size="sm">Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/monuments">
              <Button variant="outline" size="lg">
                View All Monuments
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-primary-50 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">How It Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Book your monument visit in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">1. Select Monument</h3>
              <p className="text-muted-foreground">
                Browse through our collection of India's magnificent monuments and select your destination.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <Ticket className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">2. Book Tickets</h3>
              <p className="text-muted-foreground">
                Choose your date, number of visitors, and add optional guide services or special permissions.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">3. Visit & Enjoy</h3>
              <p className="text-muted-foreground">
                Receive your e-ticket instantly, skip the queues, and enjoy a hassle-free visit to India's heritage.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-r from-primary-800 to-primary-700 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Explore India's Heritage?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-100">
              Book your tickets now and embark on a journey through time. Experience the magnificence of India's historical monuments without any hassle.
            </p>
            <Link to="/monuments">
              <Button size="lg" variant="secondary" className="bg-white text-primary-700 hover:bg-neutral-100">
                Book Your Visit Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
