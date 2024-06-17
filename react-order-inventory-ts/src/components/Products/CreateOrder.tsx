import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import TooltipTool from '../TooltipTool';

const CreateOrder = () => {
  return (
    <>
      <TooltipTool title="Add Product">
        <Button className="flex flex-row gap-2 bg-orange-500 px-6 py-4" size={'sm'}>
          <PlusIcon /> Order
        </Button>
      </TooltipTool>
    </>
  );
};
export default CreateOrder;
