import DashCards from './Cards/DashCards';

const Dashboard = () => {
  return (
    <div className="flex flex-wrap p-8 items-center content-center-safe justify-between gap-4">
      <DashCards title="Reservations" description="Total Reservations" total={1000} />
      <DashCards title="Reservations" description="Total Reservations" total={1000} />
      <DashCards title="Reservations" description="Total Reservations" total={1000} />
      <DashCards title="Reservations" description="Total Reservations" total={1000} />
    </div>
  );
};
export default Dashboard;
