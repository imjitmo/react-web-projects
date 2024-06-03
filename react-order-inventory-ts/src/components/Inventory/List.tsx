import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useGetInventory } from '@/hooks/use/useInventory';
import { ImSpinner6 } from 'react-icons/im';
const List = () => {
  const { inventory, isPending } = useGetInventory();

  return (
    <>
      <Table className="w-full table-fixed">
        <TableCaption>{!isPending && 'A list of your inventory.'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((item) => (
            <TableRow>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="capitalize">{item.itemName}</TableCell>
              <TableCell className="capitalize">{item.itemType}</TableCell>
              <TableCell className="capitalize">{item.itemCategory}</TableCell>
              <TableCell>
                {item.itemQuantity} {item.itemUnit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isPending && (
        <div className="w-full flex flex-wrap items-center justify-center">
          <ImSpinner6 className="size-8 animate-spin" />
        </div>
      )}
    </>
  );
};
export default List;
