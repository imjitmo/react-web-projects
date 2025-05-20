import { useViewModules } from '@/hooks/use/useModules';
import { useGetReservation } from '@/hooks/use/useReservation';
import { useViewRooms } from '@/hooks/use/useRooms';
import { useGetAllGuest, useGetAllUsers } from '@/hooks/use/useUsers';
import DashCards from './Cards/DashCards';
import { DashChart } from './Charts/DashChart';
import { ReserveChart } from './Charts/ReserveChart';

const Dashboard = () => {
  const { moduleData, isPending: moduleLoading } = useViewModules();
  const { reservationData, isPending: reservationLoading } = useGetReservation();
  const { userData, isPending: userDataLoading } = useGetAllUsers();
  const { guestData, isPending: guestLoading } = useGetAllGuest();
  const { roomData, isPending: roomLoading } = useViewRooms();

  return (
    <div className="flex flex-wrap p-8 items-center content-center-safe justify-center  gap-4">
      <DashCards
        title="Student"
        description="Total Students"
        total={
          !userDataLoading
            ? (Number(userData?.filter((user) => user.userType === 'staff').length) as number)
            : 0
        }
      />
      <DashCards
        title="Guests"
        description="Total Guests"
        total={!guestLoading ? (Number(guestData?.length) as number) : 0}
      />
      <DashCards
        title="Available Rooms"
        description="Total Available Rooms"
        total={
          !roomLoading
            ? (Number(roomData?.filter((room) => room.roomStatus === 'available').length) as number)
            : 0
        }
      />
      <DashCards
        title="Reserved Rooms"
        description="Total Reserved Rooms"
        total={
          !roomLoading
            ? (Number(roomData?.filter((room) => room.roomStatus === 'reserved').length) as number)
            : 0
        }
      />
      <DashCards
        title="Unavailable Rooms"
        description="Total Unavailable Rooms"
        total={
          !roomLoading
            ? (Number(
                roomData?.filter((room) => room.roomStatus === 'reserved' && room.roomStatus === 'preparing')
                  .length
              ) as number)
            : 0
        }
      />
      <DashCards
        title="Modules"
        description="Total Modules"
        total={!moduleLoading ? (moduleData?.length as number) : 0}
      />
      <DashCards
        title="Reservations"
        description="Total Reservations"
        total={
          !reservationLoading
            ? (Number(
                reservationData?.filter(
                  (item) => item.bookStatus === 'pending' || item.bookStatus === 'approved'
                ).length
              ) as number)
            : 0
        }
      />

      <DashCards
        title="Cancelled Reservations"
        description="Total Cancelled Reservations"
        total={
          !reservationLoading
            ? (Number(reservationData?.filter((item) => item.bookStatus === 'cancelled').length) as number)
            : 0
        }
      />
      <div className="flex flex-row gap-2 w-full">
        {!roomLoading && roomData && <DashChart roomData={roomData} />}
        {!reservationLoading && reservationData && <ReserveChart reserveData={reservationData} />}
      </div>
    </div>
  );
};
export default Dashboard;
