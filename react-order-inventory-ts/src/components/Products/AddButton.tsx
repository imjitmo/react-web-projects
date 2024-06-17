import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import TooltipTool from '../TooltipTool';
import AddDialog from './AddDialog';

const AddButton = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title="Add Product">
        <Button
          className="flex flex-row gap-2 bg-orange-500 px-6 py-4"
          size={'sm'}
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <PlusIcon /> Dish
        </Button>
      </TooltipTool>
      <AddDialog onOpen={onOpen} setOnOpen={setOnOpen} />
    </>
  );
};
export default AddButton;
