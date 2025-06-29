export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          context: Json | null
          cost_usd: number | null
          created_at: string
          id: string
          messages: Json
          model_used: Database["public"]["Enums"]["ai_model"]
          recommendations: Json | null
          satisfaction_rating: number | null
          session_id: string
          tokens_used: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          context?: Json | null
          cost_usd?: number | null
          created_at?: string
          id?: string
          messages?: Json
          model_used: Database["public"]["Enums"]["ai_model"]
          recommendations?: Json | null
          satisfaction_rating?: number | null
          session_id?: string
          tokens_used?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          context?: Json | null
          cost_usd?: number | null
          created_at?: string
          id?: string
          messages?: Json
          model_used?: Database["public"]["Enums"]["ai_model"]
          recommendations?: Json | null
          satisfaction_rating?: number | null
          session_id?: string
          tokens_used?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_items: {
        Row: {
          addon_total: number | null
          booking_id: string
          created_at: string
          id: string
          quantity: number | null
          selected_addons: string[] | null
          service_id: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          unit_price: number
          updated_at: string
          vendor_id: string
          vendor_notes: string | null
        }
        Insert: {
          addon_total?: number | null
          booking_id: string
          created_at?: string
          id?: string
          quantity?: number | null
          selected_addons?: string[] | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          unit_price: number
          updated_at?: string
          vendor_id: string
          vendor_notes?: string | null
        }
        Update: {
          addon_total?: number | null
          booking_id?: string
          created_at?: string
          id?: string
          quantity?: number | null
          selected_addons?: string[] | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number
          unit_price?: number
          updated_at?: string
          vendor_id?: string
          vendor_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_items_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "vendor_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_items_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_reference: string
          created_at: string
          event_id: string
          id: string
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          platform_fee: number
          status: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id: string | null
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_reference: string
          created_at?: string
          event_id: string
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          platform_fee?: number
          status?: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id?: string | null
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_reference?: string
          created_at?: string
          event_id?: string
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          platform_fee?: number
          status?: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      event_templates: {
        Row: {
          created_at: string
          description: string | null
          event_type: string
          guest_count_max: number | null
          guest_count_min: number | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          popularity_score: number | null
          price_estimate: number | null
          theme_id: string | null
          updated_at: string
          vendor_categories: string[] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_type: string
          guest_count_max?: number | null
          guest_count_min?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          popularity_score?: number | null
          price_estimate?: number | null
          theme_id?: string | null
          updated_at?: string
          vendor_categories?: string[] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_type?: string
          guest_count_max?: number | null
          guest_count_min?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          popularity_score?: number | null
          price_estimate?: number | null
          theme_id?: string | null
          updated_at?: string
          vendor_categories?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "event_templates_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          ai_recommendations: Json | null
          budget_max: number | null
          budget_min: number | null
          created_at: string
          event_date: string
          event_type: string
          guest_count: number | null
          id: string
          location: Json | null
          name: string
          special_requests: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          theme_id: string | null
          updated_at: string
          user_id: string
          wizard_data: Json | null
        }
        Insert: {
          ai_recommendations?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          event_date: string
          event_type: string
          guest_count?: number | null
          id?: string
          location?: Json | null
          name: string
          special_requests?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          theme_id?: string | null
          updated_at?: string
          user_id: string
          wizard_data?: Json | null
        }
        Update: {
          ai_recommendations?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          event_date?: string
          event_type?: string
          guest_count?: number | null
          id?: string
          location?: Json | null
          name?: string
          special_requests?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          theme_id?: string | null
          updated_at?: string
          user_id?: string
          wizard_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "events_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          state: string
          updated_at: string
          venue_types: string[] | null
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          state: string
          updated_at?: string
          venue_types?: string[] | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          state?: string
          updated_at?: string
          venue_types?: string[] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          location: Json | null
          onboarding_completed: boolean | null
          phone: string | null
          preferences: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          content: string | null
          created_at: string
          helpful_count: number | null
          id: string
          images: string[] | null
          is_moderated: boolean | null
          is_verified: boolean | null
          moderation_notes: string | null
          rating: number
          title: string | null
          updated_at: string
          user_id: string
          vendor_id: string
          vendor_response: string | null
          vendor_response_date: string | null
        }
        Insert: {
          booking_id?: string | null
          content?: string | null
          created_at?: string
          helpful_count?: number | null
          id?: string
          images?: string[] | null
          is_moderated?: boolean | null
          is_verified?: boolean | null
          moderation_notes?: string | null
          rating: number
          title?: string | null
          updated_at?: string
          user_id: string
          vendor_id: string
          vendor_response?: string | null
          vendor_response_date?: string | null
        }
        Update: {
          booking_id?: string | null
          content?: string | null
          created_at?: string
          helpful_count?: number | null
          id?: string
          images?: string[] | null
          is_moderated?: boolean | null
          is_verified?: boolean | null
          moderation_notes?: string | null
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string
          vendor_id?: string
          vendor_response?: string | null
          vendor_response_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      search_analytics: {
        Row: {
          click_position: number | null
          clicked_vendor_id: string | null
          created_at: string
          filters: Json | null
          id: string
          results_count: number | null
          search_query: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          click_position?: number | null
          clicked_vendor_id?: string | null
          created_at?: string
          filters?: Json | null
          id?: string
          results_count?: number | null
          search_query?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          click_position?: number | null
          clicked_vendor_id?: string | null
          created_at?: string
          filters?: Json | null
          id?: string
          results_count?: number | null
          search_query?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_analytics_clicked_vendor_id_fkey"
            columns: ["clicked_vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          color_palette: Json | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          color_palette?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          color_palette?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          preference_data: Json
          preference_type: string
          user_id: string
          vendor_id: string | null
          weight: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          preference_data?: Json
          preference_type: string
          user_id: string
          vendor_id?: string | null
          weight?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          preference_data?: Json
          preference_type?: string
          user_id?: string
          vendor_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_addons: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          service_id: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          service_id?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          service_id?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_addons_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "vendor_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_addons_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_services: {
        Row: {
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          images: string[] | null
          is_active: boolean | null
          max_capacity: number | null
          metadata: Json | null
          name: string
          price: number | null
          price_type: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          max_capacity?: number | null
          metadata?: Json | null
          name: string
          price?: number | null
          price_type?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          max_capacity?: number | null
          metadata?: Json | null
          name?: string
          price?: number | null
          price_type?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_services_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: Json | null
          availability: Json | null
          business_name: string
          category_id: string
          created_at: string
          description: string | null
          documents: Json | null
          email: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          metadata: Json | null
          phone: string | null
          portfolio_images: string[] | null
          price_range: Json | null
          promotion_expires_at: string | null
          promotion_tier: Database["public"]["Enums"]["promotion_tier"] | null
          rating: number | null
          review_count: number | null
          service_areas: string[] | null
          tagline: string | null
          updated_at: string
          user_id: string
          verification_notes: string | null
          verification_status:
            | Database["public"]["Enums"]["vendor_status"]
            | null
          website: string | null
        }
        Insert: {
          address?: Json | null
          availability?: Json | null
          business_name: string
          category_id: string
          created_at?: string
          description?: string | null
          documents?: Json | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          metadata?: Json | null
          phone?: string | null
          portfolio_images?: string[] | null
          price_range?: Json | null
          promotion_expires_at?: string | null
          promotion_tier?: Database["public"]["Enums"]["promotion_tier"] | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          tagline?: string | null
          updated_at?: string
          user_id: string
          verification_notes?: string | null
          verification_status?:
            | Database["public"]["Enums"]["vendor_status"]
            | null
          website?: string | null
        }
        Update: {
          address?: Json | null
          availability?: Json | null
          business_name?: string
          category_id?: string
          created_at?: string
          description?: string | null
          documents?: Json | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          metadata?: Json | null
          phone?: string | null
          portfolio_images?: string[] | null
          price_range?: Json | null
          promotion_expires_at?: string | null
          promotion_tier?: Database["public"]["Enums"]["promotion_tier"] | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          tagline?: string | null
          updated_at?: string
          user_id?: string
          verification_notes?: string | null
          verification_status?:
            | Database["public"]["Enums"]["vendor_status"]
            | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      ai_model: "gpt-4o" | "gemini-pro" | "deepseek" | "claude-3-5-sonnet"
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "refunded"
      event_status: "planning" | "booked" | "completed" | "cancelled"
      notification_type:
        | "booking"
        | "payment"
        | "review"
        | "promotion"
        | "system"
      payment_status: "pending" | "processing" | "paid" | "failed" | "refunded"
      promotion_tier: "bronze" | "silver" | "gold"
      user_role: "admin" | "vendor" | "customer"
      vendor_status: "pending" | "approved" | "suspended" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_model: ["gpt-4o", "gemini-pro", "deepseek", "claude-3-5-sonnet"],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "refunded",
      ],
      event_status: ["planning", "booked", "completed", "cancelled"],
      notification_type: [
        "booking",
        "payment",
        "review",
        "promotion",
        "system",
      ],
      payment_status: ["pending", "processing", "paid", "failed", "refunded"],
      promotion_tier: ["bronze", "silver", "gold"],
      user_role: ["admin", "vendor", "customer"],
      vendor_status: ["pending", "approved", "suspended", "rejected"],
    },
  },
} as const
