import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/admin/Productsapi";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

export default useDeleteProduct;
