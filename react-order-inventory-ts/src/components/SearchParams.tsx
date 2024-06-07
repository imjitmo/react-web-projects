import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchParamsProps {
  params: string;
  values: string[];
  setCurrentPage?: (number: number) => void;
}
const SearchParams = ({ params, values, setCurrentPage }: SearchParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (searchParameter: string, parameterValue: string) => {
    searchParams.set(searchParameter, parameterValue);
    setSearchParams(searchParams);
  };

  const filterValue = searchParams.get(params);

  useEffect(() => {
    if (setCurrentPage) setCurrentPage(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <nav className="flex flex-row flex-wrap items-center justify-start gap-12 border-b-2 border-slate-400/20">
      <button
        className={`px-2 capitalize ${
          filterValue === 'all' ? 'border-b-2 border-orange-500 text-orange-500' : ''
        }`}
        onClick={() => handleClick(params, 'all')}
      >
        All
      </button>
      {values?.map((value) => (
        <button
          key={value}
          className={`px-2 capitalize ${
            filterValue === value ? 'border-b-2 border-orange-500 text-orange-500' : ''
          }`}
          onClick={() => handleClick(params, value)}
        >
          {value}
        </button>
      ))}
    </nav>
  );
};
export default SearchParams;
