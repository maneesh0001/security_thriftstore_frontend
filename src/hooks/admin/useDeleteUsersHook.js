import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../api/admin/userApi';


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      alert('Error deleting user: ' + error.message);
    },
  });
};
