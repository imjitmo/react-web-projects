import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ingredientTypes } from './AddForm';

interface AddMainProps {
  listIngredients: ingredientTypes;
  setListIngredients: (value: ingredientTypes) => void;
  handleIngredient: () => void;
  title: string;
}

const AddIngredients = ({ listIngredients, setListIngredients, handleIngredient, title }: AddMainProps) => {
  return (
    <>
      <div className="flex flex-wrap flex-col gap-y-2 gap-x-2 text-sm">
        <label>
          <strong>Name</strong>
        </label>
        <Input
          type="text"
          value={listIngredients?.name || ''}
          onChange={(e) => setListIngredients({ ...listIngredients, name: e.target.value })}
        />
        <label>
          <strong>Quantity</strong>
        </label>
        <Input
          type="number"
          value={listIngredients?.quantity || ''}
          onChange={(e) => setListIngredients({ ...listIngredients, quantity: Number(e.target.value) })}
        />
        <label>
          <strong>Unit</strong>
        </label>
        {/* <Input
          type="text"
          value={listIngredients?.unit}
          onChange={(e) => setListIngredients({ ...listIngredients, unit: e.target.value })}
        /> */}
        <Select onValueChange={(e) => setListIngredients({ ...listIngredients, unit: e })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a unit" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 text-slate-50">
            <SelectGroup>
              <SelectLabel>Unit</SelectLabel>
              <SelectItem value="kg">Kilogram</SelectItem>
              <SelectItem value="g">Gram</SelectItem>
              <SelectItem value="li">Liter</SelectItem>
              <SelectItem value="ml">Milliliter</SelectItem>
              <SelectItem value="pc/s">Piece/s</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="button" onClick={handleIngredient}>
        {title}
      </Button>
    </>
  );
};
export default AddIngredients;
