export type PortfolioCategory =
  | 'all'
  | 'weddings'
  | 'candid'
  | 'traditional'
  | 'pre-wedding'
  | 'haldi'
  | 'mehendi'
  | 'engagement'
  | 'maternity'
  | 'baby'
  | 'birthday-events'
  | 'cinematic-films';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  imageUrl: string;
  videoUrl?: string;
  description: string;
  location?: string;
  featuredOnHome: boolean;
  order: number;
  tags?: string[];
  exif?: {
    camera?: string;
    lens?: string;
    settings?: string;
  };
  isSample?: boolean;
}

export interface ServicePackage {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  demoPriceINR: number;
  isSamplePrice: boolean;
  photographersCount: number;
  cinematographersCount: number;
  coverageHours: string;
  albumSpecs: string;
  deliverables: string[];
  deliveryTimeline: string;
  optionalAddons: { name: string; priceINR: number }[];
  isPublished: boolean;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  clientNames: string;
  weddingDateOrYear: string;
  eventType: string;
  quote: string;
  venue: string;
  isDemo: boolean;
}

export interface WebsiteSettings {
  brandName: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  email: string;
  openingHours: string;
  heroHeadline: string;
  heroSubheading: string;
  heroImages: string[];
  aboutStory: string;
  aboutPhilosophy: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  taxRatePercent: number;
  defaultAdvancePercent: number;
}

export interface BookingEnquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  numberOfDays?: string;
  preferredPackage?: string;
  approximateBudget?: string;
  photographyRequirements?: string;
  videographyRequirements?: string;
  albumRequirements?: string;
  additionalMessage?: string;
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'archived';
  internalNotes?: string;
  createdAt: string;
}
