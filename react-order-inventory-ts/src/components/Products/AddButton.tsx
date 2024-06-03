import { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import TooltipTool from '../TooltipTool';
import { Card, CardContent, CardHeader } from '../ui/card';
import AddDialog from './AddDialog';

const AddButton = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title="Add Product">
        <Card
          className="flex justify-center items-center min-w-[240px] max-w-[240px] text-center bg-slate-950 my-8 text-slate-50 border-2 border-dashed border-orange-500 group hover:bg-orange-300/10 hover:border-orange-400 cursor-pointer"
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <CardHeader>
            <CardContent className="">
              <IoAddCircleOutline className="size-12 text-orange-500 group-hover:text-orange-400" />
            </CardContent>
          </CardHeader>
        </Card>
      </TooltipTool>
      <AddDialog onOpen={onOpen} setOnOpen={setOnOpen} />
    </>
  );
};
export default AddButton;
