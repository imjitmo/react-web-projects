import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';
import { Button } from '../ui/button';
import AddForm from './AddForm';

const AddCustomer = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title={'Add New Customer'}>
        <Button className="bg-orange-500 flex gap-1" size={'sm'} onClick={() => setOnOpen((prev) => !prev)}>
          <PlusIcon /> Customer
        </Button>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Add new customer"
        description="This customer will be added to your customer list"
      >
        <AddForm />
      </DialogTool>
    </>
  );
};
export default AddCustomer;
