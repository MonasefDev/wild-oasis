import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get('sortBy') || '';
  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      value={currentSortBy}
      onChange={handleChange}
      options={options}
      type="white"
    />
  );
}

export default SortBy;
