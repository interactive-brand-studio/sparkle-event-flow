
export type VendorCategory = 'Catering' | 'Venue' | 'Photography' | 'Videography' | 'Music' | 'Decor' | 'Flowers' | 'Cake' | 'Invitations' | 'Transportation' | 'Rentals' | 'Hair & Makeup' | 'Other';

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Vendor {
  id: string;
  name: string;
  image: string;
  tagline: string;
  category: VendorCategory;
  priceFrom: number;
  priceType: 'per_head' | 'per_hour' | 'flat';
  rating: number;
  reviewCount: number;
  verified: boolean;
  location: string;
  description: string;
  services: string[];
  addOns: AddOn[];
}
