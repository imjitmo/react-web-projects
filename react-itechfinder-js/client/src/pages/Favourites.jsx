import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchCards from '../components/SearchCards';

export default function Favourites() {
  const { currentUser } = useSelector((state) => state.user);
  const [favourites, setFavourites] = useState();
  const [follow, setFollow] = useState();
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const res = await fetch('/api/store/favourites');
        const data = await res.json();
        if (data.error) {
          return;
        }
        setFavourites(data);
      } catch (err) {
        console.log(err);
      }
    };

    getFavourites();
  }, [follow]);
  return (
    <div className="w-full p-7">
      <h1 className="text-center text-3xl font-semibold">My Favourite Shops</h1>
      {!favourites ? (
        <h2 className="text-center text-xl">No Favourites found!</h2>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 py-7">
          {favourites?.map((list) => (
            <div key={list?._id}>
              <SearchCards
                key={list._id}
                searchData={list}
                user={currentUser}
                setFollow={() => {
                  setFollow(list);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
