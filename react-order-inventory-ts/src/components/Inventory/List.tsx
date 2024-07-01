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

import { useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { useSearchParams } from 'react-router-dom';
import PaginationButtons from '../Pagination/PaginationButtons';
import SearchParams from '../SearchParams';
import SearchTerm from '../SearchTerm';
import Update from './Update';

const List = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { inventory, isPending } = useGetInventory();
  const [searchParams] = useSearchParams({ type: 'all' });
  const filterParams = searchParams.get('type');
  const inventoryRecords =
    filterParams === 'all' ? inventory : inventory?.filter((item) => item.itemType === filterParams);
  const inventoryListRecords = searchTerm
    ? inventoryRecords?.filter((item) => item.itemName.toLowerCase().includes(searchTerm))
    : inventoryRecords;
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = inventoryListRecords?.slice(filterParams === 'all' ? firstIndex : 0, lastIndex);
  const totalPages = inventoryRecords ? inventoryRecords.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);
  const paramValues = [...new Set(inventory?.map((items) => items.itemType))];

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm">Total Items: {inventoryListRecords?.length || 0}</p>
        <SearchTerm placeholder={'Search item name...'} setSearchTerm={setSearchTerm} />
      </div>
      <SearchParams params={'type'} values={paramValues} setCurrentPage={setCurrentPage} />
      <Table>
        <TableCaption>{!records && !isPending && 'A list of your inventory.'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead className="w-72">Item Name</TableHead>
            <TableHead className="w-72">Type</TableHead>
            <TableHead className="w-72">Category</TableHead>
            <TableHead className="w-72">Quantity</TableHead>
            <TableHead className="w-72">Availability</TableHead>
            <TableHead className="w-32">Added By</TableHead>
            <TableHead className="w-32">Updated By</TableHead>
            <TableHead className="w-32">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records && records.length > 0 ? (
            records?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium uppercase">{`#${item.id.slice(0, 8)}`}</TableCell>
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
                <TableCell className="capitalize">{item.addedBy}</TableCell>
                <TableCell className="capitalize">{item.updatedBy}</TableCell>
                <TableCell>
                  <Update data={item} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No records found!
              </TableCell>
            </TableRow>
          )}
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
