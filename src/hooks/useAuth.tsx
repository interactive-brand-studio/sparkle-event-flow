
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth.service';
import { DatabaseProfile, UserRole } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          queryClient.invalidateQueries({ queryKey: ['profile'] });
          queryClient.invalidateQueries({ queryKey: ['user-roles'] });
        } else if (event === 'SIGNED_OUT') {
          queryClient.clear();
        }
        setIsInitialized(true);
      }
    );

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: AuthService.getCurrentUser,
    enabled: isInitialized,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: AuthService.getCurrentProfile,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const { data: userRoles = [] } = useQuery({
    queryKey: ['user-roles'],
    queryFn: () => AuthService.getUserRoles(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const signUpMutation = useMutation({
    mutationFn: ({ email, password, metadata }: { 
      email: string; 
      password: string; 
      metadata?: Record<string, any> 
    }) => AuthService.signUp(email, password, metadata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: AuthService.signOut,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: Partial<DatabaseProfile>) =>
      AuthService.updateProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const completeOnboardingMutation = useMutation({
    mutationFn: (profileData: Partial<DatabaseProfile>) =>
      AuthService.completeOnboarding(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const hasRole = (role: UserRole) => {
    return userRoles.some(r => r.role === role);
  };

  const isAdmin = hasRole('admin');
  const isVendor = hasRole('vendor');
  const isCustomer = hasRole('customer');

  return {
    user,
    profile,
    userRoles,
    isAuthenticated: !!user,
    isInitialized,
    isAdmin,
    isVendor,
    isCustomer,
    hasRole,
    signUp: signUpMutation.mutateAsync,
    signIn: signInMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    completeOnboarding: completeOnboardingMutation.mutateAsync,
    isLoading: signInMutation.isPending || signUpMutation.isPending || signOutMutation.isPending,
  };
};
