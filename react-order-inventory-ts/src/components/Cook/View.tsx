import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAcceptOrderItem, useUpdateInventoryByOrder, useViewOrderList } from '@/hooks/use/useOrders';
import { useStore } from '@/store/store';
import { BiDish } from 'react-icons/bi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { PiCookingPotBold } from 'react-icons/pi';
import { useShallow } from 'zustand/react/shallow';
import TooltipTool from '../TooltipTool';

const View = ({ orderId, openOrderStatus }: { orderId: string; openOrderStatus: boolean }) => {
  const { userType } = useStore(useShallow((state) => ({ userType: state.userType })));
  const { orderList, isLoading } = useViewOrderList(orderId);
  const { acceptOrder } = useAcceptOrderItem();

  const { updateInventoryCount } = useUpdateInventoryByOrder();

  const handleAcceptItem = (orderId: string, dishId: string, quantity: number, orderStatus: string) => {
    const statusUpdate =
      orderStatus === 'pending' ? 'accepted' : orderStatus === 'accepted' ? 'processing' : 'done';
    acceptOrder(
      {
        id: orderId,
        orderStatus: statusUpdate,
      },
      {
        onSuccess: () => {
          if (statusUpdate === 'accepted') {
            updateInventoryCount({ dishId, dishQuantity: quantity });
          }
        },
      }
    );
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList?.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>{order.dishName}</TableCell>
                <TableCell> {order.orderQuantity}</TableCell>
                <TableCell className="capitalize text-xs text-slate-400 italic">
                  {order.orderStatus}
                </TableCell>
                <TableCell>
                  {openOrderStatus &&
                  userType !== 'waiter' &&
                  userType !== 'cashier' &&
                  order.orderStatus !== 'done' ? (
                    <TooltipTool
                      title={`${
                        order.orderStatus === 'pending'
                          ? 'Accept Order'
                          : order.orderStatus === 'accepted'
                          ? 'Process'
                          : 'Serve'
                      } ${order.dishName}`}
                    >
                      <Button
                        className="bg-transparent hover:bg-transparent"
                        onClick={() =>
                          handleAcceptItem(order.id, order.dishId, order.orderQuantity, order.orderStatus)
                        }
                      >
                        {order.orderStatus === 'pending' && (
                          <FaRegCheckCircle className="size-4 text-orange-500 hover:text-green-500" />
                        )}
                        {order.orderStatus === 'accepted' && (
                          <PiCookingPotBold className="size-4 text-orange-500 hover:text-green-500" />
                        )}
                        {order.orderStatus === 'processing' && (
                          <BiDish className="size-4 text-orange-500 hover:text-green-500" />
                        )}
                      </Button>
                    </TooltipTool>
                  ) : !openOrderStatus ? (
                    <p className="text-xs italic">Accept the Order</p>
                  ) : (
                    <p className="text-xs italic">Order Served</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
export default View;
