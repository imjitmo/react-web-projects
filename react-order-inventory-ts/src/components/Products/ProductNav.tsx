import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetDishes } from '@/hooks/use/useDishes';
import { useSearchParams } from 'react-router-dom';
import ListProducts from './ListProducts';

interface ProductNavProps {
  title: string;
  page: string;
  setup?: JSX.Element;
  handleOrder?: (order: Record<string, unknown>) => void;
}

const ProductNav = ({ title, page, setup, handleOrder }: ProductNavProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dishesData, isPending } = useGetDishes();
  const handleClick = (value: string) => {
    searchParams.set('dish', value);
    setSearchParams(searchParams);
  };

  const filterValue = searchParams.get('dish');

  console.log(dishesData);
  return (
    <>
      <nav className="flex flex-row flex-wrap items-center justify-start gap-12 border-b-2 border-slate-400/20">
        <button
          className={`px-2 ${
            filterValue === 'hot_dishes' ? 'border-b-2 border-orange-500 text-orange-500' : ''
          }`}
          onClick={() => handleClick('hot_dishes')}
        >
          Hot Dishes
        </button>
        <button
          className={`px-2 ${
            filterValue === 'cold_dishes' ? 'border-b-2 border-orange-500 text-orange-500' : ''
          }`}
          onClick={() => handleClick('cold_dishes')}
        >
          Cold Dishes
        </button>
        <button
          className={`px-2 ${filterValue === 'soup' ? 'border-b-2 border-orange-500 text-orange-500' : ''}`}
          onClick={() => handleClick('soup')}
        >
          Soup
        </button>
        <button
          className={`px-2 ${filterValue === 'grill' ? 'border-b-2 border-orange-500 text-orange-500' : ''}`}
          onClick={() => handleClick('grill')}
        >
          Grill
        </button>
        <button
          className={`px-2 ${
            filterValue === 'appetizers' ? 'border-b-2 border-orange-500 text-orange-500' : ''
          }`}
          onClick={() => handleClick('appetizers')}
        >
          Appetizer
        </button>
        <button
          className={`px-2 ${
            filterValue === 'desserts' ? 'border-b-2 border-orange-500 text-orange-500' : ''
          }`}
          onClick={() => handleClick('desserts')}
        >
          Desserts
        </button>
      </nav>

      <div className="flex justify-between">
        <h2>{title}</h2>
        {page === 'dashboard' && (
          <Select>
            <SelectTrigger className="w-[180px] text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Dine In</SelectItem>
              <SelectItem value="dark">Take Out</SelectItem>
              <SelectItem value="system">Delivery</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 my-10">
        {setup}
        <ListProducts render={dishesData} handleOrder={handleOrder} />
      </div>
    </>
  );
};
export default ProductNav;
