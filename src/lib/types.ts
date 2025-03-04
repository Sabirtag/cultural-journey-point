
export interface Monument {
  id: string;
  name: string;
  location: string;
  state: string;
  category: 'UNESCO' | 'ASI' | 'State Protected' | 'Other';
  description: string;
  shortDescription: string;
  image: string;
  openingHours: {
    weekdays: string;
    weekends: string;
    holidays: string;
  };
  ticketPrices: {
    indian: number;
    foreign: number;
    children: number; // Under 15
    seniorCitizen?: number;
    studentDiscount?: number; // Percentage
  };
  facilities: string[];
  rules: string[];
  nearbyAttractions?: string[];
  isPhotographyAllowed: boolean;
  photographyFee?: number;
  isVideoAllowed: boolean;
  videoFee?: number;
  guideServiceAvailable: boolean;
  guideFees?: {
    hourly?: number;
    halfDay?: number;
    fullDay?: number;
  };
  audioGuideAvailable: boolean;
  audioGuideFee?: number;
  visitDuration: string; // Approximate time required to visit
  additionalServices?: Array<{
    name: string;
    description: string;
    price: number;
  }>;
}

export interface Booking {
  id: string;
  monumentId: string;
  visitDate: Date;
  visitorType: 'indian' | 'foreign' | 'children' | 'seniorCitizen' | 'student';
  ticketCount: number;
  totalAmount: number;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  visitorIdType: 'aadhar' | 'passport' | 'driverLicense' | 'voterID' | 'other';
  visitorIdNumber: string;
  guideRequired: boolean;
  guideDuration?: 'hourly' | 'halfDay' | 'fullDay';
  audioGuideRequired: boolean;
  photographyPermission: boolean;
  videoPermission: boolean;
  additionalServices?: string[];
  bookingTime: Date;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'pending';
  ticketCode?: string;
}

export type VisitorType = 'indian' | 'foreign' | 'children' | 'seniorCitizen' | 'student';
export type GuideDuration = 'hourly' | 'halfDay' | 'fullDay';
export type IDType = 'aadhar' | 'passport' | 'driverLicense' | 'voterID' | 'other';
