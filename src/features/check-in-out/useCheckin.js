import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading } = useMutation({
    mutationFn: ({ bookingId, breackfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breackfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        active: true, // or : queryKey: ['....'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { checkin, isLoading };
}
