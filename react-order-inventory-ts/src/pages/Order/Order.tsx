import CreateOrder from '@/components/Products/CreateOrder';
import List from '@/components/Products/List';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';

const Order = () => {
  const { userType } = useStore(useShallow((state) => ({ userType: state.userType })));
  // const handleOrder = (order: Record<string, unknown>) => {
  //   console.log(order);
  // };

  return (
    <>
      {userType !== 'kitchen staff' && userType !== 'cashier' && <CreateOrder />}
      <List pageType={'order'} />
    </>
  );
};
export default Order;
