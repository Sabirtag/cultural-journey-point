
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Booking } from '../lib/types';
import { getMonument } from '../lib/data';
import { CheckCircle2, Calendar, MapPin, Download, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  booking: Booking;
}

const BookingConfirmation = ({ booking }: BookingConfirmationProps) => {
  const [monument, setMonument] = useState(getMonument(booking.monumentId));
  
  const getVisitorTypeDisplay = (type: string): string => {
    switch (type) {
      case 'indian': return 'Indian Citizen';
      case 'foreign': return 'Foreign National';
      case 'children': return 'Child (Under 15)';
      case 'seniorCitizen': return 'Senior Citizen';
      case 'student': return 'Student';
      default: return type;
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-elevation-2 overflow-hidden">
        {/* Success Header */}
        <div className="bg-primary-500/10 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Booking Confirmed!</h2>
          <p className="text-neutral-600">Your tickets have been booked successfully</p>
        </div>
        
        {/* Ticket Code */}
        <div className="p-6 text-center border-b border-neutral-100">
          <div className="text-sm text-neutral-500 mb-1">Ticket Code</div>
          <div className="text-xl font-mono font-semibold tracking-wider">{booking.ticketCode}</div>
          <div className="text-xs text-neutral-500 mt-1">
            Show this code at the entrance
          </div>
        </div>

        {/* Monument Details */}
        <div className="p-6 flex flex-col sm:flex-row gap-4 border-b border-neutral-100">
          <div className="sm:w-1/3">
            <div className="h-24 sm:h-full overflow-hidden rounded-lg">
              <img 
                src={monument?.image} 
                alt={monument?.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">{monument?.name}</h3>
            <div className="flex items-center mb-3 text-sm text-neutral-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{monument?.location}, {monument?.state}</span>
            </div>
            <div className="flex items-center text-sm text-neutral-600 font-medium">
              <Calendar className="h-4 w-4 mr-1 text-primary-600" />
              <span>Visit Date: {format(booking.visitDate, 'EEEE, dd MMMM yyyy')}</span>
            </div>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="p-6 space-y-4">
          <h4 className="font-medium text-neutral-900">Booking Details</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Booking ID</span>
              <span className="font-medium">{booking.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Visitor</span>
              <span className="font-medium">{booking.visitorName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Visitor Type</span>
              <span>{getVisitorTypeDisplay(booking.visitorType)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Number of Tickets</span>
              <span>{booking.ticketCount}</span>
            </div>
            
            <Separator className="my-2" />
            
            {booking.guideRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Guide Service</span>
                <span>Yes ({booking.guideDuration})</span>
              </div>
            )}
            
            {booking.audioGuideRequired && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Audio Guide</span>
                <span>Yes</span>
              </div>
            )}
            
            {booking.photographyPermission && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Photography Permission</span>
                <span>Yes</span>
              </div>
            )}
            
            {booking.videoPermission && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Video Recording Permission</span>
                <span>Yes</span>
              </div>
            )}
            
            <Separator className="my-2" />
            
            <div className="flex justify-between text-sm font-medium">
              <span>Total Amount</span>
              <span>₹{booking.totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Payment Status</span>
              <span className="text-green-600 font-medium capitalize">{booking.paymentStatus}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Booked On</span>
              <span>{format(booking.bookingTime, 'dd MMM yyyy, hh:mm a')}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-neutral-100">
            <Button 
              className="bg-primary-600 hover:bg-primary-700 text-white shadow-subtle flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Button 
              variant="outline"
              className="border-neutral-200 hover:bg-neutral-50 text-neutral-700 flex-1"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Ticket
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          to="/monuments" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Explore More Monuments
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
