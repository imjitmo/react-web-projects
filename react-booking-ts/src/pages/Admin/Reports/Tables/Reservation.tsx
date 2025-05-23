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
const Reservation = (props: any) => {
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
            <TableHead>Guest Name</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Check-Out</TableHead>
            <TableHead>Tracking</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Booking Date</TableHead>
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
                <TableCell>{data.userName}</TableCell>
                <TableCell>{data.checkIn}</TableCell>
                <TableCell>{data.checkOut}</TableCell>
                <TableCell className="capitalize">{data.bookTracking}</TableCell>
                <TableCell className="capitalize">{data.bookStatus}</TableCell>
                <TableCell className="uppercase">{data.paymentType}</TableCell>
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
export default Reservation;
