
export type UserRole = 'admin' | 'vendor' | 'customer';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
export type VendorStatus = 'pending' | 'approved' | 'suspended' | 'rejected';
export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
export type PromotionTier = 'bronze' | 'silver' | 'gold';
export type EventStatus = 'planning' | 'booked' | 'completed' | 'cancelled';
export type NotificationType = 'booking' | 'payment' | 'review' | 'promotion' | 'system';
export type AIModel = 'gpt-4o' | 'gemini-pro' | 'deepseek' | 'claude-3-5-sonnet';

export interface DatabaseProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  date_of_birth?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };
  preferences?: Record<string, any>;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseUserRole {
  id: string;
  user_id: string;
  role: UserRole;
  permissions?: Record<string, any>;
  created_at: string;
}

export interface DatabaseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DatabaseVendor {
  id: string;
  user_id: string;
  business_name: string;
  category_id: string;
  description?: string;
  tagline?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  service_areas?: string[];
  portfolio_images?: string[];
  documents?: Record<string, any>;
  verification_status: VendorStatus;
  verification_notes?: string;
  rating: number;
  review_count: number;
  price_range?: {
    min?: number;
    max?: number;
    currency?: string;
    type?: string;
  };
  availability?: Record<string, any>;
  is_active: boolean;
  is_featured: boolean;
  promotion_tier?: PromotionTier;
  promotion_expires_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DatabaseVendorService {
  id: string;
  vendor_id: string;
  name: string;
  description?: string;
  price?: number;
  price_type?: 'flat' | 'per_hour' | 'per_head' | 'per_day';
  duration_hours?: number;
  max_capacity?: number;
  images?: string[];
  is_active: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DatabaseEvent {
  id: string;
  user_id: string;
  name: string;
  event_type: string;
  event_date: string;
  guest_count?: number;
  budget_min?: number;
  budget_max?: number;
  location?: {
    venue?: string;
    address?: string;
    city?: string;
    state?: string;
  };
  theme_id?: string;
  special_requests?: string;
  status: EventStatus;
  wizard_data?: Record<string, any>;
  ai_recommendations?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DatabaseBooking {
  id: string;
  user_id: string;
  event_id: string;
  booking_reference: string;
  total_amount: number;
  platform_fee: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  stripe_payment_intent_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseReview {
  id: string;
  user_id: string;
  vendor_id: string;
  booking_id?: string;
  rating: number;
  title?: string;
  content?: string;
  images?: string[];
  is_verified: boolean;
  is_moderated: boolean;
  moderation_notes?: string;
  vendor_response?: string;
  vendor_response_date?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}
