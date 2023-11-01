import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        'Account successfully created! please confirm your email adress'
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSigningUp, signup };
}
