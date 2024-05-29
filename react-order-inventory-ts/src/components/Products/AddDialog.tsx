import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddForm from './AddForm';

interface AddDialogProps {
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDialog = ({ onOpen, setOnOpen }: AddDialogProps) => {
  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogContent className="bg-slate-950 text-slate-50 overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Add a new dish</DialogTitle>
          <AddForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddDialog;
