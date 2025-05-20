import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { RoomUpdateProps } from '@/hooks/models/Rooms';
import { useUpdateRoomInformation } from '@/hooks/use/useRooms';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';

import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const updateRoomSchema = z.object({
  id: z.string().min(1, { message: 'Room Id is required' }),
  roomName: z.string().min(1, { message: 'Room Name is required' }),
  roomNumber: z.coerce.number().min(1, { message: 'Room Number is required' }),
  roomType: z
    .string({
      required_error: 'Room Type is required',
    })
    .min(1, 'Dish Type is required')
    .nonempty({ message: 'Room Type is required' }),
  roomPrice: z.coerce.number().min(1, { message: 'Room Price is required' }),
  roomBed: z.coerce.number().min(1, { message: 'Bed Count is required' }),
  roomTb: z.coerce.number().min(1, { message: 'Bathroom Count is required' }).optional(),
  roomDesc: z.string().min(1, { message: 'Room Description is required' }),
  roomStatus: z.string().min(1, { message: 'Room Status is required' }),
});

const roomTypes = [
  {
    label: 'Standard',
    value: 'standard',
  },
  {
    label: 'Deluxe',
    value: 'deluxe',
  },
  {
    label: 'Suite',
    value: 'suite',
  },
  {
    label: 'Luxury',
    value: 'luxury',
  },
];

interface updateProps {
  roomData: {
    id: string;
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

const Update = ({ roomData }: updateProps) => {
  const { editRoom, isUpdating } = useUpdateRoomInformation();
  const initialValues = {
    id: roomData.id,
    roomName: roomData.roomName,
    roomNumber: Number(roomData.roomNumber),
    roomType: roomData.roomType,
    roomPrice: Number(roomData.roomPrice),
    roomBed: Number(roomData.roomBed), //roomData.roomBed,
    roomTb: Number(roomData.roomTb), //roomData.roomTb,
    roomDesc: roomData.roomDesc,
    roomStatus: roomData.roomStatus,
  };
  const { userActionLogs } = useUserLogs();
  const form = useForm<z.infer<typeof updateRoomSchema>>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });
  const [onOpen, setOnOpen] = useState(false);
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

  const handleSumbit = (values: RoomUpdateProps) => {
    editRoom(values, {
      onSuccess: () => {
        userActionLogs(
          {
            action: `Updated Room ${values.roomName} - ${values.roomNumber}`,
            ...userLogData,
          },
          {
            onSuccess: () => {
              form.reset();
              setOnOpen(false);
            },
          }
        );
      },
    });
  };
  return (
    <div className={`${userType === 'staff' ? 'hidden' : ''}`}>
      <Tiptools title="Update Room" titleClassName="text-slate-950 dark:text-slate-50">
        <FaRegEdit className="size-6" onClick={() => setOnOpen((prev) => !prev)} />
      </Tiptools>
      <Modal header={'Update Room Information'} onOpen={onOpen} setOnOpen={setOnOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSumbit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => {
                return (
                  <FormItem className="hidden">
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Room Name" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Room Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-row flex-wrap gap-2">
              <div className="flex flex-col flex-wrap grow">
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Room Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Room Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col flex-wrap">
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            name={field.name}
                            onValueChange={field.onChange}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pick a type" onBlur={field.onBlur} ref={field.ref} />
                            </SelectTrigger>
                            <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                              <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                {roomTypes.map((item) => (
                                  <SelectItem
                                    className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 flex-wrap">
              <div className="flex flex-col flex-wrap grow">
                <FormField
                  control={form.control}
                  name="roomBed"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Bed/s</FormLabel>
                        <FormControl>
                          <Input placeholder="Bed/s" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col flex-wrap">
                <FormField
                  control={form.control}
                  name="roomTb"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Bathroom/s</FormLabel>
                        <FormControl>
                          <Input placeholder="Bathroom/s" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-2">
              <div className="flex flex-col flex-wrap grow">
                <FormField
                  control={form.control}
                  name="roomPrice"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Room Price</FormLabel>
                        <FormControl>
                          <Input placeholder="Room Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col flex-wrap">
                <FormField
                  control={form.control}
                  name="roomStatus"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            name={field.name}
                            onValueChange={field.onChange}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Pick a Status"
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </SelectTrigger>
                            <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem
                                  className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                  value="available"
                                >
                                  Available
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                  value="unavailable"
                                >
                                  Unavailable
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="roomDesc"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex justify-end w-full">
              <Button
                className="bg-slate-200 text-blue-950 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 w-25"
                disabled={isUpdating}
              >
                <span>{isUpdating ? <Loading size={20} /> : 'Update'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};
export default Update;
