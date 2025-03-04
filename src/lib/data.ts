
import { Monument } from "./types";

export const monuments: Monument[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra",
    state: "Uttar Pradesh",
    category: "UNESCO",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    shortDescription: "Iconic ivory-white marble mausoleum, symbol of eternal love",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    openingHours: {
      weekdays: "6:00 AM - 6:30 PM",
      weekends: "6:00 AM - 6:30 PM",
      holidays: "Closed on Fridays"
    },
    ticketPrices: {
      indian: 50,
      foreign: 1100,
      children: 0,
      seniorCitizen: 40
    },
    facilities: ["Wheelchair Accessibility", "Restrooms", "Drinking Water", "Information Center"],
    rules: ["No Food or Drinks", "No Tripods", "Shoes must be removed or covered when on main platform"],
    nearbyAttractions: ["Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"],
    isPhotographyAllowed: true,
    photographyFee: 0,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 500,
      halfDay: 1500,
      fullDay: 2500
    },
    audioGuideAvailable: true,
    audioGuideFee: 200,
    visitDuration: "2-3 hours"
  },
  {
    id: "red-fort",
    name: "Red Fort",
    location: "Delhi",
    state: "Delhi",
    category: "UNESCO",
    description: "The Red Fort is a historic fort in the city of Delhi that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.",
    shortDescription: "Historic red sandstone fort complex, once the Mughal imperial residence",
    image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    openingHours: {
      weekdays: "9:30 AM - 4:30 PM",
      weekends: "9:30 AM - 4:30 PM",
      holidays: "Closed on Mondays"
    },
    ticketPrices: {
      indian: 35,
      foreign: 500,
      children: 0
    },
    facilities: ["Wheelchair Accessibility", "Restrooms", "Drinking Water", "Museum", "Light & Sound Show"],
    rules: ["No Food or Drinks inside museums", "No professional photography without permission"],
    nearbyAttractions: ["Chandni Chowk", "Jama Masjid", "India Gate"],
    isPhotographyAllowed: true,
    photographyFee: 0,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 400,
      halfDay: 1200,
      fullDay: 2000
    },
    audioGuideAvailable: true,
    audioGuideFee: 150,
    visitDuration: "2-3 hours"
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    location: "Delhi",
    state: "Delhi",
    category: "UNESCO",
    description: "The Qutub Minar is a minaret and victory tower that forms part of the Qutub complex, which lies at the site of Delhi's oldest fortified city, Lal Kot, founded by the Tomar Rajputs. It is a UNESCO World Heritage Site in the Mehrauli area of South Delhi, India.",
    shortDescription: "UNESCO heritage site featuring the world's tallest brick minaret",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    openingHours: {
      weekdays: "7:00 AM - 5:00 PM",
      weekends: "7:00 AM - 5:00 PM",
      holidays: "Open all days"
    },
    ticketPrices: {
      indian: 35,
      foreign: 550,
      children: 0
    },
    facilities: ["Wheelchair Accessibility", "Restrooms", "Drinking Water", "Garden Area"],
    rules: ["No climbing on structures", "No professional photography without permission"],
    nearbyAttractions: ["Mehrauli Archaeological Park", "Garden of Five Senses"],
    isPhotographyAllowed: true,
    photographyFee: 0,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 350,
      halfDay: 1000
    },
    audioGuideAvailable: true,
    audioGuideFee: 150,
    visitDuration: "1-2 hours"
  }
];
