import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], () => {
        return user?.user;
      });
      navigate('/dashboard');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLogin, login };
}
