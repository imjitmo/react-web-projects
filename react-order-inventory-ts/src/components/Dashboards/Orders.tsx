import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Orders = ({ orders = 0, isLoading }: { orders: number; isLoading: boolean }) => {
  return (
    <Card className="w-full lg:max-w-[500px] bg-slate-950 text-slate-50 min-h-[11rem] max-h-[11rem]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Orders</p> <span>&#127869;</span>
        </CardTitle>
        <CardDescription>Total orders this month</CardDescription>
      </CardHeader>
      <CardContent>{isLoading ? <p>Loading...</p> : <h2>{orders}</h2>}</CardContent>
    </Card>
  );
};
export default Orders;
