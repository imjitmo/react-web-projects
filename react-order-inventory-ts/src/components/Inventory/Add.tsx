import AddForm from '@/components/Inventory/AddForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import DialogTool from '../DialogTool';

const Add = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <Button
        className="bg-orange-500 text-slate-50 rounded-xl flex flex-row gap-2 items-center justify-center max-w-[80px]"
        onClick={() => setOnOpen((prev) => !prev)}
      >
        <IoMdAdd />
        Item
      </Button>

      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Add new item"
        description="This item will be added to your inventory list"
      >
        <AddForm />
      </DialogTool>
    </>
  );
};
export default Add;
