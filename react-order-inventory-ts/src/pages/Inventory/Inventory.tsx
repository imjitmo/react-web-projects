import Add from '@/components/Inventory/Add';
import List from '@/components/Inventory/List';
import { useState } from 'react';

const Inventory = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 my-4">
      <h1>Inventory</h1>
      <Add onOpen={onOpen} setOnOpen={setOnOpen} />
      <List />
    </div>
  );
};
export default Inventory;
