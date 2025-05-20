import Image from '@/components/Admin/Rooms/Image';
import Reserve from '@/components/Admin/Rooms/Reserve';
import Status from '@/components/Admin/Rooms/Status';
import Update from '@/components/Admin/Rooms/Update';
import View from '@/components/Admin/Rooms/View';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import { useStore } from '@/store/store';
import { LucideToilet } from 'lucide-react';
import { FaRegMoon } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { useShallow } from 'zustand/react/shallow';

interface RoomCardsProps {
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
}
const RoomCards = ({
  roomId,
  roomName,
  roomNumber,
  roomType,
  roomImg,
  roomPrice,
  roomBed,
  roomTb,
  roomDesc,
  roomStatus,
}: RoomCardsProps) => {
  const roomData = {
    roomId: roomId,
    roomName: roomName,
    roomNumber: roomNumber,
    roomType: roomType,
    roomImg: roomImg,
    roomPrice: roomPrice,
    roomBed: roomBed,
    roomTb: roomTb,
    roomDesc: roomDesc,
    roomStatus: roomStatus,
  };

  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  return (
    <Card className="min-w-[250px] max-w-[250px] max-h-[510px] capitalize bg-slate-100 dark:bg-slate-900">
      <CardHeader>
        <CardTitle>{roomName}</CardTitle>
        <CardDescription className="flex flex-col">
          <span>Room {roomNumber}</span>
          <span className="font-bold italic text-yellow-500">{roomType}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 grow">
        <div className="flex items-center justify-center w-full">
          <Image roomData={{ id: roomId, roomImg: roomImg, roomName: roomName, roomNumber: roomNumber }} />
        </div>
        <h1 className="text-md font-bold flex flex-row items-center content-center-safe gap-1 cursor-default">
          {CurrencyFormatter(roomPrice)}
          <span className="text-sm font-normal lowercase">*</span>
          <FaRegMoon className="size-4" />
        </h1>
        <div className="flex flex-row flex-wrap gap-2">
          <div className="flex flex-row gap-2">
            <span className="font-bold">{roomBed}</span> <IoBedOutline className="size-6" />
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">{roomTb}</span>
            <LucideToilet />
          </div>
        </div>
        <p className="text-sm line-clamp-3">{roomDesc}</p>
      </CardContent>
      <CardFooter className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-row flex-wrap gap-2 grow">
          <span className=" text-blue-950 dark:text-slate-50 cursor-pointer">
            <Reserve roomData={roomData} />
          </span>
          <span className="text-blue-950 dark:text-slate-50 cursor-pointer">
            <View roomData={roomData} />
          </span>
          <span
            className={`text-blue-950 dark:text-slate-50 cursor-pointer ${
              userType === 'staff' ? 'hidden' : ''
            }`}
          >
            <Update roomData={{ id: roomId, ...roomData }} />
          </span>
          <span className="text-blue-950 dark:text-slate-50 cursor-pointer">
            <Status roomId={roomId} roomStatus={roomStatus} roomNumber={roomNumber} roomName={roomName} />
          </span>
        </div>
        <span
          className={`text-sm italic ${roomStatus === 'available' && 'text-green-500'} ${
            roomStatus === 'unavailable' && 'text-red-500'
          } ${roomStatus === 'reserved' && 'text-yellow-500'}`}
        >
          {roomStatus}
        </span>
      </CardFooter>
    </Card>
  );
};
export default RoomCards;
