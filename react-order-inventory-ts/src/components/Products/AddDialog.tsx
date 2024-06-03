import DialogTool from '../DialogTool';
import AddForm from './AddForm';

interface AddDialogProps {
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDialog = ({ onOpen, setOnOpen }: AddDialogProps) => {
  return (
    <>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Add a new dish"
        description="This item will be added to your inventory list"
      >
        <AddForm />
      </DialogTool>
    </>
  );
};
export default AddDialog;
