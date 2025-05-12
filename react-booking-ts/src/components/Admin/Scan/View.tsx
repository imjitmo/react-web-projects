import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { CurrencyFormatter, TimestampTzFormatter } from '@/components/UiHooks/Formatter';
import { useUpdateBookingStatus, useUpdateReservationStatus } from '@/hooks/use/useReservation';
import { useUpdateRoomStatus } from '@/hooks/use/useRooms';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { differenceInDays } from 'date-fns';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

interface GuestDataProps {
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
  created_at: Date;
  scanResult: string;
  setScanResult: React.Dispatch<React.SetStateAction<string>>;
  setOnView: React.Dispatch<React.SetStateAction<boolean>>;
}
const View = (guestData: GuestDataProps) => {
  const navigate = useNavigate();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const totalExtrasCharges = guestData.amenities.reduce((total, amenity) => total + amenity.price, 0);
  const totalStayInCharges =
    guestData.tblRooms.roomPrice *
    differenceInDays(new Date(guestData.checkOut), new Date(guestData.checkIn));
  const totalPrice = totalExtrasCharges + totalStayInCharges;

  const { editReservationStatus, isUpdating } = useUpdateReservationStatus();
  const { editBookingStatus, isLoading } = useUpdateBookingStatus();
  const { editRoomStatus } = useUpdateRoomStatus();
  const { userActionLogs } = useUserLogs();
  const [onAsk, setOnAsk] = useState(false);
  const [onType, setOnType] = useState('');
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

  const handleTypeAndAsk = (type: string) => {
    setOnType(type);
    setOnAsk(true);
  };

  const handleClickUpdate = async () => {
    const trackingUpdate = !guestData.bookTracking ? 'checked in' : 'checked out';
    editReservationStatus(
      { id: guestData.id, bookTracking: trackingUpdate },
      {
        onSuccess: () => {
          userActionLogs({
            action: `Update Book#${guestData.id} to ${trackingUpdate}`,
            ...userLogData,
          });
          if (trackingUpdate === 'checked out') {
            editRoomStatus(
              { id: guestData.roomId, status: 'preparing' },
              {
                onSuccess: () => {
                  guestData.setScanResult('');
                  guestData.setOnView(false);
                  navigate('/reservations');
                },
              }
            );
          }
        },
      }
    );
  };

  const handleClickStatusApproved = () => {
    editBookingStatus(
      { id: guestData.id, bookStatus: 'approved' },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Update Book#${guestData.id} to 'approved'`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                editRoomStatus(
                  { id: guestData.roomId, status: 'reserved' },
                  {
                    onSuccess: () => {
                      guestData.setScanResult('');
                      guestData.setOnView(false);
                      navigate('/reservations');
                    },
                  }
                );
              },
            }
          );
        },
      }
    );
  };

  const handleClickStatusCancelled = () => {
    editBookingStatus(
      { id: guestData.id, bookStatus: 'cancelled' },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Update Book#${guestData.id} to cancelled`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                guestData.setScanResult('');
                guestData.setOnView(false);
                navigate('/reservations');
              },
            }
          );
        },
      }
    );
  };

  const handleTransaction = async () => {
    if (onType === 'tracking') {
      await handleClickUpdate();
      setOnType('');
      setOnAsk(false);
      return;
    } else if (onType === 'approved') {
      await handleClickStatusApproved();
      setOnType('');
      setOnAsk(false);
      return;
    } else if (onType === 'cancelled') {
      await handleClickStatusCancelled();
      setOnType('');
      setOnAsk(false);
      return;
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-8">
        <div className="flex text-center items-center justify-center">
          <h1 className="text-2xl font-bold">Reservation Details</h1>
        </div>
        {/* Guest Details */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col grow">
            <h1 className="text-2xl font-bold">Guest Details</h1>
            <h1 className="text-lg font-bold">
              Reservation ID:{' '}
              <span className="font-normal">#{guestData?.id.toString().substring(0, 6).toUpperCase()}</span>
            </h1>
            <h1 className="text-lg font-bold">
              Guest Name: <span className="font-normal">{guestData?.userName}</span>
            </h1>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div ref={qrCodeRef}>
              <QRCodeCanvas value={guestData.id} size={120} className="rounded border-10 border-slate-50" />
            </div>
          </div>
        </div>

        {/* Room and Booking Details */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col grow">
            <h1 className="text-2xl font-bold">Room Details</h1>
            <h1 className="text-lg font-bold">
              Room Name: <span className="font-normal">{guestData.tblRooms.roomName}</span>
            </h1>
            <h1 className="text-lg font-bold">
              Room Number: <span className="font-normal">{guestData.tblRooms.roomNumber}</span>
            </h1>

            <h1 className="text-lg font-bold">
              Room Price:{' '}
              <span className="font-normal">{CurrencyFormatter(guestData.tblRooms.roomPrice)}</span>
            </h1>
          </div>

          <div className="flex flex-col flex-1">
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <h1 className="text-lg font-bold">
              Check In <span className="font-normal">{guestData.checkIn}</span>
            </h1>
            <h1 className="text-lg font-bold">
              Check Out <span className="font-normal">{guestData.checkOut}</span>
            </h1>

            <h1 className="text-lg font-bold">
              Days of Stay:{' '}
              <span className="font-normal">
                {differenceInDays(new Date(guestData.checkOut), new Date(guestData.checkIn))} day/s
              </span>
            </h1>
            <h1 className="text-lg font-bold">
              Reservation Time:{' '}
              <span className="font-normal">{TimestampTzFormatter(guestData.created_at)}</span>
            </h1>
            <h1 className="text-lg font-bold">
              Reservation Status: <span className="font-normal capitalize">{guestData.bookStatus}</span>
            </h1>
            <h1 className="text-lg font-bold">
              Stay In Price: <span className="font-normal">{CurrencyFormatter(totalStayInCharges)}</span>
            </h1>
          </div>
        </div>

        {/* Extras and Charges */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col grow">
            <h1 className="text-2xl font-bold">Extra Charges</h1>
            {guestData.amenities.map((item) => (
              <h1 className="text-lg font-bold">
                {item.service}: <span className="font-normal">{CurrencyFormatter(item.price)}</span>
              </h1>
            ))}
            <h1 className="text-lg font-bold">
              Total Extras Charges: {CurrencyFormatter(totalExtrasCharges)}
            </h1>
          </div>
          <div className="flex flex-col flex-1">
            <h1 className="text-2xl font-bold">Total Charges: {CurrencyFormatter(totalPrice)}</h1>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-4 justify-end items-end">
            {!onAsk && guestData.bookStatus === 'approved' && guestData.bookTracking !== 'checked out' && (
              <Button
                className={`${!guestData.bookTracking ? 'bg-green-600' : 'bg-red-600'} text-slate-50 ${
                  !guestData.bookTracking
                    ? 'hover:bg-yellow-400 hover:text-blue-950'
                    : 'hover:bg-blue-950 hover:text-slate-50'
                } rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
                onClick={() => handleTypeAndAsk('tracking')}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loading size={20} />
                ) : !guestData.bookTracking && guestData.bookStatus === 'approved' ? (
                  <span>Check In</span>
                ) : (
                  <span>Check Out</span>
                )}
              </Button>
            )}
            {!onAsk && guestData.bookStatus === 'pending' && (
              <div className="flex flex-row gap-2">
                <Button
                  className="w-[150px] bg-red-600"
                  onClick={() => handleTypeAndAsk('cancel')}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading size={20} /> : 'Cancel'}
                </Button>
                <Button
                  className="w-[300px] bg-green-600"
                  onClick={() => handleTypeAndAsk('approve')}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading size={20} /> : 'Approve'}
                </Button>
              </div>
            )}
            {onAsk && (
              <div className="flex flex-row gap-2 items-center">
                <span className="italic">Are you sure?</span>
                <Button className="w-[150px] bg-red-600" onClick={handleTransaction}>
                  Yes
                </Button>
                <Button className="w-[300px] bg-green-600" onClick={() => setOnAsk(false)}>
                  No
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default View;
