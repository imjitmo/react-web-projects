import AddButton from '@/components/Products/AddButton';
import ProductNav from '@/components/Products/ProductNav';

const Setup = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductNav title="Add a dish" page="setup" setup={<AddButton />} />
    </div>
  );
};
export default Setup;
