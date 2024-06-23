import { Button } from '@/components/ui/button';
import { DeleteDish } from '@/hooks/models/Dishes';
import { useDeleteDish } from '@/hooks/use/useDishes';
import { useRemoveIngredients } from '@/hooks/use/useIngredients';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';

const DeleteMenu = ({ menu }: { menu: DeleteDish }) => {
  const [onOpen, setOnOpen] = useState(false);
  const { removeDish, isDeleting } = useDeleteDish();
  const { deleteIngredients, isRemoving } = useRemoveIngredients();

  const handleDeleteMenu = (id: string) => {
    removeDish(id, {
      onSuccess: () => {
        deleteIngredients(id);
        setOnOpen(false);
      },
    });
  };
  return (
    <>
      <TooltipTool title={`Delete ${menu.dishName}`}>
        <span>
          <MdOutlineDelete
            className="size-6 text-orange-500 cursor-pointer"
            onClick={() => {
              setOnOpen((prev) => !prev);
            }}
          />
        </span>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header={`Delete ${menu.dishName}`}
        description={`This item will be deleted from your menu list! This is irreversible.`}
      >
        <div className="flex flex-col gap-1 flex-wrap">
          <h4>Are you sure you want to delete {menu.dishName}?</h4>
          <p className="text-red-500">This action cannot be undone.</p>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <Button
            className="grow bg-orange-500"
            disabled={isDeleting || isRemoving}
            onClick={() => handleDeleteMenu(menu.id)}
          >
            {isDeleting || isRemoving ? 'Deleting...' : 'Yes'}
          </Button>
          <Button onClick={() => setOnOpen((prev) => !prev)} variant={'destructive'}>
            Cancel
          </Button>
        </div>
      </DialogTool>
    </>
  );
};
export default DeleteMenu;
