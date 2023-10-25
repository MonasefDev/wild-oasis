import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  const filterField = 'discount';
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No discount' },
    { value: 'with-discount', label: 'With discount' },
  ];
  const sortOptions = [
    { value: 'name-asc', label: 'Sort by name (A-Z)' },
    { value: 'name-dec', label: 'Sort by name (Z-A)' },
    { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
    { value: 'regularPrice-dec', label: 'Sort by price (high first)' },
    { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
    { value: 'maxCapacity-dec', label: 'Sort by capacity (high first)' },
  ];
  return (
    <TableOperations>
      <Filter filterField={filterField} options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
