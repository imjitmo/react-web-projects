import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { LuScanLine } from 'react-icons/lu';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';

import Scanner from './Scanner';
import { discountPoints } from './points';

interface DiscountProps {
  onDiscount?: boolean;
  setOnDiscount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Discount = ({ onDiscount, setOnDiscount }: DiscountProps) => {
  const {
    setDiscountedPrice,
    dishes,
    setAppliedDiscount,
    appliedDiscount,
    customerData,
    setReward,
    totalPrice,
    clearDiscount,
  } = useStore(
    useShallow((state) => ({
      setDiscountedPrice: state.setDiscountedPrice,
      dishes: state.dishes,
      setAppliedDiscount: state.setAppliedDiscount,
      appliedDiscount: state.appliedDiscount,
      customerData: state.customerData,
      setReward: state.setReward,
      totalPrice: state.totalPrice,
      clearDiscount: state.clearDiscount,
    }))
  );
  const [onOpen, setOnOpen] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [onApplyRewards, setOnApplyRewards] = useState(false);
  const [onApplyDiscount, setOnApplyDiscount] = useState(false);
  const [onSelection, setOnSelection] = useState(false);
  const [onRewardSelect, setOnRewardSelect] = useState(false);

  const [newPoints, setNewPoints] = useState('');
  const onApplyHandle = () => {
    setAppliedDiscount(Number(newPoints));
    setDiscountedPrice(Number(newPoints));
    setOnDiscount(false);
    setShowApply(false);
  };

  const handleRewards = () => {
    const totalPoints = Math.floor(totalPrice / 100) * 5;
    setReward(totalPoints);
    setOnDiscount(false);
    setShowApply(false);
  };

  return (
    <div className="flex flex-col flex-wrap gap-4">
      {dishes.length > 0 && appliedDiscount <= 0 && !customerData?.email && (
        <div className="flex flex-row flex-wrap gap-2">
          <Button
            className="bg-orange-500 flex flex-row flex-wrap gap-2"
            onClick={() => setOnOpen((prev) => !prev)}
          >
            <LuScanLine className="size-[1.15rem]" /> Scan QR
          </Button>
          {onDiscount && <Button onClick={() => setOnDiscount(false)}>Cancel</Button>}
        </div>
      )}
      {onSelection && (
        <div className="flex flex-row flex-wrap gap-2">
          {!onApplyDiscount && !onApplyRewards && (
            <Button className="bg-green-500" onClick={() => setOnRewardSelect((prev) => !prev)}>
              Rewards
            </Button>
          )}
          {!onApplyDiscount && !onApplyRewards && (
            <Button className="bg-orange-500" onClick={() => setOnApplyDiscount(true)}>
              Discounts
            </Button>
          )}
        </div>
      )}
      {onApplyDiscount && customerData?.email && appliedDiscount <= 0 && (
        <div className="flex flex-col flex-wrap gap-2">
          <Select
            value={newPoints}
            onValueChange={(val) => {
              setNewPoints(val);
              setShowApply(true);
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Discount %" />
            </SelectTrigger>
            <SelectContent className="bg-slate-950 text-slate-50">
              <SelectGroup>
                <SelectLabel>Discount %</SelectLabel>
                {discountPoints
                  .filter((point) => point.points <= Number(customerData?.points))
                  .map((point) => (
                    <SelectItem key={point.value} value={point.value}>
                      {point.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {showApply && (
            <Button className="bg-orange-500" onClick={onApplyHandle}>
              Apply
            </Button>
          )}
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setOnDiscount(false);
              setOnApplyRewards(false);
              setOnApplyDiscount(false);
              clearDiscount();
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <DialogTool
        setOnOpen={setOnOpen}
        onOpen={onOpen}
        header="Scan QR Code"
        description="Scan QR Code to avail discounts"
      >
        <Scanner setOnOpen={setOnOpen} setOnSelection={setOnSelection} />
      </DialogTool>
      <DialogTool
        setOnOpen={setOnRewardSelect}
        onOpen={onRewardSelect}
        header="Add Reward Points"
        description="Do you want to continue adding reward points to the user? If yes, you will gain 5 Reward Points per &#8369;100.00 purchase."
      >
        <div className="flex flex-row flex-wrap gap-2">
          <Button className="grow bg-orange-500" onClick={handleRewards}>
            Accept
          </Button>
          <Button variant="destructive" onClick={() => setOnRewardSelect((prev) => !prev)}>
            Cancel
          </Button>
        </div>
      </DialogTool>
    </div>
  );
};
export default Discount;
