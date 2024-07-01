import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';

const CustomerData = ({ customerData }: { customerData: { email: string; points: number } }) => {
  const { appliedDiscount, clearDiscount } = useStore(
    useShallow((state) => ({
      appliedDiscount: state.appliedDiscount,
      clearDiscount: state.clearDiscount,
    }))
  );
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      {customerData && (
        <div className="flex flex-col gap-2 flex-wrap">
          {appliedDiscount > 0 && (
            <p className="text-xs">
              Applied Discount: <span className="text-orange-500 font-bold">{appliedDiscount * 100}%</span>
            </p>
          )}
          <p className="text-xs">
            Email: <span className="text-orange-300 italic">{customerData.email}</span>
          </p>
          <p className="text-xs">
            Points: <span className="text-orange-300 italic">{customerData.points}</span>
          </p>
          {appliedDiscount > 0 && (
            <p className="text-xs">
              Points used: <span className="text-orange-300 italic">{appliedDiscount * 100 * 20}</span>
            </p>
          )}
          {appliedDiscount > 0 && (
            <Button variant="destructive" onClick={() => setOnOpen((prev) => !prev)}>
              Remove Applied Discount
            </Button>
          )}
        </div>
      )}
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Remove Discount"
        description="Are you sure? Do you really want to remove the discount for this order?"
      >
        <div className="flex flex-row flex-wrap gap-2">
          <Button className="grow" variant="destructive" onClick={() => clearDiscount()}>
            Remove
          </Button>
          <Button className="bg-slate-400">Cancel</Button>
        </div>
      </DialogTool>
    </>
  );
};
export default CustomerData;
