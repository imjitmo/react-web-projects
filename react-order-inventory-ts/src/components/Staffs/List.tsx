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
import { useGetStaffs, useUpdateStaffStatus } from '@/hooks/use/useStaff';
import Pagination from '@/hooks/utils/Pagination';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';
import PaginationButtons from '../Pagination/PaginationButtons';
import SearchTerm from '../SearchTerm';
import TooltipTool from '../TooltipTool';

const List = () => {
  const { updateStaffStatus, isUpdating } = useUpdateStaffStatus();
  const [searchTerm, setSearchTerm] = useState('');
  const { staffsData, isPending } = useGetStaffs();
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const { email, userType } = useStore(
    useShallow((state) => ({ email: state.email, userType: state.userType }))
  );
  const filteredStaffList = staffsData?.filter((staff) => staff.email !== email);
  const staffsListData = searchTerm
    ? filteredStaffList?.filter(
        (staff) =>
          staff.displayName.toLowerCase().includes(searchTerm) ||
          staff.email.toLowerCase().includes(searchTerm) ||
          staff.userType.toLowerCase().includes(searchTerm)
      )
    : filteredStaffList;

  const records = staffsListData?.slice(firstIndex, lastIndex);
  const totalPages = staffsData ? staffsData.length : 0;
  const npage = Math.ceil(totalPages / recordsPerPage);
  return (
    <>
      <div className="flex justify-between items-center">
        <p>Total Staffs: {staffsListData?.length}</p>
        <SearchTerm placeholder={'Search staff...'} setSearchTerm={setSearchTerm} />
      </div>
      <Table>
        {!isPending && <TableCaption>A list of current registered staffs</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Display Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Staff Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {records && records.length > 0 ? (
            records?.map((staff) => (
              <TableRow className="cursor-default" key={staff.id}>
                <TableCell className="font-medium uppercase">{`#${staff.id.slice(0, 8)}`}</TableCell>
                <TableCell className="capitalize">{staff.displayName}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell className="capitalize">{staff.userType}</TableCell>
                <TableCell className={`${staff.status ? 'text-green-500' : 'text-red-500'}`}>
                  {staff.status ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell>
                  {
                    <TooltipTool
                      title={
                        userType === 'super'
                          ? staff.status
                            ? 'Deactivate'
                            : 'Activate'
                          : staff.userType !== 'admin' && userType === 'admin'
                          ? staff.status
                            ? 'Deactivate'
                            : 'Activate'
                          : 'Co-Admin cannot be activated/deactivated'
                      }
                    >
                      <Button
                        className={`border-none shadow-none bg-transparent hover:bg-transparent outline-none hover:outline-none ${
                          staff.status ? 'text-red-500' : 'text-green-500'
                        }`}
                        onClick={() => {
                          userType === 'super' && updateStaffStatus({ id: staff.id, status: !staff.status });
                          userType === 'admin' &&
                            staff.userType !== 'admin' &&
                            updateStaffStatus({ id: staff.id, status: !staff.status });
                        }}
                        disabled={isUpdating}
                      >
                        {/* {staff.userType !== 'admin' ? (
                          staff.status ? (
                            <IoIosRemoveCircle className="size-6" />
                          ) : (
                            <IoIosAddCircle className="size-6" />
                          )
                        ) : userType === 'super' && staff.status ? (
                          <IoIosRemoveCircle className="size-6" />
                        ) : (
                          <IoIosAddCircle className="size-6" />
                        )} */}

                        {userType === 'super' ? (
                          staff.status ? (
                            <IoIosRemoveCircle className="size-6" />
                          ) : (
                            <IoIosAddCircle className="size-6" />
                          )
                        ) : staff.userType !== 'admin' && userType === 'admin' ? (
                          staff.status ? (
                            <IoIosRemoveCircle className="size-6" />
                          ) : (
                            <IoIosAddCircle className="size-6" />
                          )
                        ) : null}
                      </Button>
                    </TooltipTool>
                  }
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
export default List;
