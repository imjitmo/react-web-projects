import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDishes, useUpdateIngredients } from '@/hooks/use/useDishes';
import Pagination from '@/hooks/utils/Pagination';
import { IoMdAdd } from 'react-icons/io';
import { Link, useSearchParams } from 'react-router-dom';
import PaginationButtons from '../Pagination/PaginationButtons';
import SearchParams from '../SearchParams';
import TooltipTool from '../TooltipTool';
import AddIngredients from './AddIngredients';
import UpdateDialog from './UpdateDialog';
import UpdateDish from './UpdateDish';

interface ListProps {
  pageType: string;
}

const List = ({ pageType }: ListProps) => {
  const { dishesData, isPending } = useGetDishes();
  const [searchParams] = useSearchParams({ type: 'all' });
  const allDishData =
    pageType === 'setup' ? dishesData : dishesData?.filter((dishes) => dishes.dishStatus === true);
  const filterParams = searchParams.get('type');
  const dishesRecords = allDishData?.filter((dishes) =>
    filterParams === 'all' ? allDishData : dishes.dishType === filterParams
  );
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = dishesRecords?.slice(filterParams === 'all' ? firstIndex : 0, lastIndex);
  const totalPages = dishesRecords ? dishesRecords.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);
  const paramValues = [...new Set(dishesData?.map((dishes) => dishes.dishType))];

  const { updateIngredients } = useUpdateIngredients();
  const handleAvailability = (dishData: { id: string; dishAvailability: boolean }) => {
    updateIngredients(dishData);
  };

  return (
    <div className="my-4">
      {isPending && (
        <div className="w-full">
          <p className="text-center text-slate-50">Loading Dishes...</p>
        </div>
      )}
      <SearchParams params={'type'} values={paramValues} setCurrentPage={setCurrentPage} />
      {dishesData && dishesData.length === 0 && (
        <div className="w-full">
          <p className="text-center text-slate-50">
            No Products Found! <Link to="/setup">Add now!</Link>
          </p>
        </div>
      )}
      <h1 className="my-4">{pageType === 'setup' ? 'Add Dishes' : 'Add to Order'}</h1>
      <div className="flex flex-row flex-wrap gap-4 my-8">
        {dishesData &&
          dishesData.length > 0 &&
          records?.map((products) => (
            <Card
              key={products.id}
              className="min-w-[240px] max-w-[240px] text-center bg-slate-950 border-none my-8 text-slate-50"
            >
              <CardHeader>
                <CardTitle key={products.id} className="mx-auto relative -mt-16">
                  <UpdateDialog id={products.id}>
                    <img
                      src={(products?.dishImage as string) || '/PHO.png'}
                      className="size-36 cursor-pointer"
                      alt="image"
                    />
                  </UpdateDialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="line-clamp-1">{products.dishName}</h3>
                <p>&#8369; {products.dishPrice}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 items-center justify-center">
                <CardDescription className="flex flex-col gap-2">
                  <span
                    className={`bg-orange-300/30 ${
                      products.dishAvailability ? 'text-green-500' : 'text-red-500'
                    } font-semibold py-1 px-4 rounded-full cursor-pointer`}
                    onClick={() =>
                      handleAvailability({ id: products.id, dishAvailability: !products.dishAvailability })
                    }
                  >
                    {products.dishAvailability ? 'Available' : 'Not Available'}
                  </span>
                  <TooltipTool
                    title={
                      products.dishStatus
                        ? 'This dish is active'
                        : 'This dish is inactive, you cannot serve this dish'
                    }
                  >
                    <span className={`cursor-pointer ${products.dishStatus && 'text-green-500'}`}>
                      {products.dishStatus ? 'Active' : 'Inactive'}
                    </span>
                  </TooltipTool>
                </CardDescription>
                {pageType === 'order' && (
                  <Button className="bg-orange-500 rounded-full text-slate-50 px-8 flex flex-wrap flex-row gap-2">
                    <IoMdAdd />
                    Order
                  </Button>
                )}
                {pageType === 'setup' && (
                  <div className="flex flex-row flex-wrap gap-2">
                    <AddIngredients dishData={products} />
                    <UpdateDish dishData={products} />
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
      </div>
      {npage ? (
        <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} npage={npage} />
      ) : null}
    </div>
  );
};
export default List;
