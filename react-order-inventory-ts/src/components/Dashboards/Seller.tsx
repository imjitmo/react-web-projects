import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetBestSellers } from '@/hooks/use/useOrders';

const Seller = () => {
  const { bestSellers, isLoading } = useGetBestSellers();
  return (
    <Card className="w-full lg:max-w-[500px] bg-slate-950 text-slate-50 min-h-[11rem] max-h-[11rem]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Best Seller</p> <span>&#9734;</span>
        </CardTitle>
        <CardDescription>Best seller for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            bestSellers?.map((item, index) => (
              <li key={item.dishId} className="font-bold">
                <span className="font-normal">{index + 1}.</span> {item.dishName}
              </li>
            ))
          )}
        </ul>
        {/* <h2 className="truncate">Pho with Hot Sauce</h2>
        <CardDescription>Beat Mi Goreng last onth</CardDescription> */}
      </CardContent>
    </Card>
  );
};
export default Seller;
