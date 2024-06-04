import List from '@/components/Products/List';

const Order = () => {
  // const handleOrder = (order: Record<string, unknown>) => {
  //   console.log(order);
  // };

  return (
    <div className="flex flex-col gap-4">
      <List pageType={'order'} />
    </div>
  );
};
export default Order;
