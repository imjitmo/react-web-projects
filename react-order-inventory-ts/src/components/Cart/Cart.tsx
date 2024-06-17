import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStore } from '@/store/store';
import { TrashIcon } from '@radix-ui/react-icons';
import { FaShoppingCart } from 'react-icons/fa';
import { TbCircleX } from 'react-icons/tb';
import { useShallow } from 'zustand/react/shallow';
import QuantityChangeButtons from '../QuantityChangeButtons';

const Cart = () => {
  const { clearCart, dishes, removeFromCart, totalPrice, totalQuantity } = useStore(
    useShallow((state) => ({
      clearCart: state.clearCart,
      dishes: state.dishes,
      removeFromCart: state.removeFromCart,
      totalPrice: state.totalPrice,
      totalQuantity: state.totalQuantity,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger className="flex flex-row relative" asChild>
        <Button className="text-slate-50 bg-orange-500" size="icon">
          <FaShoppingCart />
          {totalQuantity > 0 && (
            <div className="bg-red-500 size-6 left-[-0.75rem] top-[-0.5rem] rounded-full flex flex-wrap items-center justify-center inset-0 absolute">
              <p className="text-xs">{totalQuantity}</p>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96 h-[48rem] bg-slate-950 text-slate-50">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2 text-lg items-center">
            <h1>Cart</h1>
            <Button variant="destructive" size="icon" onClick={clearCart}>
              <TbCircleX />
            </Button>
          </div>
          {totalQuantity > 0 && (
            <Button
              className="bg-orange-500"
              onClick={() => console.log({ ...dishes, totalPrice, totalQuantity })}
            >
              Place Order
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <Card key={dish.id} className="flex flex-col bg-slate-950 text-slate-50">
                <CardHeader className="flex flex-row items-center gap-2">
                  <CardTitle>{dish.dishName}</CardTitle>
                  <Button onClick={() => removeFromCart(dish.id)} size="icon" variant="destructive">
                    <TrashIcon />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p>&#8369; {dish.dishPrice}</p>
                </CardContent>
                <CardFooter>
                  <QuantityChangeButtons dishId={dish.id} />
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No dishes on the cart!</p>
          )}
        </div>
        <p>Total: &#8369; {totalPrice}</p>
      </PopoverContent>
    </Popover>
  );
};
export default Cart;
