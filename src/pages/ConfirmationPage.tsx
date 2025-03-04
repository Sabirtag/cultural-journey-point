
import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Booking, Monument } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, MapPin, User, CreditCard, CheckCircle, Ticket, Clock, Info } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { bookingId } = useParams<{ bookingId: string }>();
  
  // In a real app, you would fetch the booking data from an API
  // For now, we're using the state passed from the booking page
  const { booking, monument } = location.state as { 
    booking: Booking;
    monument: Monument;
  };
  
  if (!booking || !monument) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Booking information not found</h1>
        <p className="mb-6">We couldn't find details for this booking.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Your tickets for {monument.name} have been booked successfully
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Booking ID: {booking.id}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Ticket Code</div>
              <div className="mt-1 rounded-md bg-primary-100 px-2 py-1 text-lg font-bold tracking-wider text-primary-800">
                {booking.ticketCode}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                <img 
                  src={monument.image} 
                  alt={monument.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{monument.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{monument.location}, {monument.state}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{monument.openingHours.weekdays}</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-secondary/50 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-muted-foreground">Date of Visit</div>
                  <div className="mt-1 flex items-center font-medium">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {format(new Date(booking.visitDate), "EEEE, MMM d, yyyy")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Visitor Type</div>
                  <div className="mt-1 flex items-center font-medium capitalize">
                    <User className="mr-1 h-4 w-4" />
                    {booking.visitorType} ({booking.ticketCount} {booking.ticketCount > 1 ? 'tickets' : 'ticket'})
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Payment Status</div>
                  <div className="mt-1 flex items-center font-medium">
                    <CreditCard className="mr-1 h-4 w-4" />
                    <span className="capitalize">{booking.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Additional Services</h4>
              <div className="space-y-2 text-sm">
                {booking.guideRequired && (
                  <div className="flex justify-between">
                    <span>Guide Service ({booking.guideDuration})</span>
                    <span>₹{monument.guideFees?.[booking.guideDuration!] || 0}</span>
                  </div>
                )}
                
                {booking.audioGuideRequired && (
                  <div className="flex justify-between">
                    <span>Audio Guide (x{booking.ticketCount})</span>
                    <span>₹{(monument.audioGuideFee || 0) * booking.ticketCount}</span>
                  </div>
                )}
                
                {booking.photographyPermission && monument.photographyFee > 0 && (
                  <div className="flex justify-between">
                    <span>Photography Permission</span>
                    <span>₹{monument.photographyFee}</span>
                  </div>
                )}
                
                {booking.videoPermission && monument.videoFee > 0 && (
                  <div className="flex justify-between">
                    <span>Video Recording Permission</span>
                    <span>₹{monument.videoFee}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Visitor Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Name</span>
                  <span>{booking.visitorName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email</span>
                  <span>{booking.visitorEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone</span>
                  <span>{booking.visitorPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span>ID Type</span>
                  <span className="capitalize">{booking.visitorIdType}</span>
                </div>
                <div className="flex justify-between">
                  <span>ID Number</span>
                  <span>{booking.visitorIdNumber}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹{booking.totalAmount}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="rounded-md border border-dashed border-primary-300 bg-primary-50 p-4 text-center text-sm">
            <p className="font-medium text-primary-700 mb-1">
              <Info className="inline-block h-4 w-4 mr-1" />
              Please show your ticket code at the entrance
            </p>
            <p className="text-xs text-muted-foreground">
              A copy of this booking confirmation has been sent to your email.
            </p>
          </div>
          
          <div className="flex w-full gap-4">
            <Button className="flex-1" variant="outline">
              <Ticket className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Link to="/" className="flex-1">
              <Button className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Need help with your booking? Contact our support team</p>
        <p className="mt-1">
          <a href="mailto:support@heritagetourism.com" className="text-primary hover:underline">
            support@heritagetourism.com
          </a>
           | 
          <a href="tel:+911234567890" className="text-primary hover:underline ml-1">
            +91 123 456 7890
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
