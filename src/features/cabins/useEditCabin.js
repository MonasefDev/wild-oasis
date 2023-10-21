import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export function useEditCabin({ setShowForm }) {
  const queryClient = useQueryClient();
  const { reset } = useForm();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('the cabin is succesfully edited');
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
  return { isEditing, editCabin };
}
