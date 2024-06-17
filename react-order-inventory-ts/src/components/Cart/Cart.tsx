import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { blankImage } from '@/hooks/data/selectValues';
import { useStore } from '@/store/store';
import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons';
import { FaShoppingCart } from 'react-icons/fa';
import { MdClearAll } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import QuantityChangeButtons from '../QuantityChangeButtons';
import TooltipTool from '../TooltipTool';

const Cart = () => {
  const { clearCart, dishes, removeFromCart, totalPrice, totalQuantity, clearId } = useStore(
    useShallow((state) => ({
      clearCart: state.clearCart,
      dishes: state.dishes,
      removeFromCart: state.removeFromCart,
      totalPrice: state.totalPrice,
      totalQuantity: state.totalQuantity,
      clearId: state.clearId,
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
            <h1>Orders</h1>
            <TooltipTool title="Clear Orders">
              <Button variant="destructive" size="icon" onClick={clearCart}>
                <MdClearAll />
              </Button>
            </TooltipTool>
          </div>
          {totalQuantity > 0 && (
            <div className="flex flex-row gap-1">
              <TooltipTool title="Place Order to Kitchen">
                <Button
                  className="bg-orange-500"
                  onClick={() => console.log({ ...dishes, totalPrice, totalQuantity })}
                >
                  Place Order
                </Button>
              </TooltipTool>
              <TooltipTool title="Cancel Order">
                <Button
                  variant={'destructive'}
                  size="icon"
                  onClick={() => {
                    clearCart();
                    clearId();
                  }}
                >
                  <Cross1Icon />
                </Button>
              </TooltipTool>
            </div>
          )}
        </div>
        <div className="space-y-2">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <Card key={dish.id} className="flex flex-col bg-slate-950 text-slate-50">
                <CardHeader>
                  <CardTitle className="flex flex-row items-center justify-between">
                    <p className="uppercase">{`item #${dish.id.slice(0, 8)}`}</p>
                    <TooltipTool title="Remove from order list">
                      <Button onClick={() => removeFromCart(dish.id)} size="icon" variant="destructive">
                        <TrashIcon />
                      </Button>
                    </TooltipTool>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-start">
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      src={(dish.dishImage as string) || blankImage}
                      alt={dish.dishName}
                      className="size-16 rounded-full border-2 border-slate-500 object-cover"
                    />
                    <span>
                      <h2>{dish.dishName}</h2>
                      <p>&#8369; {dish.dishPrice} ea.</p>
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-2">
                  Quantity: <QuantityChangeButtons dishId={dish.id} />
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
