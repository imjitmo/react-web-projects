import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/UiHooks/DateRangePicker';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { Reservation } from '@/hooks/models/Reservation';
import { useCreateReservation } from '@/hooks/use/useReservation';
import { useUpdateRoomStatus } from '@/hooks/use/useRooms';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInCalendarDays } from 'date-fns';
import { LucideBookmarkPlus, LucideToilet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { IoBedOutline } from 'react-icons/io5';

import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';

interface reserveProps {
  roomData: {
    roomId: string;
    roomName: string;
    roomNumber: string;
    roomType: string;
    roomImg: string;
    roomPrice: number;
    roomBed: number;
    roomTb: number;
    roomDesc: string;
    roomStatus: string;
  };
}

const addReservationSchema = z.object({
  userName: z
    .string({
      required_error: 'Guest Name is required',
    })
    .min(1, 'Guest Name is required'),
});

const initialValues = {
  userName: '',
};

const Reserve = ({ roomData }: reserveProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addReservationSchema>>({
    resolver: zodResolver(addReservationSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });
  const { addNewReservation, isCreating } = useCreateReservation();
  const { editRoomStatus } = useUpdateRoomStatus();
  const { userActionLogs } = useUserLogs();
  const [date, setDate] = useState<DateRange | undefined>();
  const [aircon, setAircon] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [onDateError, setOnDateError] = useState(false);
  const [totalAmenities, setTotalAmenities] = useState(0);
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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

  const handleSubmit = async (values: z.infer<typeof addReservationSchema>) => {
    if (!date?.to || !date?.from) return setOnDateError(true);
    const data: Reservation = {
      ...values,
      amenities: [
        { service: aircon ? 'Aircon' : 'No Aircon', price: aircon ? 200 : 0 },
        { service: laundry ? 'Laundry' : 'No Laundry', price: laundry ? 100 : 0 },
        { service: breakfast ? 'Breakfast' : 'No Breakfast', price: breakfast ? 100 : 0 },
      ],
      checkIn: date?.from,
      checkOut: date?.to,
      roomId: roomData.roomId,
      bookStatus: 'approved',
    };
    addNewReservation(data, {
      onSuccess: () => {
        editRoomStatus(
          { id: roomData.roomId, status: 'reserved' },
          {
            onSuccess: () => {
              userActionLogs(
                {
                  action: `Reserved Room ${roomData.roomName} - ${roomData.roomNumber} for ${values.userName}`,
                  ...userLogData,
                },
                {
                  onSuccess: () => {
                    form.reset();
                    setDate(undefined);
                    setAircon(false);
                    setLaundry(false);
                    setBreakfast(false);
                    setOpen(false);
                  },
                }
              );
            },
          }
        );
      },
    });
  };

  useEffect(() => {
    const dayCount = differenceInCalendarDays(date?.to as Date, date?.from as Date);
    const airconPrice = aircon ? 200 : 0;
    const laundryPrice = laundry ? 100 : 0;
    const breakfastPrice = breakfast ? 100 : 0;
    setTotalAmenities(airconPrice + laundryPrice + breakfastPrice);
    setDays(dayCount);
    if (date?.to && date?.from) {
      const totalPrice = days * roomData.roomPrice + totalAmenities;
      setOnDateError(false);
      setTotalPrice(totalPrice);
    }
  }, [days, date, aircon, laundry, breakfast, roomData.roomPrice, totalAmenities]);

  return (
    <div>
      <Tiptools title="Add Reservation" titleClassName="text-slate-950 dark:text-slate-50">
        <LucideBookmarkPlus className="size-6" onClick={() => setOpen((prev) => !prev)} />
      </Tiptools>
      <Modal
        header={`Create Reservation for Rm. ${roomData.roomNumber} - ${roomData.roomName}`}
        onOpen={open}
        setOnOpen={setOpen}
        className="min-w-5xl max-w-6xl max-h-screen"
      >
        <div className="flex flex-row grow gap-6">
          <img src={roomData.roomImg} alt="roomImg" className="size-80 rounded-2xl object-cover" />
          <div className="flex flex-col flex-wrap items-start justify-start gap-1">
            <h4 className="text-sm italic text-blue-700 dark:text-slate-300">Rm. {roomData.roomNumber}</h4>
            <h1 className="text-3xl font-bold">{roomData.roomName}</h1>
            <div className="flex flex-row items-center">
              <h1 className="text-3xl font-bold">{CurrencyFormatter(roomData.roomPrice)}</h1>
              <span className="text-sm">/night</span>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <span
                className={`text-xs capitalize ${
                  roomData.roomType === 'luxury'
                    ? 'text-yellow-500'
                    : roomData.roomType === 'standard'
                    ? 'text-green-500'
                    : 'text-red-500'
                } }`}
              >
                {roomData.roomType}
              </span>{' '}
              -{' '}
              <p
                className={`text-xs capitalize italic ${
                  roomData.roomStatus === 'available' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {roomData.roomStatus}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row items-center gap-1">
                <IoBedOutline className="size-6" />
                <p className="text-md font-bold">{roomData.roomBed}</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <LucideToilet className="size-6" />
                <p className="text-md font-bold">{roomData.roomTb}</p>
              </div>
            </div>
            <article className="break-all text-justify">
              <p className="text-sm">{roomData.roomDesc}</p>
            </article>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-row gap-8">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Guest Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Guest Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex flex-col flex-wrap gap-2">
                  <div className="flex flex-col flex-wrap">
                    <span className="text-sm">Reservation Range:</span>
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </div>
                  {onDateError && (
                    <span className="text-xs text-red-500 italic">Please select a booking date range</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h6 className="text-sm font-bold">Extras</h6>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <input
                      type="checkbox"
                      className="size-3 rounded"
                      name="aircon"
                      id="aircon"
                      onChange={() => setAircon((prev) => !prev)}
                      value={300}
                    />
                    <span className="text-sm">Air Conditioner ({CurrencyFormatter(300)})</span>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <input
                      type="checkbox"
                      className="size-3 rounded"
                      name="breakfast"
                      id="breakfast"
                      onChange={() => setBreakfast((prev) => !prev)}
                    />
                    <span className="text-sm">Breakfast ({CurrencyFormatter(200)})</span>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <input
                      type="checkbox"
                      className="size-3 rounded"
                      name="laundry"
                      id="laundry"
                      onChange={() => setLaundry((prev) => !prev)}
                    />
                    <span className="text-sm">Laundry ({CurrencyFormatter(50)})</span>
                  </div>
                </div>
                {totalPrice > 0 && (
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-md font-bold">Total Extras: </span>
                      <span className="text-md font-bold">{CurrencyFormatter(totalAmenities)}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-md font-bold">Days of Stay:</span>
                      <span className="text-md font-bold">{days}</span>
                      <span className="text-md font-bold">Total:</span>
                      <span className="text-md font-bold">{CurrencyFormatter(totalPrice)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end w-full">
              <Button
                className="bg-slate-200 text-blue-950 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 w-25"
                disabled={
                  isCreating || roomData.roomStatus === 'reserved' || roomData.roomStatus === 'unavailable'
                }
              >
                <span>{isCreating ? <Loading size={20} /> : 'Reserve'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};
export default Reserve;
