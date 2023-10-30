import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        active: true, // or : queryKey: ['....'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { checkout, isLoading };
}
