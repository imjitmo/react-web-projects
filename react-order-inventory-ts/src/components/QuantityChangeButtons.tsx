import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { useEffect } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useShallow } from 'zustand/react/shallow';

type Props = { dishId: string };

const QuantityChangeButtons = ({ dishId }: Props) => {
  const { getProductById, decreaseQuantity, increaseQuantity, setTotal, setTotalQuantity } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decreaseQuantity: state.decreaseQuantity,
      increaseQuantity: state.increaseQuantity,
      setTotal: state.setTotal,
      setTotalQuantity: state.setTotalQuantity,
    }))
  );
  const product = getProductById(dishId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.dishes,
      (dishes) => {
        setTotal(dishes.reduce((acc, item) => acc + Number(item.dishPrice) * item.quantity, 0));
        setTotalQuantity(dishes.reduce((acc, item) => acc + item.quantity, 0));
      },
      { fireImmediately: true }
    );

    return unSub;
  }, [setTotal, setTotalQuantity]);

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decreaseQuantity(product.dishId)}>
            <BiMinus />
          </Button>
          <p>{product.quantity}</p>
          <Button onClick={() => increaseQuantity(product.dishId)}>
            <BiPlus />
          </Button>
        </div>
      )}
    </>
  );
};
export default QuantityChangeButtons;
