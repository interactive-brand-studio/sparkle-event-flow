
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VendorService } from '@/services/vendor.service';
import { VendorStatus } from '@/types/database';

export const useVendors = (filters?: {
  categoryId?: string;
  status?: VendorStatus;
  isActive?: boolean;
  searchQuery?: string;
  location?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
}) => {
  const queryClient = useQueryClient();

  const { data: vendors = [], isLoading, error } = useQuery({
    queryKey: ['vendors', filters],
    queryFn: () => VendorService.getVendors(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: VendorService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const createVendorMutation = useMutation({
    mutationFn: VendorService.createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });

  const updateVendorMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      VendorService.updateVendor(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });

  return {
    vendors,
    categories,
    isLoading,
    error,
    createVendor: createVendorMutation.mutateAsync,
    updateVendor: updateVendorMutation.mutateAsync,
  };
};

export const useVendor = (id: string) => {
  const { data: vendor, isLoading, error } = useQuery({
    queryKey: ['vendor', id],
    queryFn: () => VendorService.getVendorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const { data: services = [] } = useQuery({
    queryKey: ['vendor-services', id],
    queryFn: () => VendorService.getVendorServices(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    vendor,
    services,
    isLoading,
    error,
  };
};
