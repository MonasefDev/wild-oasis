import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get('status');
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';

  // 1) filter
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  // 2) SortBy
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };

  // 3) Pagination

  const page = Number(searchParams.get('page') || 1);
  //! Fetching data from ApiBookings
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  //! Pre-fetching in react-query
  const lastPage = Math.ceil(count / PAGE_SIZE);

  // pre-fetch the next page
  if (page < lastPage) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  // pre-fetch the previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }
  return { isLoading, bookings, count, error };
}
