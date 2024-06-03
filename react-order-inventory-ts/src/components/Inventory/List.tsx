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
import Update from './Update';

const List = () => {
  const { inventory, isPending } = useGetInventory();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = inventory?.slice(firstIndex, lastIndex);
  const totalPages = inventory ? inventory.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);

  return (
    <>
      <Table className="w-full table-fixed">
        <TableCaption>{!records && !isPending && 'A list of your inventory.'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead className="w-72">Item Name</TableHead>
            <TableHead className="w-72">Type</TableHead>
            <TableHead className="w-72">Category</TableHead>
            <TableHead className="w-72">Quantity</TableHead>
            <TableHead className="w-72">Availability</TableHead>
            <TableHead className="w-32">Action</TableHead>
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
              <TableCell
                className={`capitalize ${item?.itemAvailability ? 'text-green-500' : 'text-red-500'}`}
              >
                {item?.itemAvailability ? 'Available' : 'Not Available'}
              </TableCell>
              <TableCell>
                <Update data={item} />
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
