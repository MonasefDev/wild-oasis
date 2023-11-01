import Button from '../../ui/Button';
import { useCheckOut } from './useCheckOut';

function CheckoutButton({ bookingId }) {
  const { isLoading, checkout } = useCheckOut();
  return (
    <Button
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
