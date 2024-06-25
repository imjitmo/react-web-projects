import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAcceptMainOrder, useGetOrders } from '@/hooks/use/useOrders';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { GrFormView } from 'react-icons/gr';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';
import View from './View';

const Order = () => {
  const { displayName } = useStore(useShallow((state) => ({ displayName: state.displayName })));
  const { orders, isLoading } = useGetOrders();
  const [onOpen, setOnOpen] = useState(false);
  const [onOrderId, setOnOrderId] = useState('');
  const [onOrderStatus, setOnOrderStatus] = useState(false);
  const { approveMainOrder } = useAcceptMainOrder();
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
              <TableCell colSpan={6} className="text-center">
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
                <TableCell className="flex flex-row flex-wrap gap-2">
                  {!order.orderStatus && (
                    <TooltipTool title={`Accept Order #${order.id.slice(0, 6).toUpperCase()}`}>
                      <Button
                        size={'icon'}
                        onClick={() => approveMainOrder({ id: order.id, orderCookName: displayName || '' })}
                      >
                        <IoIosCheckmarkCircleOutline />
                      </Button>
                    </TooltipTool>
                  )}
                  <TooltipTool key={order.id} title={`View Order #${order.id.slice(0, 6).toUpperCase()}`}>
                    <Button
                      size={'icon'}
                      onClick={() => {
                        setOnOpen((prev) => !prev);
                        setOnOrderId(order.id);
                        setOnOrderStatus(order.orderStatus);
                      }}
                    >
                      <GrFormView className="size-6" />
                    </Button>
                  </TooltipTool>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DialogTool
        header={`View Order #${onOrderId.slice(0, 6).toUpperCase()}`}
        description={`This tab will show order details for order #${onOrderId.slice(0, 6).toUpperCase()}`}
        onOpen={onOpen}
        setOnOpen={setOnOpen}
      >
        <View orderId={onOrderId} openOrderStatus={onOrderStatus} />
      </DialogTool>
    </>
  );
};
export default Order;
