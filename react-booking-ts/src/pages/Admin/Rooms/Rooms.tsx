import Add from '@/components/Admin/Rooms/Add';
import Loading from '@/components/Spinner/Loading';
import PaginationButtons from '@/components/UiHooks/PaginationButtons';
import SearchTerm from '@/components/UiHooks/Search';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useViewRooms } from '@/hooks/use/useRooms';
import Pagination from '@/hooks/utils/Pagination';
import { useState } from 'react';
import RoomCards from './Cards/RoomCards';

const Rooms = () => {
  const { roomData, isPending } = useViewRooms();

  const [searchTerm, setSearchTerm] = useState('');

  //room list
  const roomList = searchTerm
    ? roomData?.filter((room) => room.roomName.toLowerCase().includes(searchTerm))
    : roomData;

  //pagination
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = roomList?.slice(firstIndex, lastIndex);
  const totalPages = roomData ? roomData.length : 0;
  const numPage = Math.ceil(totalPages / recordsPerPage);

  return (
    <div className="flex flex-col py-8 px-4 content-center-safe gap-4">
      <div className="flex flex-row flex-wrap gap-2 items-center border-b-4 pb-4">
        <div className="grow">
          <Tiptools title="Add Room" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Add />
          </Tiptools>
        </div>
        <SearchTerm setSearchTerm={setSearchTerm} placeholder={'Search room name...'} />
      </div>
      <div className="flex flex-wrap flex-row gap-4">
        {isPending && (
          <div className="w-full h-full flex text-center justify-center">
            <p>
              <Loading size={30} /> Loading Rooms...
            </p>
          </div>
        )}
        {roomList?.length === 0 && !isPending && (
          <div className="w-full h-full flex text-center justify-center">
            <p>No rooms found.</p>
          </div>
        )}
        {roomList &&
          roomList?.length > 0 &&
          !isPending &&
          records?.map((room, i) => (
            <RoomCards
              key={i}
              roomId={room.id}
              roomName={room.roomName}
              roomNumber={room.roomNumber}
              roomType={room.roomType}
              roomImg={room.roomImg}
              roomPrice={room.roomPrice}
              roomBed={room.roomBed}
              roomTb={room.roomTb}
              roomDesc={room.roomDesc}
              roomStatus={room.roomStatus}
            />
          ))}
      </div>
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
export default Rooms;
