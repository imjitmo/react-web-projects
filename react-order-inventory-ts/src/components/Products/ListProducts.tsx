import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dish } from '@/hooks/models/Dishes';
import { IoMdAdd } from 'react-icons/io';

interface ListProductsProps {
  render?: Dish[];
  handleOrder?: (order: Record<string, unknown>) => void;
}

const ListProducts = ({ render, handleOrder }: ListProductsProps) => {
  return (
    <>
      {render && render.length === 0 && <p className="text-center text-slate-50">No Products Found</p>}
      {render &&
        render.length > 0 &&
        render?.map((products) => (
          <Card
            key={products.id}
            className="min-w-[240px] max-w-[240px] text-center bg-slate-950 border-none my-8 text-slate-50"
          >
            <CardHeader>
              <CardTitle className="mx-auto relative -mt-16">
                <img src="/PHO.png" className="size-36" alt="" />
              </CardTitle>
              <CardContent>
                <h3 className="line-clamp-1">{products.dishName}</h3>
                <p>&#8369; {products.dishPrice}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 items-center justify-center">
                <CardDescription>
                  <span
                    className={`bg-orange-300/30 ${
                      products.dishAvailability ? 'text-green-500' : 'text-red-500'
                    } font-semibold py-1 px-4 rounded-full`}
                  >
                    {products.dishAvailability ? 'Available' : 'Not Available'}
                  </span>
                </CardDescription>
                {handleOrder && (
                  <Button className="bg-orange-500 rounded-full text-slate-50 px-8 flex flex-wrap flex-row gap-2">
                    <IoMdAdd />
                    Order
                  </Button>
                )}
              </CardFooter>
            </CardHeader>
          </Card>
        ))}
    </>
  );
};
export default ListProducts;
