import ProductNav from '../../components/Products/ProductNav';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductNav title="Choose a dish" page="dashboard" />
    </div>
  );
};
export default Dashboard;
