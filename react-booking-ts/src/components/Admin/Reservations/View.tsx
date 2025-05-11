import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import { useUpdateBookingStatus, useUpdateReservationStatus } from '@/hooks/use/useReservation';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { differenceInDays } from 'date-fns';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface ViewReservationProps {
  id: string;
  userName: string;
  roomId: string;
  bookStatus: string;
  checkIn: string;
  checkOut: string;
  bookTracking: string;
  amenities: { service: string; price: number }[];
  tblRooms: {
    roomName: string;
    roomNumber: string;
    roomPrice: number;
  };
}

const View = (list: ViewReservationProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const qrCodeRef = useRef(null);
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOnOpen((prev) => !prev);
  };
  const { editReservationStatus, isUpdating } = useUpdateReservationStatus();
  const { editBookingStatus, isLoading } = useUpdateBookingStatus();
  const { userActionLogs } = useUserLogs();
  const { userId, email, displayName, userType } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
      displayName: state.displayName,
      userType: state.userType,
    }))
  );
  const userLogData = {
    userId: userId ? userId : '',
    userEmail: email ? email : '',
    userName: displayName ? displayName : '',
    userType: userType ? userType : '',
  };
  const totalExtras = list.amenities.reduce((a, b) => a + b.price, 0);
  const totalDaysCost =
    differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) * list.tblRooms.roomPrice;

  const handleClickUpdate = () => {
    const trackingUpdate = list.bookTracking === null ? 'checked in' : 'checked out';
    editReservationStatus(
      { id: list.id, bookTracking: trackingUpdate },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Update Book#${list.id} to ${trackingUpdate}`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                setOnOpen(false);
              },
            }
          );
        },
      }
    );
  };

  const handleClickStatusApproved = () => {
    editBookingStatus(
      { id: list.id, bookStatus: 'approved' },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Update Book#${list.id} to 'approved'`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                setOnOpen(false);
              },
            }
          );
        },
      }
    );
  };

  const handleClickStatusCancelled = () => {
    editBookingStatus(
      { id: list.id, bookStatus: 'cancelled' },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Update Book#${list.id} to cancelled`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                setOnOpen(false);
              },
            }
          );
        },
      }
    );
  };
  return (
    <div key={list.id}>
      <span onClick={handleOpenModal}>View Booking details</span>
      <Modal key={list.id} onOpen={onOpen} setOnOpen={setOnOpen} className="min-w-[800px] z-[9999]">
        <div key={list.id} className="flex flex-col gap-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reservation Details</h1>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col grow">
              <h2 className="text-xl font-bold">Guest Details</h2>
              <h2>Reservation ID: #{list.id.substring(0, 8).toUpperCase()}</h2>
              <h2>Guest Name: {list.userName}</h2>
            </div>
            <div ref={qrCodeRef}>
              <QRCodeCanvas value={list.id} size={120} className="rounded border-10 border-slate-50" />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold">Room Details</h2>
              <h2>Room Name: {list.tblRooms.roomName}</h2>
              <h2>Room Number: {list.tblRooms.roomNumber}</h2>
              <h2>Room Price: {CurrencyFormatter(list.tblRooms.roomPrice)}</h2>
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <h2>Check In: {list.checkIn}</h2>
              <h2>Check Out: {list.checkOut}</h2>
              <h2 className="capitalize">Reservation Status: {list.bookStatus}</h2>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold">Extras</h2>
              {list.amenities.map((amenity) => (
                <h2>
                  {amenity.service}: {CurrencyFormatter(amenity.price)}
                </h2>
              ))}
              Total Extra Charges:{' '}
              {CurrencyFormatter(list.amenities.reduce((acc, curr) => acc + curr.price, 0))}
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold">Total Charges</h2>
              <h1 className="text-2xl font-bold">{CurrencyFormatter(totalDaysCost + totalExtras)}</h1>
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-end items-end">
            {list.bookStatus === 'approved' && list.bookTracking !== 'checked out' && (
              <Button
                className={`${list.bookTracking === null ? 'bg-green-600' : 'bg-red-600'} text-slate-50 ${
                  list.bookTracking === null
                    ? 'hover:bg-yellow-400 hover:text-blue-950'
                    : 'hover:bg-blue-950 hover:text-slate-50'
                } rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
                onClick={handleClickUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loading size={20} />
                ) : list.bookTracking === null && list.bookStatus === 'approved' ? (
                  <span>Check In</span>
                ) : (
                  <span>Check Out</span>
                )}
              </Button>
            )}
            {list.bookStatus === 'pending' && (
              <div className="flex flex-row gap-2">
                <Button
                  className="w-[150px] bg-red-600"
                  onClick={handleClickStatusCancelled}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading size={20} /> : 'Cancel'}
                </Button>
                <Button
                  className="w-[300px] bg-green-600"
                  onClick={handleClickStatusApproved}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading size={20} /> : 'Approve'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default View;
