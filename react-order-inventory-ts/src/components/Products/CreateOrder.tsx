import { Button } from '@/components/ui/button';
import { useCancelOrder, useCreateOrderNumber } from '@/hooks/use/useOrders';
import { useStore } from '@/store/store';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { MdClearAll } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';

const CreateOrder = () => {
  const { orderId, clearId, setOrderId, clearCart, displayName } = useStore(
    useShallow((state) => ({
      setOrderId: state.setOrderId,
      orderId: state.orderId,
      clearId: state.clearId,
      clearCart: state.clearCart,
      displayName: state.displayName,
    }))
  );

  const { createOrderNumber, isCreating } = useCreateOrderNumber();
  const { cancelOrderNumber, isCancelling } = useCancelOrder();
  const [onCancelOrder, setOnCancelOrder] = useState(false);

  const handleCreateOrder = () => {
    if (orderId) {
      cancelOrderNumber(orderId, {
        onSuccess: () => {
          clearId();
          clearCart();
          setOnCancelOrder(false);
        },
      });
      return;
    }
    if (displayName) {
      createOrderNumber(displayName, {
        onSuccess: (data) => {
          setOrderId({ orderId: data });
        },
      });
    }
  };
  return (
    <>
      <TooltipTool title={`${orderId ? 'Cancel Order' : 'Create Order'}`}>
        <Button
          className={`flex flex-row gap-2 ${orderId ? 'bg-red-500' : 'bg-orange-500'}  px-6 py-4`}
          size={'sm'}
          onClick={() => (orderId ? setOnCancelOrder(true) : handleCreateOrder())}
          disabled={isCreating || isCancelling}
        >
          {orderId ? (
            <>
              {isCancelling ? (
                'Cancelling...'
              ) : (
                <>
                  <MdClearAll /> Cancel Order
                </>
              )}
            </>
          ) : (
            <>
              {isCreating ? (
                'Creating...'
              ) : (
                <>
                  <PlusIcon /> Create Order
                </>
              )}
            </>
          )}
        </Button>
      </TooltipTool>
      <DialogTool
        setOnOpen={setOnCancelOrder}
        onOpen={onCancelOrder}
        header="Cancel Order"
        description={
          'Are you sure you want to cancel this order? Upon doing, the entire items will be removed from your cart and the order number will be cancelled.'
        }
      >
        <div className="flex flex-row flex-wrap gap-4">
          <Button
            className="grow"
            variant="destructive"
            onClick={() => handleCreateOrder()}
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Yes'}
          </Button>
          <Button className="bg-slate-500" onClick={() => setOnCancelOrder(false)}>
            Cancel
          </Button>
        </div>
      </DialogTool>
    </>
  );
};
export default CreateOrder;
