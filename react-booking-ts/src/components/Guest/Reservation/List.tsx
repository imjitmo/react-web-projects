import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CurrencyFormatter, extrasReducer, TimestampTzFormatter } from '@/components/UiHooks/Formatter';
import PaginationButtons from '@/components/UiHooks/PaginationButtons';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useGetGuestReservations } from '@/hooks/use/useReservation';
import Pagination from '@/hooks/utils/Pagination';
import { useStore } from '@/store/store';
import { differenceInCalendarDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';
import Invoice from './Invoice';
import View from './View';

interface ListProps {
  searchTerm: string;
  status: string;
}

const List = ({ searchTerm, status }: ListProps) => {
  const { userId } = useStore(
    useShallow((state) => ({
      userId: state.userId,
    }))
  );
  const { viewGuestData, isPending } = useGetGuestReservations();
  const [onView, setOnView] = useState(false);
  const [onInvoice, setOnInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState('');
  const [viewId, setViewId] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reservationData, setReservationData] = useState<any[]>();

  useEffect(() => {
    viewGuestData(userId as string, {
      onSuccess: (data) => {
        setReservationData(data);
      },
      onError: () => console.error('Error fetching guest reservations'),
    });
  }, [userId, viewGuestData, onView]);

  // data filtering
  const reservationStatus = reservationData?.filter(
    (reservation: { bookTracking: string; bookStatus: string }) => {
      if (status === 'active') {
        return (
          (reservation.bookTracking !== 'checked out' && reservation.bookStatus === 'approved') ||
          (reservation.bookTracking !== 'checkout' && reservation.bookStatus === 'request')
        );
      } else if (status === 'past') {
        return reservation.bookTracking === 'checked out';
      } else if (status === 'pending') {
        return reservation.bookStatus === 'pending';
      } else {
        return reservation.bookStatus === 'cancelled';
      }
    }
  );

  // search filtering
  const reservationFiltered = searchTerm
    ? reservationStatus?.filter((value) => value.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    : reservationStatus;

  //pagination
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = reservationFiltered?.slice(firstIndex, lastIndex);
  const totalPages = reservationFiltered ? reservationFiltered.length : 0;
  const numPage = Math.ceil(totalPages / recordsPerPage);
  return (
    <div>
      {isPending && (
        <div className="w-full h-full flex flex-row gap-2 text-center justify-center">
          <p>
            <Loading size={30} />
          </p>
        </div>
      )}
      <Table>
        <TableCaption>A list of your {status} reservations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Book #</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Room Name</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead>Check (In - Out)</TableHead>
            <TableHead># of Days</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Extras</TableHead>
            <TableHead>Book Date</TableHead>
            <TableHead>Tracking</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservationData &&
            !isPending &&
            records?.map((list, i) => (
              <TableRow key={i} className="capitalize">
                <TableCell className="font-medium">#{list.id.substring(0, 8).toUpperCase()}</TableCell>
                <TableCell>{list.userName}</TableCell>
                <TableCell>{list.tblRooms.roomName}</TableCell>
                <TableCell>{list.tblRooms.roomNumber}</TableCell>
                <TableCell>
                  {list.checkIn} - {list.checkOut}
                </TableCell>
                <TableCell>
                  {differenceInCalendarDays(new Date(list.checkOut), new Date(list.checkIn))}
                </TableCell>
                <TableCell>
                  {CurrencyFormatter(
                    differenceInCalendarDays(new Date(list.checkOut), new Date(list.checkIn)) *
                      list.tblRooms.roomPrice
                  )}
                </TableCell>
                <TableCell>{extrasReducer(list.amenities)}</TableCell>
                <TableCell>{TimestampTzFormatter(list.created_at)}</TableCell>
                <TableCell>{list.bookTracking}</TableCell>
                <TableCell>{list.bookStatus}</TableCell>
                <TableCell>
                  <DropdownMenu key={i}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                        <>
                          <span className="sr-only">Open menu</span>
                          <Tiptools
                            title="View more options"
                            titleClassName="text-sm text-blue-950 dark:text-slate-50"
                          >
                            <FiMoreHorizontal className="size-6" />
                          </Tiptools>
                        </>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="cursor-default">Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setOnInvoice((prev) => !prev);
                          setInvoiceId(list.id);
                        }}
                        disabled={!list.bookTracking}
                      >
                        View Invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setOnView((prev) => !prev);
                          setViewId(list.id);
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
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
      {onInvoice && <Invoice setOnOpen={setOnInvoice} onOpen={onInvoice} id={invoiceId} />}
      {onView && <View setOnOpen={setOnView} onOpen={onView} id={viewId} />}
    </div>
  );
};
export default List;
