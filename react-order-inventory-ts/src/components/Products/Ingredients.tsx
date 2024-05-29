import { Button } from '@/components/ui/button';
import { ingredientTypes } from './AddForm';

interface IngredientsProps {
  opener: boolean;
  setOpener: React.Dispatch<React.SetStateAction<boolean>>;
  render: ingredientTypes[];
  children: React.ReactNode;
  title: string;
}

const Ingredients = ({ opener, setOpener, render, children, title }: IngredientsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-bold">{title}</p>
        <Button
          type="button"
          className="bg-transparent hover:bg-transparent hover:text-orange-500 font-bold text-sm"
          size={'sm'}
          onClick={() => setOpener((prev) => !prev)}
        >
          {opener ? 'Close' : 'Add'}
        </Button>
      </div>
      <div className="flex flex-wrap justify-start gap-x-4">
        {render?.map((items) => (
          <p key={items?.name} className="text-sm">{` ${items?.name} * ${items?.quantity}${items?.unit}`}</p>
        ))}
      </div>
      {children}
    </div>
  );
};
export default Ingredients;
