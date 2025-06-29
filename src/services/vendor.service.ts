
import { supabase } from '@/integrations/supabase/client';
import { DatabaseVendor, DatabaseVendorService, DatabaseCategory, VendorStatus } from '@/types/database';

export class VendorService {
  static async getVendors(filters?: {
    categoryId?: string;
    status?: VendorStatus;
    isActive?: boolean;
    searchQuery?: string;
    location?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
  }) {
    let query = supabase
      .from('vendors')
      .select(`
        *,
        categories:category_id (*)
      `);

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters?.status) {
      query = query.eq('verification_status', filters.status);
    }

    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }

    if (filters?.searchQuery) {
      query = query.or(`business_name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }

    if (filters?.rating) {
      query = query.gte('rating', filters.rating);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getVendorById(id: string) {
    const { data, error } = await supabase
      .from('vendors')
      .select(`
        *,
        categories:category_id (*),
        vendor_services (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createVendor(vendorData: Omit<DatabaseVendor, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('vendors')
      .insert(vendorData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateVendor(id: string, updates: Partial<DatabaseVendor>) {
    const { data, error } = await supabase
      .from('vendors')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getVendorServices(vendorId: string) {
    const { data, error } = await supabase
      .from('vendor_services')
      .select('*')
      .eq('vendor_id', vendorId)
      .eq('is_active', true);

    if (error) throw error;
    return data;
  }

  static async createVendorService(serviceData: Omit<DatabaseVendorService, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('vendor_services')
      .insert(serviceData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateVendorService(id: string, updates: Partial<DatabaseVendorService>) {
    const { data, error } = await supabase
      .from('vendor_services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;
    return data;
  }

  static async updateVendorVerificationStatus(vendorId: string, status: VendorStatus, notes?: string) {
    const { data, error } = await supabase
      .from('vendors')
      .update({
        verification_status: status,
        verification_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', vendorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getVendorsByUser(userId: string) {
    const { data, error } = await supabase
      .from('vendors')
      .select(`
        *,
        categories:category_id (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
}
