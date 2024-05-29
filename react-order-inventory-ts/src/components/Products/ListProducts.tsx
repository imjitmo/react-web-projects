import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'react-router-dom';

type ProductProps = {
  id: number;
  name: string;
  price: string;
  available: string;
};

const ListProducts = ({ products }: { products: ProductProps }) => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('dish');

  return (
    <Card className="min-w-[240px] max-w-[240px] text-center bg-slate-950 border-none my-8 text-slate-50">
      <CardHeader>
        <CardTitle className="mx-auto relative -mt-16">
          <img src="/PHO.png" className="size-36" alt="" />
        </CardTitle>
        <CardContent>
          <h3 className="line-clamp-1">{products.name}</h3>
          <p>&#8369; {products.price}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <CardDescription>{products.available}</CardDescription>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
export default ListProducts;
