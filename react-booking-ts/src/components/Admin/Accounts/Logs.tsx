/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationButtons from '@/components/UiHooks/PaginationButtons';
import { useGetAllUserLogs } from '@/hooks/use/useUsers';
import Pagination from '@/hooks/utils/Pagination';
import { useEffect, useState } from 'react';

interface LogsProps {
  searchTerm?: string;
}

const Logs = (props: LogsProps) => {
  const { isAllUserLogs, isPending: isLooking } = useGetAllUserLogs();
  const [userLogs, setUserLogs] = useState<any>(null);
  useEffect(() => {
    const fetchLogs = async () => {
      if (!isLooking) {
        const logs = await isAllUserLogs;
        setUserLogs(logs);
      }
    };
    fetchLogs();
  }, [isLooking, isAllUserLogs]);

  //logs list
  const logsList =
    !isLooking && props?.searchTerm
      ? userLogs?.filter((logs: any) => logs.userName.toLowerCase().includes(props?.searchTerm))
      : userLogs;
  //pagination
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = logsList?.slice(firstIndex, lastIndex);
  const totalPages = logsList ? logsList.length : 0;
  const numPage = Math.ceil(totalPages / recordsPerPage);

  return (
    <div>
      <Table>
        <TableCaption>A list of user action logs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLooking &&
            userLogs &&
            records &&
            records.map((log: any) => (
              <TableRow>
                <TableCell className="uppercase">{log.userId.substring(0, 8)}</TableCell>
                <TableCell>{log.userEmail}</TableCell>
                <TableCell className="capitalize">{log.userName}</TableCell>
                <TableCell className="capitalize">
                  {log.userType === 'staff' ? 'Student' : 'Trainer'}
                </TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex flex-row flex-wrap justify-center items-center content-center-safe">
        <div className="w-auto">
          {numPage ? (
            <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} npage={numPage} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Logs;
