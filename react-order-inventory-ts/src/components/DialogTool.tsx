import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DialogProps {
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | React.ReactNode;
  header?: string;
  description?: string;
}

const DialogTool = ({ onOpen, setOnOpen, children, header, description }: DialogProps) => {
  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogContent className="bg-slate-950 text-slate-50 w-auto">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default DialogTool;
