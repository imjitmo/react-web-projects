import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetOrders } from '@/hooks/use/useOrders';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { GrFormView } from 'react-icons/gr';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';

const Order = () => {
  const { orders, isLoading } = useGetOrders();
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <Table>
        <TableCaption>A list of current Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Accepted by</TableHead>
            <TableHead>Prepared by</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Action</TableHead>
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
            orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium uppercase">{`#${order.id.slice(0, 6)}`}</TableCell>
                <TableCell>{order.orderStaffName}</TableCell>
                <TableCell>{order.orderCookName}</TableCell>
                <TableCell>{order.orderItemQuantity}</TableCell>
                <TableCell>&#8369; {order.orderTotalPrice}</TableCell>
                <TableCell>
                  <TooltipTool key={order.id} title={`View Order #${order.id.slice(0, 6).toUpperCase()}`}>
                    <Button size={'icon'} onClick={() => setOnOpen((prev) => !prev)}>
                      <GrFormView className="size-6" />
                    </Button>
                  </TooltipTool>
                  <DialogTool
                    header={`View Order #${order.id.slice(0, 6).toUpperCase()}`}
                    description={`This tab will show order details for order #${order.id
                      .slice(0, 6)
                      .toUpperCase()}`}
                    onOpen={onOpen}
                    setOnOpen={setOnOpen}
                  >
                    {`Order #${order.id.slice(0, 6).toUpperCase()}`}
                  </DialogTool>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};
export default Order;
