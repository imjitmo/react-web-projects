import { useSelector } from 'react-redux';

export default function ProfileCard() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-4">
      <p className="capitalize font-bold">
        username: <span className="lowercase font-normal italic">{currentUser.username}</span>
      </p>
      <p className="capitalize font-bold">
        email: <span className="lowercase font-normal italic">{currentUser.email}</span>
      </p>
      <p className="capitalize font-bold">
        password: <span className="lowercase font-normal italic">...</span>
      </p>
    </div>
  );
}
