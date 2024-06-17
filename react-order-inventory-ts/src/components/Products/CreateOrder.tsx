import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { PlusIcon } from '@radix-ui/react-icons';
import { useShallow } from 'zustand/react/shallow';
import TooltipTool from '../TooltipTool';

const CreateOrder = () => {
  const { orderId, clearId, setOrderId } = useStore(
    useShallow((state) => ({
      setOrderId: state.setOrderId,
      orderId: state.orderId,
      clearId: state.clearId,
    }))
  );
  console.log(orderId);
  return (
    <>
      <TooltipTool title="Add Product">
        <Button
          className="flex flex-row gap-2 bg-orange-500 px-6 py-4"
          size={'sm'}
          onClick={() => setOrderId({ orderId: 'asdadasds' })}
        >
          <PlusIcon /> Order
        </Button>
      </TooltipTool>
      <Button onClick={clearId}>Clear</Button>
    </>
  );
};
export default CreateOrder;
