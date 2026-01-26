// FILE: src/hooks/useCreateProduct.js

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../api/admin/Productsapi';

export const useCreateProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
  });
};
