import { IngredientProps } from '@/hooks/models/Ingredients';
import { decimalToFraction } from '@/hooks/utils/ToFraction';
import { useState } from 'react';
import DialogTool from '../DialogTool';
import TooltipTool from '../TooltipTool';

interface ViewProps {
  dishData: {
    id: string;
    dishName: string;
    dishDescription: string;
    dishPrice: number;
    dishImage: string;
    dishType: string;
    dishStatus: boolean;
    dishAvailability: boolean;
    addedBy: string | null;
    updatedBy: string | null;
    ingredients: IngredientProps[];
  };
}

const View = ({ dishData }: ViewProps) => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <TooltipTool title="View Dish Detail">
        <p
          className="cursor-pointer text-xs font-bold text-green-500"
          onClick={() => setOnOpen((prev) => !prev)}
        >
          View
        </p>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header={`Details`}
        description="This dish's details will be viewed on this area"
      >
        <div className="flex flex-col gap-4 flex-wrap">
          <div className="flex flex-row flex-wrap gap-4 items-center justify-start">
            <img
              src={dishData?.dishImage}
              className="size-24 rounded-full border-4 border-slate-500 object-cover"
              alt={dishData?.dishName}
            />
            <div className="text-sm flex flex-col gap-1 cursor-default">
              <div className="flex flex-row items-center gap-2">
                <h2>{dishData?.dishName}</h2>
                <p className="capitalize">({dishData?.dishType.split('_').join(' ')})</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4 items-center text-xs italic text-slate-500">
                  <p className="flex flex-row gap-2 items-start">
                    Added by: <span className="text-orange-300 capitalize">{dishData?.addedBy}</span>
                  </p>
                  <p className="flex flex-row gap-2 items-end">
                    Updated by: <span className="text-orange-300 capitalize">{dishData?.updatedBy}</span>
                  </p>
                </div>
                <p>&#8369; {dishData?.dishPrice}</p>

                <div className="flex flex-row gap-2 items-center">
                  <p
                    className={`${
                      dishData?.dishAvailability ? 'text-green-500' : 'text-red-500'
                    } bg-orange-300/30 font-semibold py-1 px-4 rounded-full`}
                  >
                    {dishData?.dishAvailability ? 'Available' : 'Not Available'}
                  </p>
                  <p className={`${dishData?.dishStatus ? 'text-green-500' : 'text-red-500'}`}>
                    {dishData?.dishStatus ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="post-line">
            <h4 className="font-bold">About {dishData?.dishName}</h4>
            <p className="italic text-slate-400 text-sm">{dishData?.dishDescription}</p>
          </div>
          <div className="">
            <h4>Includes</h4>
            <ul>
              {dishData?.ingredients?.length > 0 ? (
                dishData?.ingredients?.map((ingredient) => (
                  <li className="text-sm italic" key={ingredient.id}>
                    {Number.isInteger(Number(ingredient.ingredientQuantity))
                      ? ingredient.ingredientQuantity
                      : decimalToFraction(ingredient.ingredientQuantity)}{' '}
                    {ingredient.ingredientUnit} of {ingredient.ingredientName}
                  </li>
                ))
              ) : (
                <li className="text-red-500 text-sm">No Includes Found!</li>
              )}
            </ul>
          </div>
        </div>
      </DialogTool>
    </>
  );
};
export default View;
