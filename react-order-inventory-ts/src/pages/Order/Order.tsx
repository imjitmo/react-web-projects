import CreateOrder from '@/components/Products/CreateOrder';
import List from '@/components/Products/List';

const Order = () => {
  // const handleOrder = (order: Record<string, unknown>) => {
  //   console.log(order);
  // };

  return (
    <>
      <CreateOrder />
      <List pageType={'order'} />
    </>
  );
};
export default Order;
