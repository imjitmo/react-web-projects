/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { DatePickerWithRange } from '@/components/UiHooks/DateRangePicker';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';

import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { Reservation } from '@/hooks/models/Reservation';
import { useCreateReservation } from '@/hooks/use/useReservation';
import { useViewSingleRoomInformation } from '@/hooks/use/useRooms';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInCalendarDays } from 'date-fns';

import { LucideToilet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';

import { IoBedOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';

interface reserveProps {
  roomId: string;
}

const reservationSchema = z.object({
  userName: z
    .string({
      required_error: 'Guest Name is required',
    })
    .min(1, 'Guest Name is required'),
  userId: z
    .string({
      required_error: 'User Id is required',
    })
    .min(1, 'User Id is required'),
});

const Reserve = (roomData: reserveProps) => {
  const navigate = useNavigate();
  const [onOpen, setOnOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const [room, setRoom] = useState<any>(null);
  const [aircon, setAircon] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [onDateError, setOnDateError] = useState(false);
  const [totalAmenities, setTotalAmenities] = useState(0);
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { addNewReservation, isCreating } = useCreateReservation();
  const { displayName, userId } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
      userId: state.userId,
    }))
  );

  const { viewSingleRoom, isViewing } = useViewSingleRoomInformation();

  const initialValues = {
    userId: userId ? userId : '',
    userName: displayName ? displayName : '',
  };
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });
  useEffect(() => {
    viewSingleRoom(roomData.roomId, {
      onSuccess: (data) => {
        setRoom(data);
      },
    });
  }, [viewSingleRoom, roomData.roomId]);

  useEffect(() => {
    const dayCount = differenceInCalendarDays(date?.to as Date, date?.from as Date);
    const airconPrice = aircon ? 200 : 0;
    const laundryPrice = laundry ? 100 : 0;
    const breakfastPrice = breakfast ? 100 : 0;
    setTotalAmenities(airconPrice + laundryPrice + breakfastPrice);
    setDays(dayCount);
    if (date?.to && date?.from) {
      const totalPrice = days * room.roomPrice + totalAmenities;
      setOnDateError(false);
      setTotalPrice(totalPrice);
    }
  }, [room?.roomPrice, aircon, laundry, breakfast, date, totalAmenities, days, totalPrice]);

  const handleSubmit = (values: z.infer<typeof reservationSchema>) => {
    if (!date?.to || !date?.from) return setOnDateError(true);
    const data: Reservation = {
      ...values,
      amenities: [
        { service: 'Aircon', price: aircon ? 200 : 0 },
        { service: 'Laundry', price: laundry ? 100 : 0 },
        { service: 'Breakfast', price: breakfast ? 100 : 0 },
      ],
      checkIn: date?.from,
      checkOut: date?.to,
      roomId: roomData.roomId,
      bookStatus: 'pending',
    };
    addNewReservation(data, {
      onSuccess: () => {
        form.reset();
        setDate(undefined);
        setAircon(false);
        setLaundry(false);
        setBreakfast(false);
        setOnOpen(false);
        navigate('/reservation');
      },
    });
  };
  // console.log(room.roomName);
  return (
    <div>
      <Tiptools title="Reserve a Room" titleClassName="text-slate-950 dark:text-slate-50">
        <Button onClick={() => setOnOpen((prev) => !prev)}>Reserve</Button>
      </Tiptools>
      <Modal
        header="Reserve a Room"
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        className="min-w-5xl max-w-6xl max-h-screen"
      >
        {isViewing && <Loading size={20} />}
        {!isViewing && room && (
          <>
            <div className="flex flex-row grow gap-6">
              <img
                src={room.roomImg}
                alt={room.roomName.substring(0, 4) + '-Img'}
                className="size-80 rounded-2xl object-cover"
              />
              <div className="flex flex-col flex-wrap items-start justify-start gap-1">
                <h4 className="text-sm italic text-blue-700 dark:text-slate-300">Rm. {room.roomNumber} </h4>
                <h1 className="text-3xl font-bold">{room.roomName}</h1>
                <div className="flex flex-row items-center">
                  <h1 className="text-3xl font-bold">{CurrencyFormatter(room.roomPrice)}</h1>
                  <span className="text-sm">/night</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <span
                    className={`text-xs capitalize ${
                      room.roomType === 'luxury'
                        ? 'text-yellow-500'
                        : room.roomType === 'standard'
                        ? 'text-green-500'
                        : 'text-red-500'
                    } }`}
                  >
                    {room.roomType}
                  </span>{' '}
                  -{' '}
                  <p
                    className={`text-xs capitalize italic ${
                      room.roomStatus === 'available' && 'text-green-500'
                    } ${room.roomStatus === 'unavailable' && 'text-red-500'} ${
                      room.roomStatus === 'reserved' && 'text-yellow-500'
                    }`}
                  >
                    {room.roomStatus}
                  </p>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row items-center gap-1">
                    <IoBedOutline className="size-6" />
                    <p className="text-md font-bold">{room.roomBed}</p>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <LucideToilet className="size-6" />
                    <p className="text-md font-bold">{room.roomTb}</p>
                  </div>
                </div>
                <article className="break-all text-justify">
                  <p className="text-sm">{room.roomDesc}</p>
                </article>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full hidden">
                        <FormLabel>User ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full hidden">
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col flex-wrap gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm">Reservation Range:</span>
                        <DatePickerWithRange date={date} setDate={setDate} />
                      </div>
                      {onDateError && (
                        <span className="text-xs text-red-500 italic">
                          Please select a booking date range
                        </span>
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
                          value={300}
                          onChange={() => setAircon((prev) => !prev)}
                        />
                        <span className="text-sm">Air Conditioner {CurrencyFormatter(200)}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <input
                          type="checkbox"
                          className="size-3 rounded"
                          name="breakfast"
                          id="breakfast"
                          onChange={() => setBreakfast((prev) => !prev)}
                        />
                        <span className="text-sm">Breakfast {CurrencyFormatter(100)}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <input
                          type="checkbox"
                          className="size-3 rounded"
                          name="laundry"
                          id="laundry"
                          onChange={() => setLaundry((prev) => !prev)}
                        />
                        <span className="text-sm">Laundry {CurrencyFormatter(100)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-md font-bold">Total Extras: </span>
                        <span className="text-md font-bold">{CurrencyFormatter(totalAmenities)}</span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-md font-bold">Days of Stay:</span>
                        <span className="text-md font-bold">{days ? days : ''}</span>
                        <span className="text-md font-bold">Total:</span>
                        <span className="text-md font-bold">{CurrencyFormatter(totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <Button
                    className="bg-slate-200 text-blue-950 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 w-25"
                    disabled={
                      isCreating || room.roomStatus === 'reserved' || room.roomStatus === 'unavailable'
                    }
                  >
                    <span>{isCreating ? <Loading size={20} /> : 'Reserve'}</span>
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};
export default Reserve;
