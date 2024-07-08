import Chart from '@/components/Dashboards/Chart';
import Orders from '@/components/Dashboards/Orders';
import Recent from '@/components/Dashboards/Recent';
import Sales from '@/components/Dashboards/Sales';
import Seller from '@/components/Dashboards/Seller';
import { useGetOrders } from '@/hooks/use/useOrders';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';

const Dashboard = () => {
  const { orders, isLoading } = useGetOrders();
  const { userType } = useStore(useShallow((state) => ({ userType: state.userType })));
  const checkUser = userType === 'admin' || userType === 'super' ? true : false;
  return (
    <div className="flex flex-col gap-4 my-4">
      <h1>Dashboard</h1>
      <div className="flex flex-wrap flex-col lg:flex-row gap-4 items-center">
        {checkUser && <Sales />}
        <Orders orders={orders?.length || 0} isLoading={isLoading} />
        <Seller />
      </div>
      <div className="flex flex-wrap flex-col lg:flex-row gap-4 justify-between items-center">
        <Chart />
        <Recent orders={orders ?? []} isLoading={isLoading} />
      </div>
    </div>
  );
};
export default Dashboard;
