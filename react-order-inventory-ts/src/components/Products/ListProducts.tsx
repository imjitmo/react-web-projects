import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IoMdAdd } from 'react-icons/io';

type ProductProps = {
  id: number;
  name: string;
  price: string;
  available: string;
};

interface ListProductsProps {
  render: ProductProps[];
  handleOrder?: (order: Record<string, unknown>) => void;
}

const ListProducts = ({ render, handleOrder }: ListProductsProps) => {
  return (
    <>
      {render.map((products) => (
        <Card className="min-w-[240px] max-w-[240px] text-center bg-slate-950 border-none my-8 text-slate-50">
          <CardHeader>
            <CardTitle className="mx-auto relative -mt-16">
              <img src="/PHO.png" className="size-36" alt="" />
            </CardTitle>
            <CardContent>
              <h3 className="line-clamp-1">{products.name}</h3>
              <p>&#8369; {products.price}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-center justify-center">
              <CardDescription>
                <span className="bg-orange-300/30 text-green-400 font-semibold py-1 px-4 rounded-full">
                  Available
                </span>
              </CardDescription>
              {handleOrder && (
                <Button
                  className="bg-orange-500 rounded-full text-slate-50 px-8 flex flex-wrap flex-row gap-2"
                  onClick={() => handleOrder(products)}
                >
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
