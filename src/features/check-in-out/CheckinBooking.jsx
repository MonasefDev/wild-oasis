import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useNavigate } from 'react-router-dom';
import { useSetting } from '../settings/useSetting';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  & span {
    font-weight: 600;
  }
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreackfast, setAddBreackfast] = useState(false);
  const { checkin, isLoading: isChecking } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSetting();
  const navigate = useNavigate();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);
  if (isLoading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreackfast = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (addBreackfast) {
      checkin({
        bookingId,
        breackfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfast,
          totalPrice: totalPrice + optionalBreackfast,
        },
      });
    } else checkin({ bookingId, breackfast: {} });
    navigate('/');
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreackfast}
            onChange={() => {
              setAddBreackfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breackfast"
          >
            want to add breackfast{' '}
            <span> {formatCurrency(optionalBreackfast)} </span> ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={confirmPaid || isChecking}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that <span> {guests.fullName}</span> has paid the total
          amount{' '}
          {!addBreackfast ? (
            <span>{formatCurrency(totalPrice)}</span>
          ) : (
            <span>
              {formatCurrency(totalPrice + optionalBreackfast)} ({totalPrice} +{' '}
              {optionalBreackfast})
            </span>
          )}
          .
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
