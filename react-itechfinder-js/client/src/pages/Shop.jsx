import { useSelector } from 'react-redux';
import StoreCard from '../components/StoreCard';
import StoreSetup from '../components/StoreSetup';

export default function Shop() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      {currentUser && !currentUser.isOwner ? <StoreSetup /> : <StoreCard />}
    </div>
  );
}
