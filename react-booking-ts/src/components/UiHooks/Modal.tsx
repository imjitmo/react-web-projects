import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { JSX } from 'react';

interface DialogProps {
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | React.ReactNode;
  header?: string;
  description?: string;
  className?: string;
}

const Modal = ({ onOpen, setOnOpen, children, header, description, className }: DialogProps) => {
  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogContent
        className={`${className} bg-slate-50 text-blue-950 dark:bg-slate-950 dark:text-slate-50 lg:max-w-screen-md overflow-y-scroll max-h-screen`}
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
