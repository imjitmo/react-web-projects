import { Button } from '@/components/ui/button';
import { useCancelOrder, useCreateOrderNumber } from '@/hooks/use/useOrders';
import { useStore } from '@/store/store';
import { PlusIcon } from '@radix-ui/react-icons';
import { MdClearAll } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
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

  const handleCreateOrder = () => {
    if (orderId) {
      cancelOrderNumber(orderId, {
        onSuccess: () => {
          clearId();
          clearCart();
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
          onClick={() => handleCreateOrder()}
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
    </>
  );
};
export default CreateOrder;
