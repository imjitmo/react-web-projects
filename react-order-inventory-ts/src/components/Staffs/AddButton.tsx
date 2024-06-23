import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';
import StaffForm from './StaffForm';

const AddButton = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title="Add New Staff">
        <Button
          className="flex flex-row gap-2 bg-orange-500 px-6 py-4 my-2"
          size={'sm'}
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <PlusIcon /> Add Staff
        </Button>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Add New Staff"
        description="This staff will be added to your staff list"
      >
        <StaffForm />
      </DialogTool>
    </>
  );
};
export default AddButton;
