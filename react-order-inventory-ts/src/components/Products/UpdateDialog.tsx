import { useState } from 'react';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';
import UpdateImage from './UpdateImage';

const UpdateDialog = ({
  id,
  children,
  pageType,
}: {
  id: string;
  children: React.ReactNode | JSX.Element;
  pageType: string;
}) => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <span
        onClick={() => {
          if (pageType === 'order') return;
          setOnOpen((prev) => !prev);
        }}
      >
        <TooltipTool title="Update Dish Image">{children}</TooltipTool>
      </span>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Update Image"
        description="This image will be updated in your selected dish"
      >
        <UpdateImage id={id} setOnOpen={setOnOpen} />
      </DialogTool>
    </>
  );
};
export default UpdateDialog;
