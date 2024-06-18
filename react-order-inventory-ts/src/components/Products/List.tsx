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
import View from './View';

import { useState } from 'react';

import { blankImage } from '@/hooks/data/selectValues';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import QuantityChangeButtons from '../QuantityChangeButtons';
import SearchTerm from '../SearchTerm';

interface ListProps {
  pageType: string;
}

const List = ({ pageType }: ListProps) => {
  const { cartDishes, addToCart, orderId } = useStore(
    useShallow((state) => ({
      cartDishes: state.dishes,
      addToCart: state.addToCart,
      orderId: state.orderId,
    }))
  );

  const { dishesData, isPending } = useGetDishes();
  const [searchParams] = useSearchParams({ type: 'all' });

  // use states
  const [searchTerm, setSearchTerm] = useState('');
  const [onError, setOnError] = useState(false);

  const allDishData =
    pageType === 'setup' ? dishesData : dishesData?.filter((dishes) => dishes.dishStatus === true);
  const filterParams = searchParams.get('type');
  const dishesRecords =
    filterParams === 'all' ? allDishData : allDishData?.filter((dishes) => dishes.dishType === filterParams);
  const dishesListRecords = searchTerm
    ? dishesRecords?.filter((dishes) => dishes.dishName.toLowerCase().includes(searchTerm))
    : dishesRecords;
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = dishesListRecords?.slice(firstIndex, lastIndex);
  const totalPages = dishesListRecords ? dishesListRecords.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);
  const paramValues = [
    ...new Set(
      pageType === 'setup'
        ? dishesData?.map((dishes) => dishes.dishType)
        : dishesData?.filter((dishes) => dishes.dishStatus === true).map((dishes) => dishes.dishType)
    ),
  ];

  const { updateIngredients } = useUpdateIngredients();
  const handleAvailability = (dishData: { id: string; dishAvailability?: boolean; dishStatus?: boolean }) => {
    updateIngredients(dishData);
  };

  const handleAddToCart = (dishData: {
    dishId: string;
    dishName: string;
    dishPrice: number;
    dishType: string;
    dishImage: string;
  }) => {
    setOnError(false);
    if (!orderId) return setOnError(true);
    addToCart(dishData);
  };

  // const currentMonthDishes = dishesListRecords?.filter((dishes) => {
  //   const date = new Date(dishes.created_at);
  //   const matches = [date.getMonth() === new Date().getMonth()];

  //   return matches.every((value) => value);
  // });

  // const oldMonthDishes = dishesListRecords?.filter((dishes) => {
  //   const date = new Date(dishes.created_at);
  //   const matches = [date.getMonth() - 1 === new Date().getMonth() - 1];

  //   return matches.every((value) => value);
  // });
  // const oldPrice = oldMonthDishes?.reduce((acc, dish) => acc + dish.dishPrice, 0);
  // const totalPrice = currentMonthDishes?.reduce((acc, dish) => acc + dish.dishPrice, 0);
  // console.log(`${(((totalPrice - oldPrice) / oldPrice) * 100).toFixed(2)}% from last month `);
  // console.log(new Date().getFullYear());
  // console.log(new Date().getMonth() + 1);
  // console.log(new Date().getMonth());
  return (
    <div className="my-4">
      <h1>{pageType === 'setup' ? 'Add Menu Items' : 'Menu Items'}</h1>
      <div className="flex justify-between items-center">
        <p>Total Dishes: {dishesListRecords?.length || 0}</p>
        <SearchTerm placeholder={'Search dish name...'} setSearchTerm={setSearchTerm} />
      </div>
      {onError && <p className="text-center text-sm text-orange-500">Please create an order first!</p>}
      <SearchParams params={'type'} values={paramValues} setCurrentPage={setCurrentPage} />
      <div className="flex flex-row flex-wrap gap-4 my-8">
        {isPending && (
          <div className="w-full">
            <p className="text-center text-slate-50">Loading Dishes...</p>
          </div>
        )}
        {dishesListRecords && dishesListRecords.length === 0 && (
          <div className="w-full">
            <p className="text-center text-slate-50 p-4">
              No Products Found! <Link to="/setup">Add now!</Link>
            </p>
          </div>
        )}
        {dishesData &&
          dishesData.length > 0 &&
          records?.map((products) => (
            <Card
              key={products.id}
              className="min-w-[280px] max-w-[280px] text-center bg-slate-950 border-none my-8 text-slate-50"
            >
              <CardHeader>
                <CardTitle key={products.id} className="mx-auto relative -mt-16">
                  <UpdateDialog id={products.id} pageType={pageType}>
                    <img
                      src={(products?.dishImage as string) || blankImage}
                      className="size-[9.5rem] cursor-pointer rounded-full object-cover border-2 border-solid border-orange-400/20"
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
                    <span className={`cursor-default ${products.dishStatus && 'text-green-500'}`}>
                      {products.dishStatus ? 'Active' : 'Inactive'}
                    </span>
                  </TooltipTool>
                </CardDescription>
                {pageType === 'order' &&
                  (cartDishes.find((item) => item.dishId === products.id) ? (
                    <QuantityChangeButtons dishId={products.id} />
                  ) : (
                    <Button
                      className="bg-orange-500 rounded-full text-slate-50 px-8 flex flex-wrap flex-row gap-2"
                      onClick={() =>
                        handleAddToCart({
                          dishId: products.id,
                          dishName: products.dishName,
                          dishPrice: products.dishPrice,
                          dishType: products.dishType,
                          dishImage: products.dishImage,
                        })
                      }
                    >
                      <IoMdAdd />
                      Order
                    </Button>
                  ))}
                {pageType === 'setup' && (
                  <div className="flex flex-row flex-wrap gap-2">
                    <AddIngredients dishData={products} />
                    <UpdateDish dishData={products} />
                  </div>
                )}
                <View dishData={products} />
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
