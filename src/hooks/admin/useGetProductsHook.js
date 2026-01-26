// FILE: src/hooks/useProducts.js

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/admin/Productsapi';

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
