import ProductNav from '../../components/Products/ProductNav';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductNav title="Choose a dish" page="dashboard" />
      {/* {toast.custom(
        <div className="flex items-center justify-start gap-4 bg-slate-950 w-72 py-4 px-8 rounded-full max-w-lg">
          <ImSpinner6 className="size-8 animate-spin text-slate-100" /> <span>Please wait...</span>
        </div>,
        { id: 'dashboard', duration: 3000 }
      )} */}
    </div>
  );
};
export default Dashboard;
