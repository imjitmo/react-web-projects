import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetOrderByDate } from '@/hooks/use/useOrders';

const Sales = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const { orders: recentOrders, isLoading } = useGetOrderByDate(firstDay, lastDay);
  const { orders: lastMonthOrders } = useGetOrderByDate(firstDayLastMonth, lastDayLastMonth);
  const recentTotalSales = recentOrders?.reduce((a, b) => a + b.orderTotalPrice, 0);
  const previousTotalSales = lastMonthOrders?.reduce((a, b) => a + b.orderTotalPrice, 0);
  const salesPercentage = ((recentTotalSales - previousTotalSales) / previousTotalSales) * 100;
  return (
    <Card className="w-full lg:max-w-[500px] bg-slate-950 text-slate-50 min-h-[11rem] max-h-[11rem]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Sales</p> <span>&#8369;</span>
        </CardTitle>
        <CardDescription>Sales this month</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <p>Loading...</p> : <h2>&#8369; {recentTotalSales}</h2>}

        <CardDescription>
          {salesPercentage === Infinity ? '100' : salesPercentage}% from last month
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default Sales;
