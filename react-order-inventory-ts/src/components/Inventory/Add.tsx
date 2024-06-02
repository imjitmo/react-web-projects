import AddForm from '@/components/Inventory/AddForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IoMdAdd } from 'react-icons/io';

interface AddInventoryProps {
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add = ({ onOpen, setOnOpen }: AddInventoryProps) => {
  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 text-slate-50 rounded-xl flex flex-row gap-2 items-center justify-center max-w-[80px]">
          <IoMdAdd />
          Item
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-950 text-slate-50">
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
          <DialogDescription>This item will be added to your inventory list</DialogDescription>
        </DialogHeader>
        <AddForm />
      </DialogContent>
    </Dialog>
  );
};
export default Add;
