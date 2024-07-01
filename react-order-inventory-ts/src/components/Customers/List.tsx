import { Button } from '@/components/ui/button';
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
import { FaRegHandPointUp } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import DialogTool from '../DialogTool';
import PaginationButtons from '../Pagination/PaginationButtons';
import SearchTerm from '../SearchTerm';
import TooltipTool from '../TooltipTool';
import AddPoints from './AddPoints';
const Order = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { customersData, isPending } = useGetCustomers();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const [userId, setUserId] = useState('');
  const [onOpen, setOnOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPoints, setUserPoints] = useState(0);
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
        <SearchTerm placeholder={'Search customer...'} setSearchTerm={setSearchTerm} />
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
            <TableHead>Added By</TableHead>
            <TableHead>Updated By</TableHead>
            <TableHead>Action</TableHead>
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
                <TableCell className="capitalize">{customer.addedBy}</TableCell>
                <TableCell className="capitalize">{customer.updatedBy}</TableCell>
                <TableCell>
                  <TooltipTool title="Add Points">
                    <Button
                      className="bg-transparent shadow-none border-none hover:bg-transparent"
                      onClick={() => {
                        setUserId(customer.id);
                        setUserName(`${customer.csFirstName} ${customer.csLastName}`);
                        setUserPoints(customer.csRewardPoints);
                        setOnOpen(true);
                      }}
                    >
                      <FaRegHandPointUp className="size-4 text-orange-500 hover:text-slate-50" />
                    </Button>
                  </TooltipTool>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
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
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header={`Add reward points to ${userName}`}
        description="Add Additional Rewards Points to selected customer"
      >
        <AddPoints customerId={userId} userName={userName} userPoints={userPoints} setOnOpen={setOnOpen} />
      </DialogTool>
    </>
  );
};
export default Order;
