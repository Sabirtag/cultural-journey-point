
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { monuments } from '@/lib/data';
import { Monument, VisitorType, GuideDuration, IDType } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Clock, MapPin, User, Info, CreditCard, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const BookingPage: React.FC = () => {
  const { monumentId } = useParams<{ monumentId: string }>();
  const [monument, setMonument] = useState<Monument | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [visitorType, setVisitorType] = useState<VisitorType>('indian');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [idType, setIdType] = useState<IDType>('aadhar');
  const [idNumber, setIdNumber] = useState<string>('');
  const [guideRequired, setGuideRequired] = useState<boolean>(false);
  const [guideDuration, setGuideDuration] = useState<GuideDuration>('hourly');
  const [audioGuide, setAudioGuide] = useState<boolean>(false);
  const [photography, setPhotography] = useState<boolean>(false);
  const [video, setVideo] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the monument by ID
    const foundMonument = monuments.find(m => m.id === monumentId);
    if (foundMonument) {
      setMonument(foundMonument);
    }
  }, [monumentId]);
  
  useEffect(() => {
    if (!monument) return;
    
    // Calculate total based on selected options
    let totalPrice = monument.ticketPrices[visitorType] * ticketCount;
    
    if (guideRequired && monument.guideFees && monument.guideFees[guideDuration]) {
      totalPrice += monument.guideFees[guideDuration] || 0;
    }
    
    if (audioGuide && monument.audioGuideFee) {
      totalPrice += monument.audioGuideFee * ticketCount;
    }
    
    if (photography && monument.photographyFee) {
      totalPrice += monument.photographyFee;
    }
    
    if (video && monument.videoFee) {
      totalPrice += monument.videoFee;
    }
    
    setTotal(totalPrice);
  }, [monument, visitorType, ticketCount, guideRequired, guideDuration, audioGuide, photography, video]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Please select a date",
        variant: "destructive"
      });
      return;
    }
    
    if (!name || !email || !phone || !idNumber) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create booking object
    const bookingData = {
      id: `BK-${Date.now()}`,
      monumentId: monument?.id || '',
      visitDate: date,
      visitorType,
      ticketCount,
      totalAmount: total,
      visitorName: name,
      visitorEmail: email,
      visitorPhone: phone,
      visitorIdType: idType,
      visitorIdNumber: idNumber,
      guideRequired,
      guideDuration: guideRequired ? guideDuration : undefined,
      audioGuideRequired: audioGuide,
      photographyPermission: photography,
      videoPermission: video,
      bookingTime: new Date(),
      paymentStatus: 'completed' as const,
      bookingStatus: 'confirmed' as const,
      ticketCode: `HRTG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };
    
    // In a real app, you would save this to a database or API
    // For now, we'll just simulate a successful booking
    console.log('Booking data:', bookingData);
    
    // Show success toast
    toast({
      title: "Booking successful!",
      description: "Your tickets have been booked successfully.",
      variant: "default"
    });
    
    // Navigate to confirmation page
    navigate(`/confirmation/${bookingData.id}`, { state: { booking: bookingData, monument } });
  };
  
  if (!monument) {
    return <div className="container py-16 text-center">Monument not found</div>;
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{monument.name}</h1>
        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{monument.location}, {monument.state}</span>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={monument.image} 
                  alt={monument.name} 
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <p className="mb-4">{monument.description}</p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Opening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Weekdays:</span>
                        <span>{monument.openingHours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekends:</span>
                        <span>{monument.openingHours.weekends}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Holidays:</span>
                        <span>{monument.openingHours.holidays}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {monument.facilities.map((facility, index) => (
                        <div key={index} className="rounded-full bg-secondary px-3 py-1 text-xs">
                          {facility}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Ticket Prices</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Indian Nationals:</span>
                          <span>₹{monument.ticketPrices.indian}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Foreign Tourists:</span>
                          <span>₹{monument.ticketPrices.foreign}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Children (Below 15 years):</span>
                          <span>₹{monument.ticketPrices.children}</span>
                        </div>
                        {monument.ticketPrices.seniorCitizen && (
                          <div className="flex justify-between">
                            <span>Senior Citizens:</span>
                            <span>₹{monument.ticketPrices.seniorCitizen}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Guide Services</h4>
                      {monument.guideServiceAvailable ? (
                        <div className="space-y-2 text-sm">
                          {monument.guideFees?.hourly && (
                            <div className="flex justify-between">
                              <span>Hourly:</span>
                              <span>₹{monument.guideFees.hourly}</span>
                            </div>
                          )}
                          {monument.guideFees?.halfDay && (
                            <div className="flex justify-between">
                              <span>Half-day (up to 4 hours):</span>
                              <span>₹{monument.guideFees.halfDay}</span>
                            </div>
                          )}
                          {monument.guideFees?.fullDay && (
                            <div className="flex justify-between">
                              <span>Full-day (up to 8 hours):</span>
                              <span>₹{monument.guideFees.fullDay}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Guide services not available</p>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Additional Services</h4>
                      <div className="space-y-2 text-sm">
                        {monument.audioGuideAvailable && (
                          <div className="flex justify-between">
                            <span>Audio Guide:</span>
                            <span>₹{monument.audioGuideFee}</span>
                          </div>
                        )}
                        {monument.isPhotographyAllowed && (
                          <div className="flex justify-between">
                            <span>Photography Permission:</span>
                            <span>{monument.photographyFee ? `₹${monument.photographyFee}` : 'Free'}</span>
                          </div>
                        )}
                        {monument.isVideoAllowed && (
                          <div className="flex justify-between">
                            <span>Video Recording Permission:</span>
                            <span>{monument.videoFee ? `₹${monument.videoFee}` : 'Free'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rules">
              <Card>
                <CardHeader>
                  <CardTitle>Rules & Guidelines</CardTitle>
                  <CardDescription>Important information for visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Visitor Rules</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {monument.rules.map((rule, index) => (
                          <li key={index} className="text-sm">{rule}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Nearby Attractions</h4>
                      {monument.nearbyAttractions ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {monument.nearbyAttractions.map((attraction, index) => (
                            <li key={index} className="text-sm">{attraction}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No nearby attractions listed</p>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Recommended Visit Duration</h4>
                      <p className="text-sm">{monument.visitDuration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Book Tickets</CardTitle>
                <CardDescription>Select your visit details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Visit Date</Label>
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          setIsDatePickerOpen(false);
                        }}
                        disabled={(date) => {
                          // Disable dates in the past
                          return date < new Date(new Date().setHours(0, 0, 0, 0));
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Visitor Type</Label>
                  <RadioGroup 
                    defaultValue="indian" 
                    value={visitorType}
                    onValueChange={(value) => setVisitorType(value as VisitorType)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="indian" id="indian" />
                      <Label htmlFor="indian">Indian National (₹{monument.ticketPrices.indian})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="foreign" id="foreign" />
                      <Label htmlFor="foreign">Foreign National (₹{monument.ticketPrices.foreign})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="children" id="children" />
                      <Label htmlFor="children">Child below 15 years (₹{monument.ticketPrices.children})</Label>
                    </div>
                    {monument.ticketPrices.seniorCitizen && (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seniorCitizen" id="senior" />
                        <Label htmlFor="senior">Senior Citizen (₹{monument.ticketPrices.seniorCitizen})</Label>
                      </div>
                    )}
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tickets">Number of Tickets</Label>
                  <div className="flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="tickets"
                      type="number"
                      min="1"
                      max="10"
                      value={ticketCount}
                      onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                      className="h-8 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select 
                      value={idType} 
                      onValueChange={(value) => setIdType(value as IDType)}
                    >
                      <SelectTrigger id="idType">
                        <SelectValue placeholder="Select ID Type" />
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
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input 
                      id="idNumber" 
                      placeholder="Enter ID number" 
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Separator />
                
                {monument.guideServiceAvailable && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="guide">Hire a Guide</Label>
                      <Switch 
                        id="guide" 
                        checked={guideRequired}
                        onCheckedChange={setGuideRequired}
                      />
                    </div>
                    
                    {guideRequired && (
                      <div className="mt-2">
                        <Select 
                          value={guideDuration} 
                          onValueChange={(value) => setGuideDuration(value as GuideDuration)}
                        >
                          <SelectTrigger id="guideDuration">
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {monument.guideFees?.hourly && (
                              <SelectItem value="hourly">Hourly (₹{monument.guideFees.hourly})</SelectItem>
                            )}
                            {monument.guideFees?.halfDay && (
                              <SelectItem value="halfDay">Half-day (₹{monument.guideFees.halfDay})</SelectItem>
                            )}
                            {monument.guideFees?.fullDay && (
                              <SelectItem value="fullDay">Full-day (₹{monument.guideFees.fullDay})</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}
                
                {monument.audioGuideAvailable && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audioGuide" className="block">Audio Guide</Label>
                      <span className="text-xs text-muted-foreground">(₹{monument.audioGuideFee} per person)</span>
                    </div>
                    <Switch 
                      id="audioGuide" 
                      checked={audioGuide}
                      onCheckedChange={setAudioGuide}
                    />
                  </div>
                )}
                
                {monument.isPhotographyAllowed && monument.photographyFee > 0 && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="photography" className="block">Photography Permission</Label>
                      <span className="text-xs text-muted-foreground">(₹{monument.photographyFee})</span>
                    </div>
                    <Switch 
                      id="photography" 
                      checked={photography}
                      onCheckedChange={setPhotography}
                    />
                  </div>
                )}
                
                {monument.isVideoAllowed && monument.videoFee > 0 && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="video" className="block">Video Recording Permission</Label>
                      <span className="text-xs text-muted-foreground">(₹{monument.videoFee})</span>
                    </div>
                    <Switch 
                      id="video" 
                      checked={video}
                      onCheckedChange={setVideo}
                    />
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <Button type="submit" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
