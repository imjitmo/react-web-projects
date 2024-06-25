import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Orders = {
  id: string;
  orderItemQuantity: number;
  orderTotalPrice: number;
  orderUserId: string;
  orderCookId: string;
  created_at: string;
  orderStatus?: boolean;
};

interface OrderProps {
  orders: Orders[];
  isLoading: boolean;
}

const Recent = ({ orders, isLoading }: OrderProps) => {
  const handleOrderLimit = orders?.filter((order) => order.orderStatus === true).slice(0, 10);
  return (
    <Card className="w-full lg:max-w-2xl bg-slate-950 text-slate-50">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Recent Orders</p> <span>&#9736;</span>
        </CardTitle>
        <CardDescription>Recent order list</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead className="text-right">Order Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              handleOrderLimit?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium uppercase">{`#${order.id.slice(0, 6)}`}</TableCell>
                  <TableCell>{order.orderItemQuantity}</TableCell>
                  <TableCell>{order.orderTotalPrice}</TableCell>
                  <TableCell className="text-right">{new Date(order.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default Recent;
