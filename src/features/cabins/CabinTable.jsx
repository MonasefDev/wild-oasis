import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
// import { HiOutlineArrowLongUp } from 'react-icons/hi2';
// import { HiOutlineArrowLongDown } from 'react-icons/hi2';

import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  // 1) Filter
  const filterValue = searchParams.get('discount');
  let filterCabins;
  if (filterValue === 'all' || filterValue === null) filterCabins = cabins;
  if (filterValue === 'no-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) Sort By
  const sortBy = searchParams.get('sortBy') || 'startDat-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>
            Price
            {/* {field === 'regularPrice' && direction === 'asc' && (
              <HiOutlineArrowLongUp />
            )}
            {field === 'regularPrice' && direction === 'dec' && (
              <HiOutlineArrowLongDown />
            )} */}
          </div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={filterCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
