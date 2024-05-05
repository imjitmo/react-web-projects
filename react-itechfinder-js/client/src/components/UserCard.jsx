import { useSelector } from 'react-redux';

export default function UserCard(props) {
  const { currentUser } = useSelector((state) => state.user);
  const { data } = props;
  return (
    <div className="flex items-center justify-center">
      <div className="card card-side bg-base-100 shadow-xl p-4 w-[430px]  h-[190px]">
        <figure>
          <img src={currentUser.profilePicture} className="object-scale-down size-30" alt="Profile" />
        </figure>
        <div className="card-body">
          <div className="flex flex-row gap-2">
            <div className="truncate">
              <div className="font-bold text-xl truncate">{`${data?.firstName} ${
                data?.lastName
              } (${data?.userGender[0].toUpperCase()})`}</div>
              <div className="text-xs opacity-70">
                <span className="badge badge-ghost bg-blue-700 text-white">{currentUser.username}</span>
              </div>
              <div className="text-xs opacity-70">
                <p className="flex flex-row gap-1">
                  <span>{currentUser.email}</span>
                  <span> | </span>
                  <span>{data?.contactNumber && `+63-${data?.contactNumber}`}</span>
                </p>
              </div>
              {data?.shopAddress && (
                <div className="text-sm opacity-70 capitalize">
                  {data?.userAddress?.street}, {data?.userAddress?.barangay}, {data?.userAddress?.city},{' '}
                  {data?.userAddress?.province}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
