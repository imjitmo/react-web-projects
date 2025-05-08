import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { LucideToilet } from 'lucide-react';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';

interface viewProps {
  roomData: {
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

const View = ({ roomData }: viewProps) => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <Tiptools title="View Room" titleClassName="text-slate-950 dark:text-slate-50">
        <FaEye className="size-6" onClick={() => setOnOpen((prev) => !prev)} />
      </Tiptools>
      <Modal
        header={'Room Information'}
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        className="max-w-6xl min-w-5xl"
      >
        <div className="flex">
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
                    roomData.roomStatus === 'available' && 'text-green-500'
                  } ${roomData.roomStatus === 'unavailable' && 'text-red-500'} ${
                    roomData.roomStatus === 'reserved' && 'text-yellow-500'
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
        </div>
      </Modal>
    </>
  );
};
export default View;
