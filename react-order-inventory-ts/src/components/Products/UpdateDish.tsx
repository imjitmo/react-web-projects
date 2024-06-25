import { Dish, EditDish as EditModel } from '@/hooks/models/Dishes';
import { useUpdateDish } from '@/hooks/use/useDishes';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';
import EditDish from './EditDish';

const UpdateDish = ({ dishData }: { dishData: Dish }) => {
  const { displayName } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
    }))
  );
  const [onOpen, setOnOpen] = useState(false);
  const { updateDish, isUpdating } = useUpdateDish();
  const handleSubmit = (value: EditModel) => {
    updateDish(
      { ...value, updatedBy: displayName },
      {
        onSuccess: () => {
          setOnOpen(false);
        },
      }
    );
  };
  return (
    <>
      <TooltipTool title={`Update ${dishData.dishName}`}>
        <span onClick={() => setOnOpen((prev) => !prev)}>
          <FaRegEdit className="size-6 text-orange-500 cursor-pointer" />
        </span>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header={`Update ${dishData.dishName}`}
        description="This item will be updated to your dish list"
      >
        <EditDish dishData={dishData} handleSubmit={handleSubmit} isLoading={isUpdating} />
      </DialogTool>
    </>
  );
};
export default UpdateDish;
