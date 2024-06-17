import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCustomers } from '@/hooks/use/useCustomers';
import Pagination from '@/hooks/utils/Pagination';
import { useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import PaginationButtons from '../Pagination/PaginationButtons';
import SearchTerm from '../SearchTerm';
const Order = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { customersData, isPending } = useGetCustomers();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const customerListData = searchTerm
    ? customersData?.filter(
        (customer) =>
          customer.csFirstName.toLowerCase().includes(searchTerm) ||
          customer.csLastName.toLowerCase().includes(searchTerm) ||
          customer.csEmail.toLowerCase().includes(searchTerm)
      )
    : customersData;
  const records = customerListData?.slice(firstIndex, lastIndex);
  const totalPages = customersData ? customersData.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);
  return (
    <>
      <div className="flex justify-between items-center">
        <p>Total Customers: {customersData?.length}</p>
        <SearchTerm placeholder={'Search customer name...'} setSearchTerm={setSearchTerm} />
      </div>
      <Table>
        {!isPending && <TableCaption>A list of current registered customers</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Reward Points</TableHead>
            <TableHead>Coupon Code</TableHead>
            <TableHead>Coupon Discount</TableHead>
            <TableHead>Coupon</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {records && records.length > 0 ? (
            records?.map((customer) => (
              <TableRow className="cursor-default" key={customer.id}>
                <TableCell className="font-medium uppercase">{`#${customer.id.slice(0, 8)}`}</TableCell>
                <TableCell>{customer.csEmail}</TableCell>
                <TableCell>{` ${customer.csFirstName} ${customer.csLastName}`}</TableCell>
                <TableCell>{customer.csRewardPoints}</TableCell>
                <TableCell>{customer.csCouponName}</TableCell>
                <TableCell>{`${customer.csCouponDiscount * 100}%`}</TableCell>
                <TableCell className={`${customer.csCouponState ? 'text-red-500' : 'text-green-500'}`}>
                  {customer.csCouponState ? 'Redemeed' : 'Redeemable'}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
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
export default Order;
