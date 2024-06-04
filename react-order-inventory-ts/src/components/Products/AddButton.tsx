import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import TooltipTool from '../TooltipTool';
import AddDialog from './AddDialog';

const AddButton = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title="Add Product">
        <Button
          className="flex justify-center items-center text-center bg-slate-950 text-slate-50 border-2 border-dashed border-orange-500 group hover:bg-orange-300/10 hover:border-orange-400 cursor-pointer min-w-[100px]"
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <IoAddCircleOutline className="size-6 text-orange-500 group-hover:text-orange-400" />
        </Button>
      </TooltipTool>
      <AddDialog onOpen={onOpen} setOnOpen={setOnOpen} />
    </>
  );
};
export default AddButton;
