import { useMutation } from '@tanstack/react-query';
import { signupService } from '../services/authService';
 
const useSignupHook = () => {
  return useMutation({
    mutationFn: signupService,
    mutationKey: ['Signup'],
    onSuccess: (data) => {
      console.log('Signup success:', data);
    },
    onError: (err) => {
      console.error(err.message || 'Signup failed');
    },
  });
};
 
export default useSignupHook;
 