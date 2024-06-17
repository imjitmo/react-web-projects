import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { PlusIcon } from '@radix-ui/react-icons';
import { useShallow } from 'zustand/react/shallow';
import TooltipTool from '../TooltipTool';

const CreateOrder = () => {
  const { id, clearId } = useStore(
    useShallow((state) => ({
      setOrderId: state.setOrderId,
      id: state.id,
      clearId: state.clearId,
    }))
  );
  console.log(id);
  return (
    <>
      <TooltipTool title="Add Product">
        <Button className="flex flex-row gap-2 bg-orange-500 px-6 py-4" size={'sm'} onClick={clearId}>
          <PlusIcon /> Order
        </Button>
      </TooltipTool>
    </>
  );
};
export default CreateOrder;
