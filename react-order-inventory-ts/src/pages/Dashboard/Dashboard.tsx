import Chart from '@/components/Dashboards/Chart';
import Orders from '@/components/Dashboards/Orders';
import Recent from '@/components/Dashboards/Recent';
import Sales from '@/components/Dashboards/Sales';
import Seller from '@/components/Dashboards/Seller';

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap flex-col lg:flex-row gap-4 justify-between items-center my-4">
        <Sales />
        <Orders />
        <Seller />
      </div>
      <div className="flex flex-wrap flex-col lg:flex-row gap-4 justify-between items-center my-4">
        <Chart />
        <Recent />
      </div>
    </>
  );
};
export default Dashboard;
