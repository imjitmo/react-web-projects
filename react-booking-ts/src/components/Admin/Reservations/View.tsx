/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '@/components/Spinner/Loader';
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import {
  useUpdateBookingStatus,
  useUpdateReservationStatus,
  useViewCustomerReservation,
} from '@/hooks/use/useReservation';
import { useUpdateRoomStatus } from '@/hooks/use/useRooms';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { differenceInDays } from 'date-fns';
import { QRCodeCanvas } from 'qrcode.react';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useShallow } from 'zustand/react/shallow';

interface ViewReservationProps {
  id: string;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const View = (props: ViewReservationProps) => {
  // const [onOpen, setOnOpen] = useState(false);
  const qrCodeRef = useRef(null);
  // const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setOnOpen((prev) => !prev);
  // };
  const { editReservationStatus, isUpdating } = useUpdateReservationStatus();
  const { editBookingStatus, isLoading } = useUpdateBookingStatus();
  const { editRoomStatus } = useUpdateRoomStatus();
  const { userActionLogs } = useUserLogs();
  const [onAsk, setOnAsk] = useState(false);
  const [onType, setOnType] = useState('');
  const [onPaymentType, setOnPaymentType] = useState('');
  const [list, setList] = useState<any>(null);
  const { viewReservation, isViewing } = useViewCustomerReservation();
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

  useEffect(() => {
    viewReservation(
      { id: props.id },
      {
        onSuccess: (data) => {
          setList(data);
        },
      }
    );
  }, [props.id, viewReservation]);

  const totalExtras =
    list && !isViewing && list.amenities.reduce((a: any, b: { price: any }) => a + b.price, 0);
  const totalDaysCost =
    list &&
    !isViewing &&
    differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) * list.tblRooms.roomPrice;

  const handleTypeAndAsk = (type: string) => {
    console.log(type);
    setOnType(type);
    setOnAsk(true);
  };

  const handleClickUpdate = async () => {
    const trackingUpdate = !list.bookTracking ? 'checked in' : 'checked out';
    editReservationStatus(
      {
        id: list.id,
        bookTracking: trackingUpdate,
        paymentType: trackingUpdate === 'checked out' ? onPaymentType : '',
      },
      {
        onSuccess: () => {
          userActionLogs({
            action: `Update Book#${list.id} to ${trackingUpdate}`,
            ...userLogData,
          });
          if (trackingUpdate === 'checked out') {
            editRoomStatus(
              { id: list.roomId, status: 'preparing' },
              {
                onSuccess: () => {
                  props.setOnOpen(false);
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
                editRoomStatus(
                  { id: list.roomId, status: 'reserved' },
                  {
                    onSuccess: () => {
                      props.setOnOpen(false);
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
                editRoomStatus(
                  { id: list.roomId, status: 'preparing' },
                  {
                    onSuccess: () => {
                      props.setOnOpen(false);
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

  const handleTransaction = async () => {
    if (onType === 'tracking') {
      await handleClickUpdate();
      setOnType('');
      setOnAsk(false);
      props.setOnOpen(false);
      return;
    } else if (onType === 'approve') {
      await handleClickStatusApproved();
      setOnType('');
      setOnAsk(false);
      props.setOnOpen(false);
      return;
    } else if (onType === 'cancel') {
      await handleClickStatusCancelled();
      setOnType('');
      setOnAsk(false);
      props.setOnOpen(false);
      return;
    }
  };
  return (
    <div>
      {/* <span onClick={handleOpenModal}>View Booking details</span> */}
      <Modal onOpen={props.onOpen} setOnOpen={props.setOnOpen} className="min-w-[800px]">
        {isViewing && <Loader />}
        {!isViewing && list && (
          <div className="flex flex-col gap-4">
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
                <h2>Number of Days: {differenceInDays(new Date(list.checkOut), new Date(list.checkIn))}</h2>
                <h2 className="capitalize">Reservation Status: {list.bookStatus}</h2>
                <h2 className="capitalize">
                  Total Price on Stay:{' '}
                  {CurrencyFormatter(
                    differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) *
                      list.tblRooms.roomPrice
                  )}
                </h2>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-bold">Extras</h2>
                {list.amenities.map(
                  (amenity: {
                    service:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<unknown, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<unknown, string | JSXElementConstructor<any>>
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    price: number;
                  }) => (
                    <h2>
                      {amenity.service}: {CurrencyFormatter(amenity.price)}
                    </h2>
                  )
                )}
                Total Extra Charges:{' '}
                {CurrencyFormatter(
                  list.amenities.reduce((acc: any, curr: { price: any }) => acc + curr.price, 0)
                )}
              </div>
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-bold">Total Charges</h2>
                <h1 className="text-2xl font-bold">{CurrencyFormatter(totalDaysCost + totalExtras)}</h1>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-end items-end">
              {!onAsk && list.bookStatus === 'approved' && list.bookTracking === 'checked in' && (
                <Select onValueChange={setOnPaymentType} required>
                  <SelectTrigger className="w-[180px]" name="paymentType">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Payment Method</SelectLabel>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="e-wallet">E-Wallet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              {!onAsk && list.bookStatus === 'approved' && list.bookTracking !== 'checked out' && (
                <Button
                  className={`${!list.bookTracking ? 'bg-green-600' : 'bg-red-600'} text-slate-50 ${
                    !list.bookTracking
                      ? 'hover:bg-yellow-400 hover:text-blue-950'
                      : 'hover:bg-blue-950 hover:text-slate-50'
                  } rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
                  onClick={() => handleTypeAndAsk('tracking')}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loading size={20} />
                  ) : !list.bookTracking && list.bookStatus === 'approved' ? (
                    <span>Check In</span>
                  ) : (
                    <span>Check Out</span>
                  )}
                </Button>
              )}
              {!onAsk && list.bookStatus !== 'approved' && list.bookStatus !== 'cancelled' && (
                <div className="flex flex-row gap-2">
                  <Button
                    className="w-[150px] bg-red-600"
                    onClick={() => handleTypeAndAsk('cancel')}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading size={20} /> : 'Cancel'}
                  </Button>
                  {list.bookStatus !== 'request' && list.bookStatus !== 'cancelled' && (
                    <Button
                      className="w-[300px] bg-green-600"
                      onClick={() => handleTypeAndAsk('approve')}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loading size={20} /> : 'Approve'}
                    </Button>
                  )}
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
        )}
      </Modal>
    </div>
  );
};
export default View;
