import { Button } from '@/components/ui/button';
import { Inventory } from '@/hooks/models/Inventory';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';
import AddForm from './AddForm';

interface UpdateProps {
  data: Inventory;
}

const Update = ({ data }: UpdateProps) => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title="Edit Item">
        <Button
          className="bg-transparent hover:bg-transparent hover:text-orange-500"
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <FaEdit className="size-4" />
        </Button>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Update Item"
        description="This item will be updated in your inventory list"
      >
        <AddForm data={data} />
      </DialogTool>
    </>
  );
};
export default Update;
