import AddButton from '@/components/Products/AddButton';
import List from '@/components/Products/List';

const Setup = () => {
  return (
    <div>
      <AddButton />
      <List pageType={'setup'} />
    </div>
  );
};
export default Setup;
