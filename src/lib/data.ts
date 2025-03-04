
import { Monument } from './types';

export const monuments: Monument[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra',
    state: 'Uttar Pradesh',
    category: 'UNESCO',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centrepiece of a 17-hectare complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.',
    shortDescription: 'An ivory-white marble mausoleum and UNESCO World Heritage Site.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop',
    openingHours: {
      weekdays: 'Sunrise to Sunset (Closed on Fridays)',
      weekends: 'Sunrise to Sunset',
      holidays: 'Sunrise to Sunset',
    },
    ticketPrices: {
      indian: 50,
      foreign: 1100,
      children: 0, // Free for children under 15
      seniorCitizen: 30,
      studentDiscount: 20, // 20% off with valid ID
    },
    facilities: [
      'Wheelchair accessibility',
      'Clean drinking water',
      'Restrooms',
      'Shoe covers',
      'Golf carts',
      'Information center',
    ],
    rules: [
      'No food allowed inside',
      'No tripods for regular visitors',
      'No smoking',
      'Dress appropriately',
      'Strict security checks',
    ],
    nearbyAttractions: [
      'Agra Fort',
      'Mehtab Bagh',
      'Itimad-ud-Daulah Tomb',
    ],
    isPhotographyAllowed: true,
    photographyFee: 0, // General photography is free
    isVideoAllowed: true,
    videoFee: 25, // Fee for video recording
    guideServiceAvailable: true,
    guideFees: {
      hourly: 500,
      halfDay: 1200,
      fullDay: 2000,
    },
    audioGuideAvailable: true,
    audioGuideFee: 200,
    visitDuration: '2-3 hours',
    additionalServices: [
      {
        name: 'Sunset view special access',
        description: 'Special evening access with cultural performance',
        price: 750,
      },
      {
        name: 'Historical tour package',
        description: 'Guided tour with historical expert',
        price: 1500,
      },
    ],
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    location: 'New Delhi',
    state: 'Delhi',
    category: 'UNESCO',
    description: 'The Qutub Minar, also spelled as Qutb Minar, is a minaret and "victory tower" that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of New Delhi, India. The minaret is 73 metres (240 ft) tall and is made of red sandstone and marble. It is surrounded by several other ancient and medieval structures and ruins, collectively known as the Qutb complex.',
    shortDescription: 'A UNESCO World Heritage Site featuring the world\'s tallest brick minaret.',
    image: 'https://images.unsplash.com/photo-1567701456533-3de64c4c46c0?q=80&w=1000&auto=format&fit=crop',
    openingHours: {
      weekdays: '7:00 AM to 5:00 PM',
      weekends: '7:00 AM to 5:00 PM',
      holidays: '7:00 AM to 5:00 PM',
    },
    ticketPrices: {
      indian: 35,
      foreign: 550,
      children: 0, // Free for children under 15
      seniorCitizen: 25,
      studentDiscount: 15, // 15% off with valid ID
    },
    facilities: [
      'Wheelchair accessibility',
      'Clean drinking water',
      'Restrooms',
      'Information center',
      'Souvenir shop',
    ],
    rules: [
      'No food allowed inside',
      'No climbing on structures',
      'No touching artifacts',
      'No smoking',
    ],
    nearbyAttractions: [
      'Alai Darwaza',
      'Iron Pillar',
      'Alai Minar',
    ],
    isPhotographyAllowed: true,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 400,
      halfDay: 900,
      fullDay: 1500,
    },
    audioGuideAvailable: true,
    audioGuideFee: 150,
    visitDuration: '1-2 hours',
    additionalServices: [
      {
        name: 'Archaeological tour',
        description: 'Detailed tour of all ruins and structures',
        price: 600,
      },
    ],
  },
  {
    id: 'red-fort',
    name: 'Red Fort',
    location: 'New Delhi',
    state: 'Delhi',
    category: 'UNESCO',
    description: 'The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. Originally red and white, Shah Jahan\'s favorite colors, its design is credited to architect Ustad Ahmad Lahori, who also constructed the Taj Mahal.',
    shortDescription: 'Historical fort and UNESCO World Heritage Site in Delhi.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop',
    openingHours: {
      weekdays: '9:30 AM to 4:30 PM (Closed on Mondays)',
      weekends: '9:30 AM to 4:30 PM',
      holidays: '9:30 AM to 4:30 PM',
    },
    ticketPrices: {
      indian: 35,
      foreign: 550,
      children: 0, // Free for children under 15
      seniorCitizen: 25,
      studentDiscount: 15, // 15% off with valid ID
    },
    facilities: [
      'Wheelchair accessibility',
      'Clean drinking water',
      'Restrooms',
      'Information center',
      'Light and Sound show',
      'Museum',
      'Garden',
    ],
    rules: [
      'No food allowed inside',
      'No touching artifacts',
      'No smoking',
      'Security check mandatory',
    ],
    nearbyAttractions: [
      'Chandni Chowk',
      'Jama Masjid',
      'Raj Ghat',
    ],
    isPhotographyAllowed: true,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 450,
      halfDay: 1000,
      fullDay: 1800,
    },
    audioGuideAvailable: true,
    audioGuideFee: 150,
    visitDuration: '2-3 hours',
    additionalServices: [
      {
        name: 'Light and Sound Show',
        description: 'Evening show narrating the fort\'s history',
        price: 200,
      },
      {
        name: 'Heritage walk',
        description: 'Guided walk through lesser-known areas',
        price: 500,
      },
    ],
  },
  {
    id: 'ajanta-caves',
    name: 'Ajanta Caves',
    location: 'Aurangabad',
    state: 'Maharashtra',
    category: 'UNESCO',
    description: 'The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state in India. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art, particularly expressive paintings that present emotions through gesture, pose and form.',
    shortDescription: 'Ancient rock-cut Buddhist monuments with exceptional paintings and sculptures.',
    image: 'https://images.unsplash.com/photo-1588432892732-b395027c9e8a?q=80&w=1000&auto=format&fit=crop',
    openingHours: {
      weekdays: '9:00 AM to 5:30 PM (Closed on Mondays)',
      weekends: '9:00 AM to 5:30 PM',
      holidays: '9:00 AM to 5:30 PM',
    },
    ticketPrices: {
      indian: 40,
      foreign: 600,
      children: 0, // Free for children under 15
      seniorCitizen: 30,
      studentDiscount: 20, // 20% off with valid ID
    },
    facilities: [
      'Parking',
      'Clean drinking water',
      'Restrooms',
      'Information center',
      'Viewpoint',
      'Bus service to caves',
    ],
    rules: [
      'No touching paintings or sculptures',
      'No flash photography',
      'No food inside caves',
      'No smoking',
    ],
    nearbyAttractions: [
      'Ellora Caves',
      'Aurangabad Caves',
      'Bibi Ka Maqbara',
    ],
    isPhotographyAllowed: true,
    photographyFee: 0,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 500,
      halfDay: 1200,
      fullDay: 2000,
    },
    audioGuideAvailable: true,
    audioGuideFee: 200,
    visitDuration: '3-4 hours',
    additionalServices: [
      {
        name: 'Art history tour',
        description: 'Specialized tour focusing on artistic elements',
        price: 800,
      },
      {
        name: 'Photography permit (professional)',
        description: 'Permit for professional photography equipment',
        price: 1000,
      },
    ],
  },
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    location: 'Konark',
    state: 'Odisha',
    category: 'UNESCO',
    description: 'The Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga Dynasty about 1250 CE. Dedicated to the Hindu Sun God Surya, what remains of the temple complex has the appearance of a 100-foot high chariot with immense wheels and horses, all carved from stone.',
    shortDescription: 'A 13th-century Sun temple known for its architectural grandeur.',
    image: 'https://images.unsplash.com/photo-1621996659010-54430088f0af?q=80&w=1000&auto=format&fit=crop',
    openingHours: {
      weekdays: 'Sunrise to Sunset',
      weekends: 'Sunrise to Sunset',
      holidays: 'Sunrise to Sunset',
    },
    ticketPrices: {
      indian: 40,
      foreign: 600,
      children: 0, // Free for children under 15
      seniorCitizen: 30,
    },
    facilities: [
      'Wheelchair accessibility',
      'Clean drinking water',
      'Restrooms',
      'Information center',
      'Garden',
      'Light and Sound show',
    ],
    rules: [
      'No climbing on structures',
      'No touching artifacts',
      'No smoking',
    ],
    nearbyAttractions: [
      'Chandrabhaga Beach',
      'Ramachandi Temple',
      'Konark Museum',
    ],
    isPhotographyAllowed: true,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 400,
      halfDay: 900,
      fullDay: 1600,
    },
    audioGuideAvailable: true,
    audioGuideFee: 150,
    visitDuration: '2-3 hours',
    additionalServices: [
      {
        name: 'Light and Sound Show',
        description: 'Evening show narrating the temple\'s history',
        price: 200,
      },
      {
        name: 'Sunrise special access',
        description: 'Early morning access to see the temple at sunrise',
        price: 500,
      },
    ],
  },
  {
    id: 'hampi',
    name: 'Hampi',
    location: 'Hampi',
    state: 'Karnataka',
    category: 'UNESCO',
    description: 'Hampi is an ancient village in the south Indian state of Karnataka. It's dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar. A carved stone chariot stands in front of the huge Vittala Temple site. Southeast of Hampi, Daroji Bear Sanctuary is home to the Indian sloth bear.',
    shortDescription: 'Ancient ruined city with remarkable temple complexes and stone monuments.',
    image: 'https://images.unsplash.com/photo-1613489099640-12b9560a2f12?q=80&w=1000&auto=format&fit=crop',
    openingHours: {
      weekdays: 'Sunrise to Sunset',
      weekends: 'Sunrise to Sunset',
      holidays: 'Sunrise to Sunset',
    },
    ticketPrices: {
      indian: 40,
      foreign: 600,
      children: 0, // Free for children under 15
      seniorCitizen: 30,
      studentDiscount: 20, // 20% off with valid ID
    },
    facilities: [
      'Parking',
      'Clean drinking water',
      'Restrooms',
      'Information center',
      'Guide services',
    ],
    rules: [
      'No climbing on structures',
      'No touching artifacts',
      'No smoking',
    ],
    nearbyAttractions: [
      'Virupaksha Temple',
      'Vittala Temple',
      'Lotus Mahal',
    ],
    isPhotographyAllowed: true,
    isVideoAllowed: true,
    videoFee: 25,
    guideServiceAvailable: true,
    guideFees: {
      hourly: 450,
      halfDay: 1100,
      fullDay: 2000,
    },
    audioGuideAvailable: true,
    audioGuideFee: 200,
    visitDuration: '1-2 days',
    additionalServices: [
      {
        name: 'Coracle ride on Tungabhadra',
        description: 'Traditional boat ride on the river',
        price: 300,
      },
      {
        name: 'Full site tour by electric vehicle',
        description: 'Eco-friendly tour of the extensive site',
        price: 800,
      },
    ],
  }
];

export const getMonument = (id: string): Monument | undefined => {
  return monuments.find(monument => monument.id === id);
};

export const generateBookingId = (): string => {
  return 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const generateTicketCode = (): string => {
  return 'TKT' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
