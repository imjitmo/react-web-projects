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
import Pagination from '@/hooks/utils/Pagination';
import { useStore } from '@/store/store';
import { GrFormView } from 'react-icons/gr';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';
import PaginationButtons from '../Pagination/PaginationButtons';
import TooltipTool from '../TooltipTool';
import View from './View';

const Order = () => {
  const { displayName, userType } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
      userType: state.userType,
    }))
  );
  const { orders, isLoading } = useGetOrders();
  const [onOpen, setOnOpen] = useState(false);
  const [onOrderId, setOnOrderId] = useState('');
  const [onOrderStatus, setOnOrderStatus] = useState(false);
  const { approveMainOrder } = useAcceptMainOrder();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = orders?.slice(firstIndex, lastIndex);
  const totalPages = orders ? orders.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);
  return (
    <>
      <p>Total Orders: {orders?.length}</p>
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
            records?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium uppercase">{`#${order.id.slice(0, 6)}`}</TableCell>
                <TableCell>{order.orderStaffName}</TableCell>
                <TableCell>{order.orderCookName}</TableCell>
                <TableCell>{order.orderItemQuantity}</TableCell>
                <TableCell>&#8369; {order.orderTotalPrice}</TableCell>
                <TableCell className="flex flex-row flex-wrap gap-2">
                  {!order.orderStatus && userType !== 'counter staff' && userType !== 'cashier' && (
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
      {npage ? (
        <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} npage={npage} />
      ) : null}
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
