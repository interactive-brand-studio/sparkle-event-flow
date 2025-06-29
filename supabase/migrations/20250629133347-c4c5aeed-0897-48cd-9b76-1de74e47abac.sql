
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'vendor', 'customer');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded');
CREATE TYPE vendor_status AS ENUM ('pending', 'approved', 'suspended', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'paid', 'failed', 'refunded');
CREATE TYPE promotion_tier AS ENUM ('bronze', 'silver', 'gold');
CREATE TYPE event_status AS ENUM ('planning', 'booked', 'completed', 'cancelled');
CREATE TYPE notification_type AS ENUM ('booking', 'payment', 'review', 'promotion', 'system');
CREATE TYPE ai_model AS ENUM ('gpt-4o', 'gemini-pro', 'deepseek', 'claude-3-5-sonnet');

-- User Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  location JSONB, -- {city, state, country, lat, lng}
  preferences JSONB DEFAULT '{}', -- event preferences, budget ranges, etc
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Roles Table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Categories Table (Dynamic)
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Themes Table
CREATE TABLE public.themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  color_palette JSONB, -- array of colors
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Locations Table
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  venue_types TEXT[], -- array of venue types
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vendors Table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  description TEXT,
  tagline TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address JSONB, -- {street, city, state, zip, country}
  service_areas TEXT[], -- cities/regions they serve
  portfolio_images TEXT[], -- array of image URLs
  documents JSONB DEFAULT '{}', -- licenses, insurance, etc
  verification_status vendor_status DEFAULT 'pending',
  verification_notes TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  price_range JSONB, -- {min, max, currency, type}
  availability JSONB DEFAULT '{}', -- calendar availability
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  promotion_tier promotion_tier,
  promotion_expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vendor Services Table
CREATE TABLE public.vendor_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  price_type TEXT CHECK (price_type IN ('flat', 'per_hour', 'per_head', 'per_day')),
  duration_hours INTEGER,
  max_capacity INTEGER,
  images TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vendor Add-ons Table
CREATE TABLE public.vendor_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.vendor_services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events Table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  guest_count INTEGER,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  location JSONB, -- {venue, address, city, state}
  theme_id UUID REFERENCES public.themes(id),
  special_requests TEXT,
  status event_status DEFAULT 'planning',
  wizard_data JSONB DEFAULT '{}', -- all wizard responses
  ai_recommendations JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Event Templates Table (Pre-configured packages)
CREATE TABLE public.event_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  description TEXT,
  price_estimate DECIMAL(10,2),
  guest_count_min INTEGER,
  guest_count_max INTEGER,
  vendor_categories TEXT[], -- required categories
  theme_id UUID REFERENCES public.themes(id),
  is_active BOOLEAN DEFAULT TRUE,
  popularity_score INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  booking_reference TEXT NOT NULL UNIQUE,
  total_amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Booking Items Table (Individual vendor services)
CREATE TABLE public.booking_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.vendor_services(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  selected_addons UUID[], -- array of addon IDs
  addon_total DECIMAL(10,2) DEFAULT 0,
  vendor_notes TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title TEXT,
  content TEXT,
  images TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  is_moderated BOOLEAN DEFAULT FALSE,
  moderation_notes TEXT,
  vendor_response TEXT,
  vendor_response_date TIMESTAMPTZ,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Conversations Table
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  model_used ai_model NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]', -- array of {role, content, timestamp}
  context JSONB DEFAULT '{}', -- event details, preferences, etc
  recommendations JSONB DEFAULT '{}', -- generated recommendations
  tokens_used INTEGER DEFAULT 0,
  cost_usd DECIMAL(8,4) DEFAULT 0,
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Preferences Table (for ML training)
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  preference_type TEXT NOT NULL, -- 'vendor_like', 'vendor_dislike', 'style_preference', etc
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  preference_data JSONB NOT NULL DEFAULT '{}',
  weight DECIMAL(3,2) DEFAULT 1.0, -- importance weight
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Search Analytics Table
CREATE TABLE public.search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  search_query TEXT,
  filters JSONB DEFAULT '{}',
  results_count INTEGER,
  clicked_vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
  click_position INTEGER,
  session_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}', -- additional data like booking_id, vendor_id, etc
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit Logs Table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Platform Settings Table
CREATE TABLE public.platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_vendors_category ON public.vendors(category_id);
CREATE INDEX idx_vendors_location ON public.vendors USING GIN ((service_areas));
CREATE INDEX idx_vendors_rating ON public.vendors(rating DESC);
CREATE INDEX idx_vendors_status ON public.vendors(verification_status, is_active);
CREATE INDEX idx_events_user_date ON public.events(user_id, event_date);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_reviews_vendor ON public.reviews(vendor_id);
CREATE INDEX idx_ai_conversations_user ON public.ai_conversations(user_id);
CREATE INDEX idx_search_analytics_user ON public.search_analytics(user_id);
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- User Roles: Users can see their own roles, admins can see all
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Vendors: Public read, vendors can edit their own
CREATE POLICY "Anyone can view approved vendors" ON public.vendors
  FOR SELECT USING (verification_status = 'approved' AND is_active = true);

CREATE POLICY "Vendors can view own profile" ON public.vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Vendors can update own profile" ON public.vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Vendors can insert own profile" ON public.vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Vendor Services: Public read for active services, vendors can manage their own
CREATE POLICY "Anyone can view active vendor services" ON public.vendor_services
  FOR SELECT USING (
    is_active = true AND 
    vendor_id IN (SELECT id FROM public.vendors WHERE verification_status = 'approved' AND is_active = true)
  );

CREATE POLICY "Vendors can manage own services" ON public.vendor_services
  FOR ALL USING (
    vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())
  );

-- Events: Users can only see/manage their own events
CREATE POLICY "Users can manage own events" ON public.events
  FOR ALL USING (auth.uid() = user_id);

-- Bookings: Users and involved vendors can see bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Vendors can view their bookings" ON public.booking_items
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())
  );

-- Reviews: Public read, users can write reviews for their bookings
CREATE POLICY "Anyone can view moderated reviews" ON public.reviews
  FOR SELECT USING (is_moderated = true);

CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
  );

-- AI Conversations: Users can only see their own conversations
CREATE POLICY "Users can manage own conversations" ON public.ai_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Notifications: Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Public tables (no RLS needed)
-- categories, themes, locations, event_templates, platform_settings

-- Create functions for common operations

-- Function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 AND role = 'admin'
  );
$$;

-- Function to update vendor rating
CREATE OR REPLACE FUNCTION public.update_vendor_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.vendors 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.reviews 
      WHERE vendor_id = NEW.vendor_id AND is_moderated = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews 
      WHERE vendor_id = NEW.vendor_id AND is_moderated = true
    ),
    updated_at = NOW()
  WHERE id = NEW.vendor_id;
  
  RETURN NEW;
END;
$$;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  
  -- Assign default customer role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  ref TEXT;
BEGIN
  ref := 'PS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM public.bookings WHERE booking_reference = ref) LOOP
    ref := 'PS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  END LOOP;
  
  RETURN ref;
END;
$$;

-- Create triggers

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updating vendor ratings
CREATE TRIGGER update_vendor_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_vendor_rating();

-- Trigger for auto-generating booking references
CREATE OR REPLACE FUNCTION public.set_booking_reference()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.booking_reference IS NULL THEN
    NEW.booking_reference := public.generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_booking_reference_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_booking_reference();

-- Insert default data

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Catering', 'catering', 'Food and beverage services', '🍽️'),
  ('Venue', 'venue', 'Event venues and locations', '🏛️'),
  ('Photography', 'photography', 'Professional photography services', '📸'),
  ('Videography', 'videography', 'Video recording and editing', '🎥'),
  ('Music', 'music', 'DJs, bands, and entertainment', '🎵'),
  ('Decor', 'decor', 'Event decoration and styling', '🎨'),
  ('Flowers', 'flowers', 'Floral arrangements and bouquets', '🌸'),
  ('Cake', 'cake', 'Wedding and event cakes', '🎂'),
  ('Invitations', 'invitations', 'Custom invitations and stationery', '💌'),
  ('Transportation', 'transportation', 'Vehicle rentals and transport', '🚗'),
  ('Rentals', 'rentals', 'Equipment and furniture rentals', '🏠'),
  ('Hair & Makeup', 'hair-makeup', 'Beauty and styling services', '💄');

-- Insert default themes
INSERT INTO public.themes (name, description, color_palette, image_url) VALUES
  ('Classic Elegant', 'Timeless sophistication with neutral tones', '["#F8F8FF", "#E6E6FA", "#D8BFD8", "#DDA0DD"]', '/themes/classic-elegant.jpg'),
  ('Modern Minimalist', 'Clean lines and contemporary aesthetics', '["#FFFFFF", "#F5F5F5", "#E0E0E0", "#CCCCCC"]', '/themes/modern-minimalist.jpg'),
  ('Rustic Charm', 'Natural elements with warm earth tones', '["#8B4513", "#DEB887", "#F4A460", "#CD853F"]', '/themes/rustic-charm.jpg'),
  ('Bohemian Chic', 'Free-spirited with rich, vibrant colors', '["#800080", "#FF69B4", "#FFD700", "#FFA500"]', '/themes/bohemian-chic.jpg'),
  ('Garden Party', 'Fresh and natural with floral accents', '["#98FB98", "#90EE90", "#FFB6C1", "#FFFFE0"]', '/themes/garden-party.jpg'),
  ('Glamorous Gold', 'Luxurious metallics and rich textures', '["#FFD700", "#FFA500", "#FF8C00", "#B8860B"]', '/themes/glamorous-gold.jpg');

-- Insert platform settings
INSERT INTO public.platform_settings (key, value, description, is_public) VALUES
  ('platform_fee_percentage', '2.5', 'Platform fee percentage', false),
  ('ai_tokens_free_limit', '1000', 'Free AI tokens per user per month', false),
  ('vendor_promotion_prices', '{"bronze": 5, "silver": 15, "gold": 30}', 'Monthly promotion tier prices', false),
  ('max_photos_per_vendor', '20', 'Maximum photos per vendor portfolio', false),
  ('review_moderation_enabled', 'true', 'Enable review moderation', false),
  ('auto_approve_vendors', 'false', 'Auto-approve new vendors', false);
