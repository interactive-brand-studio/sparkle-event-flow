
import { supabase } from '@/integrations/supabase/client';
import { DatabaseProfile, DatabaseUserRole, UserRole } from '@/types/database';

export class AuthService {
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  static async getCurrentProfile(): Promise<DatabaseProfile | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserRoles(userId?: string): Promise<DatabaseUserRole[]> {
    const uid = userId || (await this.getCurrentUser())?.id;
    if (!uid) return [];

    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', uid);

    if (error) throw error;
    return data || [];
  }

  static async hasRole(role: UserRole, userId?: string): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.some(r => r.role === role);
  }

  static async isAdmin(userId?: string): Promise<boolean> {
    return this.hasRole('admin', userId);
  }

  static async isVendor(userId?: string): Promise<boolean> {
    return this.hasRole('vendor', userId);
  }

  static async signUp(email: string, password: string, metadata?: Record<string, any>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async updateProfile(updates: Partial<DatabaseProfile>) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async assignRole(userId: string, role: UserRole, permissions?: Record<string, any>) {
    const { data, error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role,
        permissions: permissions || {}
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async completeOnboarding(profileData: Partial<DatabaseProfile>) {
    return this.updateProfile({
      ...profileData,
      onboarding_completed: true
    });
  }
}
