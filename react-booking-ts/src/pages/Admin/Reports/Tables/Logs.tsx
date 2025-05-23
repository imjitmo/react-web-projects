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
import { TimestampTzFormatter } from '@/components/UiHooks/Formatter';
import PaginationButtons from '@/components/UiHooks/PaginationButtons';
import Pagination from '@/hooks/utils/Pagination';
const Logs = (props: any) => {
  //pagination
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = props?.reportData?.slice(firstIndex, lastIndex);
  const totalPages = props?.reportData ? props.reportData.length : 0;
  const numPage = Math.ceil(totalPages / recordsPerPage);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!props && !props.reportData && (
            <TableRow>
              <TableCell colSpan={8}>No data found.</TableCell>
            </TableRow>
          )}
          {props &&
            props.reportData &&
            records.map((data: any) => (
              <TableRow>
                <TableCell className="uppercase font-bold">{data.userId.substring(0, 8)}</TableCell>
                <TableCell>{data.userEmail}</TableCell>
                <TableCell>{data.userName}</TableCell>
                <TableCell className="capitalize">
                  {data.userType === 'admin' ? 'trainer' : 'student'}
                </TableCell>
                <TableCell className="capitalize">{data.action}</TableCell>
                <TableCell>{TimestampTzFormatter(data.created_at)}</TableCell>
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
