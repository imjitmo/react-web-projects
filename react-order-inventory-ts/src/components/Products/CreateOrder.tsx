import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { PlusIcon } from '@radix-ui/react-icons';
import { MdClearAll } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import TooltipTool from '../TooltipTool';

const CreateOrder = () => {
  const { orderId, clearId, setOrderId, clearCart } = useStore(
    useShallow((state) => ({
      setOrderId: state.setOrderId,
      orderId: state.orderId,
      clearId: state.clearId,
      clearCart: state.clearCart,
    }))
  );

  const handleCreateOrder = () => {
    if (orderId) {
      clearId();
      clearCart();
      return;
    }
    setOrderId({ orderId: 'asdadasds' });
  };
  return (
    <>
      <TooltipTool title={`${orderId ? 'Cancel Order' : 'Create Order'}`}>
        <Button
          className={`flex flex-row gap-2 ${orderId ? 'bg-red-500' : 'bg-orange-500'}  px-6 py-4`}
          size={'sm'}
          onClick={() => handleCreateOrder()}
        >
          {orderId ? (
            <>
              <MdClearAll /> Cancel Order
            </>
          ) : (
            <>
              <PlusIcon /> Order Item
            </>
          )}
        </Button>
      </TooltipTool>
    </>
  );
};
export default CreateOrder;
