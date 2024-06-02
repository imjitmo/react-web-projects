import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Orders = () => {
  return (
    <Card className="w-full lg:max-w-[500px] bg-slate-950 text-slate-50">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Orders</p> <span>&#127869;</span>
        </CardTitle>
        <CardDescription>Total orders this month</CardDescription>
      </CardHeader>
      <CardContent>
        <h2>155</h2>
        <CardDescription>+10% from last month</CardDescription>
      </CardContent>
    </Card>
  );
};
export default Orders;
