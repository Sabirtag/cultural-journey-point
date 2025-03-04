
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Booking, Monument, VisitorType, GuideDuration, IDType } from '../lib/types';
import { getMonument, generateBookingId, generateTicketCode } from '../lib/data';
import { CalendarIcon, MapPin, Clock, Info, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

interface BookingFormProps {
  onBookingComplete: (booking: Booking) => void;
}

const BookingForm = ({ onBookingComplete }: BookingFormProps) => {
  const [searchParams] = useSearchParams();
  const monumentId = searchParams.get('monument') || '';
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [visitorType, setVisitorType] = useState<VisitorType>('indian');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorEmail, setVisitorEmail] = useState<string>('');
  const [visitorPhone, setVisitorPhone] = useState<string>('');
  const [visitorIdType, setVisitorIdType] = useState<IDType>('aadhar');
  const [visitorIdNumber, setVisitorIdNumber] = useState<string>('');
  const [guideRequired, setGuideRequired] = useState<boolean>(false);
  const [guideDuration, setGuideDuration] = useState<GuideDuration>('hourly');
  const [audioGuideRequired, setAudioGuideRequired] = useState<boolean>(false);
  const [photographyPermission, setPhotographyPermission] = useState<boolean>(false);
  const [videoPermission, setVideoPermission] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (monumentId) {
      const monument = getMonument(monumentId);
      if (monument) {
        setSelectedMonument(monument);
      } else {
        navigate('/monuments');
        toast({
          title: "Monument Not Found",
          description: "The selected monument could not be found.",
          variant: "destructive",
        });
      }
    }
  }, [monumentId, navigate, toast]);

  // Calculate total amount whenever any relevant field changes
  useEffect(() => {
    if (!selectedMonument || !date) return;

    setIsCalculating(true);
    
    let price = 0;
    
    // Base ticket price based on visitor type
    if (visitorType === 'indian') {
      price = selectedMonument.ticketPrices.indian;
    } else if (visitorType === 'foreign') {
      price = selectedMonument.ticketPrices.foreign;
    } else if (visitorType === 'children') {
      price = selectedMonument.ticketPrices.children;
    } else if (visitorType === 'seniorCitizen' && selectedMonument.ticketPrices.seniorCitizen) {
      price = selectedMonument.ticketPrices.seniorCitizen;
    } else if (visitorType === 'student' && selectedMonument.ticketPrices.studentDiscount) {
      price = selectedMonument.ticketPrices.indian * (1 - selectedMonument.ticketPrices.studentDiscount / 100);
    }
    
    // Multiply by ticket count
    price *= ticketCount;
    
    // Add guide fee if required
    if (guideRequired && selectedMonument.guideFees) {
      if (guideDuration === 'hourly' && selectedMonument.guideFees.hourly) {
        price += selectedMonument.guideFees.hourly;
      } else if (guideDuration === 'halfDay' && selectedMonument.guideFees.halfDay) {
        price += selectedMonument.guideFees.halfDay;
      } else if (guideDuration === 'fullDay' && selectedMonument.guideFees.fullDay) {
        price += selectedMonument.guideFees.fullDay;
      }
    }
    
    // Add audio guide fee if required
    if (audioGuideRequired && selectedMonument.audioGuideAvailable && selectedMonument.audioGuideFee) {
      price += selectedMonument.audioGuideFee;
    }
    
    // Add photography fee if required
    if (photographyPermission && selectedMonument.photographyFee) {
      price += selectedMonument.photographyFee;
    }
    
    // Add video fee if required
    if (videoPermission && selectedMonument.videoFee) {
      price += selectedMonument.videoFee;
    }
    
    setTotalAmount(price);
    setIsCalculating(false);
  }, [selectedMonument, date, visitorType, ticketCount, guideRequired, guideDuration, audioGuideRequired, photographyPermission, videoPermission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMonument || !date) {
      toast({
        title: "Error",
        description: "Please select a monument and date.",
        variant: "destructive",
      });
      return;
    }
    
    if (!visitorName || !visitorEmail || !visitorPhone || !visitorIdNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create booking object
    const booking: Booking = {
      id: generateBookingId(),
      monumentId: selectedMonument.id,
      visitDate: date,
      visitorType,
      ticketCount,
      totalAmount,
      visitorName,
      visitorEmail,
      visitorPhone,
      visitorIdType,
      visitorIdNumber,
      guideRequired,
      guideDuration: guideRequired ? guideDuration : undefined,
      audioGuideRequired,
      photographyPermission,
      videoPermission,
      bookingTime: new Date(),
      paymentStatus: 'completed', // Simulate payment for demo
      bookingStatus: 'confirmed',
      ticketCode: generateTicketCode(),
    };
    
    // In a real app, we would submit this to a backend
    // For now, we'll simulate success and show confirmation
    setTimeout(() => {
      onBookingComplete(booking);
    }, 1000);
  };

  if (!selectedMonument) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-neutral-500">Loading monument details...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Monument Details */}
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <div className="h-24 sm:h-full overflow-hidden rounded-xl">
              <img 
                src={selectedMonument.image} 
                alt={selectedMonument.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900">{selectedMonument.name}</h3>
            <div className="flex items-center mt-1 text-sm text-neutral-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{selectedMonument.location}, {selectedMonument.state}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-neutral-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Visit Duration: {selectedMonument.visitDuration}</span>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-neutral-600">Opening Hours: </span>
              <span className="text-neutral-800">{selectedMonument.openingHours.weekdays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Visit Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Visit Date</Label>
            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setIsDateOpen(false);
                  }}
                  initialFocus
                  disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Visitor Type */}
          <div className="space-y-2">
            <Label htmlFor="visitor-type">Visitor Type</Label>
            <Select value={visitorType} onValueChange={(value) => setVisitorType(value as VisitorType)}>
              <SelectTrigger id="visitor-type">
                <SelectValue placeholder="Select visitor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indian">Indian Citizen</SelectItem>
                <SelectItem value="foreign">Foreign National</SelectItem>
                <SelectItem value="children">Child (Under 15)</SelectItem>
                <SelectItem value="seniorCitizen">Senior Citizen</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Tickets */}
          <div className="space-y-2">
            <Label htmlFor="ticket-count">Number of Tickets</Label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="h-10 w-10"
              >
                -
              </Button>
              <Input
                id="ticket-count"
                type="number"
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-10 mx-2 text-center w-20"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTicketCount(ticketCount + 1)}
                className="h-10 w-10"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="space-y-4 border-t border-neutral-100 pt-6 mt-6">
          <h3 className="text-lg font-semibold">Additional Services</h3>
          
          {/* Guide Service */}
          {selectedMonument.guideServiceAvailable && (
            <div className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors">
              <div>
                <div className="font-medium">Guide Service</div>
                <div className="text-sm text-neutral-500">
                  Professional guide with expertise in site history and culture
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={guideRequired}
                  onCheckedChange={setGuideRequired}
                  id="guide-service"
                />
              </div>
            </div>
          )}
          
          {/* Guide Duration (only if guide service is selected) */}
          {guideRequired && selectedMonument.guideServiceAvailable && (
            <div className="pl-4 ml-2 border-l-2 border-neutral-100">
              <div className="space-y-2">
                <Label htmlFor="guide-duration">Guide Duration</Label>
                <Select value={guideDuration} onValueChange={(value) => setGuideDuration(value as GuideDuration)}>
                  <SelectTrigger id="guide-duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMonument.guideFees?.hourly && (
                      <SelectItem value="hourly">Hourly (₹{selectedMonument.guideFees.hourly})</SelectItem>
                    )}
                    {selectedMonument.guideFees?.halfDay && (
                      <SelectItem value="halfDay">Half Day (₹{selectedMonument.guideFees.halfDay})</SelectItem>
                    )}
                    {selectedMonument.guideFees?.fullDay && (
                      <SelectItem value="fullDay">Full Day (₹{selectedMonument.guideFees.fullDay})</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Audio Guide */}
          {selectedMonument.audioGuideAvailable && (
            <div className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors">
              <div>
                <div className="font-medium">Audio Guide</div>
                <div className="text-sm text-neutral-500">
                  Self-guided audio tour (₹{selectedMonument.audioGuideFee})
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={audioGuideRequired}
                  onCheckedChange={setAudioGuideRequired}
                  id="audio-guide"
                />
              </div>
            </div>
          )}
          
          {/* Photography Permission */}
          {selectedMonument.isPhotographyAllowed && (
            <div className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors">
              <div>
                <div className="font-medium">Photography Permission</div>
                <div className="text-sm text-neutral-500">
                  {selectedMonument.photographyFee ? `Photography fee (₹${selectedMonument.photographyFee})` : 'No additional fee required'}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={photographyPermission}
                  onCheckedChange={setPhotographyPermission}
                  id="photography"
                />
              </div>
            </div>
          )}
          
          {/* Video Permission */}
          {selectedMonument.isVideoAllowed && (
            <div className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors">
              <div>
                <div className="font-medium">Video Recording Permission</div>
                <div className="text-sm text-neutral-500">
                  Video recording fee (₹{selectedMonument.videoFee})
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={videoPermission}
                  onCheckedChange={setVideoPermission}
                  id="video"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visitor Information */}
      <div className="space-y-6 border-t border-neutral-100 pt-6 mt-6">
        <h3 className="text-lg font-semibold">Visitor Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="visitor-name">Full Name</Label>
            <Input
              id="visitor-name"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitor-email">Email</Label>
            <Input
              id="visitor-email"
              type="email"
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitor-phone">Phone Number</Label>
            <Input
              id="visitor-phone"
              value={visitorPhone}
              onChange={(e) => setVisitorPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id-type">ID Type</Label>
            <Select value={visitorIdType} onValueChange={(value) => setVisitorIdType(value as IDType)}>
              <SelectTrigger id="id-type">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aadhar">Aadhar Card</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="driverLicense">Driver's License</SelectItem>
                <SelectItem value="voterID">Voter ID</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="id-number">ID Number</Label>
            <Input
              id="id-number"
              value={visitorIdNumber}
              onChange={(e) => setVisitorIdNumber(e.target.value)}
              placeholder="Enter your ID number"
              required
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Info className="h-5 w-5 mr-2 text-primary-600" />
          Order Summary
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Base Ticket Price</span>
            <span className="font-medium">₹{selectedMonument.ticketPrices[visitorType] || 0} × {ticketCount}</span>
          </div>
          
          {guideRequired && selectedMonument.guideFees && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Guide Service ({guideDuration})</span>
              <span className="font-medium">₹{selectedMonument.guideFees[guideDuration] || 0}</span>
            </div>
          )}
          
          {audioGuideRequired && selectedMonument.audioGuideFee && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Audio Guide</span>
              <span className="font-medium">₹{selectedMonument.audioGuideFee}</span>
            </div>
          )}
          
          {photographyPermission && selectedMonument.photographyFee && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Photography Fee</span>
              <span className="font-medium">₹{selectedMonument.photographyFee}</span>
            </div>
          )}
          
          {videoPermission && selectedMonument.videoFee && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Video Recording Fee</span>
              <span className="font-medium">₹{selectedMonument.videoFee}</span>
            </div>
          )}
          
          <div className="border-t border-neutral-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span className="text-lg">₹{isCalculating ? '...' : totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-neutral-500 mt-2">
          <Info className="h-4 w-4 mr-2" />
          <span>Taxes and fees are included. Booking is non-refundable 24 hours before visit.</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full py-6 text-lg font-medium bg-primary-600 hover:bg-primary-700 text-white shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 ease-apple rounded-xl"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Complete Payment (₹{totalAmount.toFixed(2)})
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
