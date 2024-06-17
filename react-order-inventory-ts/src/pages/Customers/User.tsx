import AddCustomer from '@/components/Customers/AddCustomer';
import List from '@/components/Customers/List';

const User = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <AddCustomer />
      </div>
      <h1>Customers</h1>
      <List />
    </div>
  );
};
export default User;
