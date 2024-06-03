import Add from '@/components/Inventory/Add';
import List from '@/components/Inventory/List';

const Inventory = () => {
  return (
    <div className="flex flex-col gap-4 my-4">
      <h1>Inventory</h1>
      <Add />
      <List />
    </div>
  );
};
export default Inventory;
