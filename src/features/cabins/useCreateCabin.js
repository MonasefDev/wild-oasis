import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export function useCreateCabin({ setShowForm }) {
  const queryClient = useQueryClient();
  const { reset } = useForm();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('the cabin is succesfully created');
      reset();
      setTimeout(() => {
        setShowForm(false);
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        });
      }, 2000);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
