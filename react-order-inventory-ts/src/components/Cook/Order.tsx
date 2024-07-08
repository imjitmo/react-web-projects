import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useAcceptMainOrder,
  useCancelOrder,
  useGetOrders,
  useRemoveOrderItemList,
} from '@/hooks/use/useOrders';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Pagination from '@/hooks/utils/Pagination';
import { useStore } from '@/store/store';
import { GrFormView } from 'react-icons/gr';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
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
  const [onCancelOrder, setOnCancelOrder] = useState(false);
  const { approveMainOrder } = useAcceptMainOrder();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = orders?.slice(firstIndex, lastIndex);
  const totalPages = orders ? orders.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);

  const { clearId, clearCart, clearDiscount } = useStore(
    useShallow((state) => ({
      clearId: state.clearId,
      clearCart: state.clearCart,
      clearDiscount: state.clearDiscount,
    }))
  );

  const { cancelOrderNumber, isCancelling } = useCancelOrder();
  const { removeOrderItemList, isRemoving } = useRemoveOrderItemList();

  const handleCancelOrder = () => {
    if (onOrderId) {
      cancelOrderNumber(onOrderId, {
        onSuccess: () => {
          removeOrderItemList(onOrderId, {
            onSuccess: () => {
              clearId();
              clearCart();
              clearDiscount();
              setOnCancelOrder(false);
            },
          });
        },
      });
      return;
    } else {
      setOnCancelOrder(false);
      return;
    }
  };
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
                <TableCell className="capitalize">{order.orderStaffName}</TableCell>
                <TableCell className="capitalize">{order.orderCookName}</TableCell>
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
                  {!order.orderStatus && (
                    <TooltipTool title={`Cancel Order #${order.id.slice(0, 6).toUpperCase()}`}>
                      <Button
                        size={'icon'}
                        onClick={() => {
                          setOnOrderId(order.id);
                          setOnCancelOrder((prev) => !prev);
                        }}
                      >
                        <MdOutlineCancel />
                      </Button>
                    </TooltipTool>
                  )}
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
      <DialogTool
        setOnOpen={setOnCancelOrder}
        onOpen={onCancelOrder}
        header={`Cancel Order #${onOrderId.slice(0, 6).toUpperCase()}`}
        description="Are you sure you want to cancel this order?"
      >
        <div className="flex flex-row flex-wrap gap-4">
          <Button
            className="grow"
            variant={'destructive'}
            onClick={() => handleCancelOrder()}
            disabled={isCancelling || isRemoving}
          >
            Yes
          </Button>
          <Button onClick={() => setOnCancelOrder((prev) => !prev)} disabled={isCancelling || isRemoving}>
            Cancel
          </Button>
        </div>
      </DialogTool>
    </>
  );
};
export default Order;
