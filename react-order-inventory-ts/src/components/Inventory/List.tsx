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
import Pagination from '@/hooks/utils/Pagination';
import { ImSpinner6 } from 'react-icons/im';
import PaginationButtons from '../Pagination/PaginationButtons';
const List = () => {
  const { inventory, isPending } = useGetInventory();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = inventory?.slice(firstIndex, lastIndex);
  const totalPages = inventory ? inventory.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);

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
          {records?.map((item) => (
            <TableRow key={item.id}>
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
      {npage ? (
        <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} npage={npage} />
      ) : null}
      {isPending && (
        <div className="w-full flex flex-wrap items-center justify-center">
          <ImSpinner6 className="size-8 animate-spin" />
        </div>
      )}
    </>
  );
};
export default List;
