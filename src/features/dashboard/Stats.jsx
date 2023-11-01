import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const numSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const numCheckin = confirmedStays.length;

  // 3.
  const rate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(numSales)}
      />
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={numCheckin}
      />
      <Stat
        title="Occupency rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={`${Math.round(rate * 100)}%`}
      />
    </>
  );
}

export default Stats;
