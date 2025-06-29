
import { supabase } from '@/integrations/supabase/client';
import { DatabaseReview } from '@/types/database';

export class ReviewService {
  static async createReview(reviewData: Omit<DatabaseReview, 'id' | 'created_at' | 'updated_at' | 'is_verified' | 'is_moderated' | 'helpful_count'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        ...reviewData,
        is_verified: false,
        is_moderated: false,
        helpful_count: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getVendorReviews(vendorId: string, onlyModerated = true) {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (first_name, last_name, avatar_url)
      `)
      .eq('vendor_id', vendorId);

    if (onlyModerated) {
      query = query.eq('is_moderated', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getUserReviews(userId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        vendors (business_name, category_id)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async moderateReview(reviewId: string, isApproved: boolean, notes?: string) {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        is_moderated: true,
        moderation_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async addVendorResponse(reviewId: string, response: string) {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        vendor_response: response,
        vendor_response_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUnmoderatedReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (first_name, last_name, email),
        vendors (business_name)
      `)
      .eq('is_moderated', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
