import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { blankImage } from '@/hooks/data/selectValues';
import { useAddToOrderList, useCancelOrder, useUpdateCurrentOrder } from '@/hooks/use/useOrders';
import { useStore } from '@/store/store';
import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';
import { ImSpinner } from 'react-icons/im';
import { MdClearAll } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import DialogTool from '../DialogTool';
import QuantityChangeButtons from '../QuantityChangeButtons';
import TooltipTool from '../TooltipTool';

const Cart = () => {
  const { updateOrder, isUpdating } = useUpdateCurrentOrder();
  const { addToListOfOrders, isAdding } = useAddToOrderList();
  const { clearCart, dishes, removeFromCart, totalPrice, totalQuantity, clearId, orderId } = useStore(
    useShallow((state) => ({
      clearCart: state.clearCart,
      dishes: state.dishes,
      removeFromCart: state.removeFromCart,
      totalPrice: state.totalPrice,
      totalQuantity: state.totalQuantity,
      clearId: state.clearId,
      orderId: state.orderId,
    }))
  );
  const [onCancelOrder, setOnCancelOrder] = useState(false);
  const [onClearCart, setOnClearCart] = useState(false);
  const [onRemoveDishId, setOnRemoveDishId] = useState(false);
  const [onDishId, setOnDishId] = useState('');

  const { cancelOrderNumber, isCancelling } = useCancelOrder();

  const handleCancelOrder = () => {
    cancelOrderNumber(orderId, {
      onSuccess: () => {
        clearId();
        clearCart();
        setOnCancelOrder(false);
      },
    });
  };

  const handleRemoveItem = (dishId: string) => {
    removeFromCart(dishId);
    setOnRemoveDishId(false);
    setOnDishId('');
    toast.success('Order Item Removed', {
      id: 'cart',
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart Cleared', {
      id: 'cart',
    });
    setOnClearCart(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePlaceOrder = (dishData: any) => {
    updateOrder(
      {
        id: orderId,
        orderItemQuantity: dishData.totalQuantity,
        orderTotalPrice: dishData.totalPrice,
      },
      {
        onSuccess: () => {
          addToListOfOrders(dishData.dishes, {
            onSuccess: () => {
              clearId();
              clearCart();
            },
          });
        },
      }
    );
  };
  return (
    <>
      <Popover>
        <PopoverTrigger className="flex flex-row relative" asChild>
          <Button className="text-slate-50 bg-orange-500" size="icon" disabled={isUpdating || isAdding}>
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
              {totalQuantity > 0 && (
                <TooltipTool title="Clear Orders">
                  <Button variant="destructive" size="icon" onClick={() => setOnClearCart(true)}>
                    <MdClearAll />
                  </Button>
                </TooltipTool>
              )}
            </div>

            <div className="flex flex-row gap-1">
              {totalQuantity > 0 && (
                <TooltipTool title="Place Order to Kitchen">
                  <Button
                    className="bg-orange-500"
                    onClick={() => handlePlaceOrder({ dishes: [...dishes], totalPrice, totalQuantity })}
                  >
                    Place Order
                  </Button>
                </TooltipTool>
              )}
              {orderId && (
                <TooltipTool title="Cancel Order">
                  <Button variant={'destructive'} size="icon" onClick={() => setOnCancelOrder(true)}>
                    {isCancelling ? <ImSpinner className="animate-spin" /> : <Cross1Icon />}
                  </Button>
                </TooltipTool>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <Card key={dish.dishId} className="flex flex-col bg-slate-950 text-slate-50">
                  <CardHeader>
                    <CardTitle className="flex flex-row items-center justify-between">
                      <p className="uppercase">{`item #${dish.dishId.slice(0, 8)}`}</p>
                      <TooltipTool title="Remove from order list">
                        <Button
                          onClick={() => {
                            setOnDishId(dish.dishId);
                            setOnRemoveDishId(true);
                          }}
                          size="icon"
                          variant="destructive"
                        >
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
                    Quantity: <QuantityChangeButtons dishId={dish.dishId} />
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
      <DialogTool
        setOnOpen={setOnCancelOrder}
        onOpen={onCancelOrder}
        header="Cancel Order"
        description={
          'Are you sure you want to cancel this order? Upon doing, the entire items will be removed from your cart and the order number will be cancelled.'
        }
      >
        <div className="flex flex-row flex-wrap gap-4">
          <Button className="grow" variant="destructive" onClick={() => handleCancelOrder()}>
            Yes
          </Button>
          <Button className="bg-slate-500" onClick={() => setOnCancelOrder(false)}>
            Cancel
          </Button>
        </div>
      </DialogTool>
      <DialogTool
        setOnOpen={setOnClearCart}
        onOpen={onClearCart}
        header="Clear Cart"
        description="Are you sure you want to clear your cart? This will remove all the items inside your cart. But you can still add new items."
      >
        <div className="flex flex-row flex-wrap gap-4">
          <Button className="grow" variant="destructive" onClick={() => handleClearCart()}>
            Yes
          </Button>
          <Button className="bg-slate-500" onClick={() => setOnClearCart(false)}>
            Cancel
          </Button>
        </div>
      </DialogTool>
      <DialogTool
        setOnOpen={setOnRemoveDishId}
        onOpen={onRemoveDishId}
        header="Remove Order Item"
        description="Are you sure you want to remove this item from your cart? But you can still add new items."
      >
        <div className="flex flex-row flex-wrap gap-4">
          <Button className="grow" variant="destructive" onClick={() => handleRemoveItem(onDishId)}>
            Yes
          </Button>
          <Button className="bg-slate-500" onClick={() => setOnClearCart(false)}>
            Cancel
          </Button>
        </div>
      </DialogTool>
    </>
  );
};
export default Cart;
